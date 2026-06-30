using System.Collections.Concurrent;
using System.Text.Json.Serialization;
using AsyncLocks;
using NLog;
using TinadecTools.Abstractions;

namespace TinadecTools.Tools.FileRW;



/// <summary>
/// 常规读写：首尾行号
/// </summary>
public sealed class NormalFileReadParams
{
    [JsonPropertyName("filepath")] public string FilePath { get; set; } = string.Empty;
    [JsonPropertyName("start_row")] public int StartRow { get; set; } = 1;
    [JsonPropertyName("end_row")] public int EndRow { get; set; } = int.MaxValue;
}

/// <summary>
/// 包含行哈希的一行
/// </summary>
public sealed class ExtendedLineContent
{
    [JsonPropertyName("content")] public LineContent Content{get; set; } = new LineContent();
    [JsonPropertyName("line_hash")] public string LineHash { get; set; } = string.Empty;

    public ExtendedLineContent()
    {
    }

    public ExtendedLineContent(LineContent lineContent)
    {
        Content = lineContent;
        LineHash = lineContent.LineNumber.ToString() +
                   FileHashing.ComputeLineHash(lineContent.Content, lineContent.LineNumber);
    }
}

public sealed class NormalFileReadResponse
{
    [JsonPropertyName("success")] public bool Success { get; set; }
    [JsonPropertyName("error")] public string? Error { get; set; }
    [JsonPropertyName("all_contents")] public List<ExtendedLineContent> AllContents { get; set; } = new();
}

[JsonSourceGenerationOptions(WriteIndented = true)]
[JsonSerializable(typeof(NormalFileReadParams))]
[JsonSerializable(typeof(LineContent))]
[JsonSerializable(typeof(ExtendedLineContent))]
[JsonSerializable(typeof(NormalFileReadResponse))]
internal partial class FileReaderJsonContext : JsonSerializerContext;

internal class FileSlot(string path)
{
    public FileAccessor File = new(path);
    public AsyncReaderWriterLock RwLock = new();
}

public static class FileReader
{
    private const int MaxSentinelReadLines = 150;
    private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
    private static readonly ConcurrentDictionary<string, FileSlot> Locks = new();

    private static FileSlot GetFileHandle(string path)
    {
        return Locks.GetOrAdd(path, p => new FileSlot(p));
    }

    [ToolFunction("read_file")]
    public static async ValueTask<NormalFileReadResponse> HandleAsync(
        NormalFileReadParams args,
        CancellationToken cancellationToken)
    {
        try
        {
            var path = ResolvePath(args.FilePath);
            var (startLine, endLine) = ResolveReadRange(args.StartRow, args.EndRow);
            var slot = GetFileHandle(path);

            using (await slot.RwLock.ReadLockAsync(cancellationToken).ConfigureAwait(false))
            {
                if (slot.File.LineCount == 0 || startLine > slot.File.LineCount)
                {
                    Logger.Debug("read_file读取{path}的{startRow}-{endRow}行，共0行", path, startLine, endLine);
                    return new NormalFileReadResponse { Success = true };
                }

                var effectiveEndLine = Math.Min(endLine, slot.File.LineCount);
                var lines = await slot.File.ReadLines([new KeyValuePair<int, int>(startLine - 1, effectiveEndLine - 1)])
                    .ConfigureAwait(false);

                var contents = lines
                    .Select(line => new LineContent(line.Content, line.LineNumber + 1, line.LineLength))
                    .Select(line => new ExtendedLineContent(line))
                    .ToList();

                Logger.Debug("read_file读取{path}的{startRow}-{endRow}行，共{count}行", path, startLine, effectiveEndLine, contents.Count);
                return new NormalFileReadResponse
                {
                    Success = true,
                    AllContents = contents
                };
            }
        }
        catch (OperationCanceledException ex)
        {
            Logger.Warn(ex, "read_file被取消，文件为{path}", args.FilePath);
            return new NormalFileReadResponse
            {
                Success = false,
                Error = "read_file canceled."
            };
        }
        catch (Exception ex)
        {
            Logger.Warn(ex, "read_file失败，文件为{path}，范围为{startRow}-{endRow}", args.FilePath, args.StartRow, args.EndRow);
            return new NormalFileReadResponse
            {
                Success = false,
                Error = ex.Message
            };
        }
    }

    private static string ResolvePath(string filePath)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(filePath);
        return Path.GetFullPath(filePath);
    }

    private static (int StartLine, int EndLine) ResolveReadRange(int startRow, int endRow)
    {
        if (startRow < 1)
            throw new ArgumentOutOfRangeException(nameof(startRow), "start_row must be 1 or greater.");

        if (endRow < startRow)
            throw new ArgumentOutOfRangeException(nameof(endRow), "end_row must be greater than or equal to start_row.");

        var requestedLength = (long)endRow - startRow + 1;
        if (endRow == int.MaxValue || requestedLength == int.MaxValue)
            endRow = (int)Math.Min((long)startRow + MaxSentinelReadLines - 1, int.MaxValue);

        return (startRow, endRow);
    }
}
