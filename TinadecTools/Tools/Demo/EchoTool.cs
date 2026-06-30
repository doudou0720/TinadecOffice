using System.Text.Json.Serialization;
using TinadecTools.Abstractions;

namespace TinadecTools.Tools.Demo;

internal sealed class EchoToolArgs
{
    [JsonPropertyName("text")]
    public string Text { get; set; } = string.Empty;
}

internal sealed class EchoToolResult
{
    [JsonPropertyName("echo")]
    public string Echo { get; set; } = string.Empty;
}

[JsonSourceGenerationOptions(WriteIndented = false)]
[JsonSerializable(typeof(EchoToolArgs))]
[JsonSerializable(typeof(EchoToolResult))]
internal partial class EchoToolJsonContext : JsonSerializerContext;

internal static class EchoTool
{
    public const string TOOL_ID = "echo";

    [ToolFunction(TOOL_ID)]
    public static ValueTask<EchoToolResult> HandleAsync(
        EchoToolArgs args,
        CancellationToken cancellationToken)
    {
        return ValueTask.FromResult(new EchoToolResult { Echo = args.Text });
    }
}
