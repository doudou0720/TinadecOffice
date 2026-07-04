using TinadecTools.Tools.Command;

namespace TinadecTools.Tests;

public sealed class CommandRunnerTests
{
    // ── 基础执行 ──────────────────────────────────────────────────────────────

    [Fact]
    public async Task BasicExecution_ReturnsStdout()
    {
        var resp = await CommandRunner.HandleAsync(
            new CommandRunParams
            {
                Executable = "dotnet",
                Arguments = ["--version"]
            },
            CancellationToken.None);

        Assert.True(resp.Success);
        Assert.Equal(0, resp.ExitCode);
        Assert.False(string.IsNullOrWhiteSpace(resp.Stdout));
        Assert.False(resp.TimedOut);
        Assert.True(resp.DurationMs >= 0);
    }

    // ── Stdin ─────────────────────────────────────────────────────────────────

    [Fact]
    public async Task Stdin_PassedToProcess()
    {
        var executable = OperatingSystem.IsWindows() ? "findstr" : "grep";
        var args = OperatingSystem.IsWindows() ? new[] { "hello" } : new[] { "hello" };

        var resp = await CommandRunner.HandleAsync(
            new CommandRunParams
            {
                Executable = executable,
                Arguments = [..args],
                Stdin = "hello world\ngoodbye world\n"
            },
            CancellationToken.None);

        Assert.True(resp.Success);
        Assert.Contains("hello", resp.Stdout, StringComparison.OrdinalIgnoreCase);
    }

    // ── Timeout ───────────────────────────────────────────────────────────────

    [Fact]
    public async Task Timeout_KillsProcessAndReturnsTimedOut()
    {
        var sleepCmd = OperatingSystem.IsWindows()
            ? ("powershell", new[] { "-Command", "Start-Sleep -Seconds 10" })
            : ("sleep", new[] { "10" });

        var resp = await CommandRunner.HandleAsync(
            new CommandRunParams
            {
                Executable = sleepCmd.Item1,
                Arguments = [..sleepCmd.Item2],
                TimeoutMs = 500
            },
            CancellationToken.None);

        Assert.False(resp.Success);
        Assert.True(resp.TimedOut);
    }

    // ── 大输出 ────────────────────────────────────────────────────────────────

    [Fact]
    public async Task LargeOutput_DoesNotDeadlock()
    {
        // dotnet --info 输出通常几KB，足够测试并发读取路径
        var resp = await CommandRunner.HandleAsync(
            new CommandRunParams
            {
                Executable = "dotnet",
                Arguments = ["--info"]
            },
            CancellationToken.None);

        Assert.True(resp.Success);
        Assert.False(string.IsNullOrWhiteSpace(resp.Stdout));
    }
}
