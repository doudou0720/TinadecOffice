using TinadecTools.Runtime;

namespace TinadecTools.Tests;

public sealed class TerminalRunnerTests
{
    [Fact]
    public async Task RunAsync_ReturnsStdout()
    {
        var result = await TerminalRunner.RunAsync(
            "dotnet",
            ["--version"],
            cancellationToken: CancellationToken.None);

        Assert.True(result.Success);
        Assert.Equal(0, result.ExitCode);
        Assert.False(string.IsNullOrWhiteSpace(result.Stdout));
        Assert.False(result.TimedOut);
        Assert.True(result.DurationMs >= 0);
    }

    [Fact]
    public async Task RunAsync_PassesStdin()
    {
        var (executable, args) = OperatingSystem.IsWindows()
            ? ("findstr", new[] { "hello" })
            : ("grep", new[] { "hello" });

        var result = await TerminalRunner.RunAsync(
            executable,
            args,
            stdin: "hello world\ngoodbye world\n",
            cancellationToken: CancellationToken.None);

        Assert.True(result.Success);
        Assert.Contains("hello", result.Stdout, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task RunAsync_TimesOutAndKillsProcess()
    {
        var (executable, args) = OperatingSystem.IsWindows()
            ? ("powershell", new[] { "-Command", "Start-Sleep -Seconds 10" })
            : ("sleep", new[] { "10" });

        var result = await TerminalRunner.RunAsync(
            executable,
            args,
            timeoutMs: 500,
            cancellationToken: CancellationToken.None);

        Assert.False(result.Success);
        Assert.True(result.TimedOut);
    }

    [Fact]
    public async Task RunAsync_LargeOutputDoesNotDeadlock()
    {
        var result = await TerminalRunner.RunAsync(
            "dotnet",
            ["--info"],
            cancellationToken: CancellationToken.None);

        Assert.True(result.Success);
        Assert.False(string.IsNullOrWhiteSpace(result.Stdout));
    }

    [Fact]
    public async Task RunAsync_NonExistentExecutable_ReturnsFailure()
    {
        var result = await TerminalRunner.RunAsync(
            "no-such-executable-xyz-abc",
            cancellationToken: CancellationToken.None);

        Assert.False(result.Success);
        Assert.Equal(-1, result.ExitCode);
        Assert.NotEmpty(result.Stderr);
    }
}
