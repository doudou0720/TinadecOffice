using Tinadec.Contracts.Models;
using TinadecCore.Abstractions;

namespace Tinadec.AgentCore.Services;

public sealed class AgentWorkflowRuntime(IToolRegistry tools) : IAgentWorkflowRuntime
{
    public const string RuntimeName = "microsoft-agent-framework";

    public AgentWorkflowPlanDto Compile(OrchestrationSnapshotDto snapshot)
    {
        if (snapshot.Run is null)
        {
            return new AgentWorkflowPlanDto("", RuntimeName, []);
        }

        var nodeMap = snapshot.Nodes.ToDictionary(node => node.Id);
        var steps = snapshot.Assignments
            .Select(assignment =>
            {
                nodeMap.TryGetValue(assignment.TaskNodeId, out var node);
                var toolIds = ResolveToolIds(assignment, node);
                return new AgentWorkflowStepDto(
                    $"workflow_step_{assignment.Id}",
                    assignment.RunId,
                    assignment.TaskNodeId,
                    assignment.AgentId,
                    assignment.AgentType,
                    RuntimeName,
                    assignment.PermissionMode,
                    toolIds,
                    "compiled");
            })
            .ToArray();

        return new AgentWorkflowPlanDto(snapshot.Run.Id, RuntimeName, steps);
    }

    private IReadOnlyList<string> ResolveToolIds(AgentAssignmentDto assignment, TaskNodeDto? node)
    {
        var available = tools.ListTools("programming").Select(tool => tool.Id).ToHashSet(StringComparer.OrdinalIgnoreCase);
        var requested = new List<string>();

        if (assignment.AgentType is "search-agent" or "code-locator-agent")
        {
            requested.Add("search_files");
            requested.Add("glob_search");
            requested.Add("grep_content");
        }

        if (assignment.AgentType == "testing-agent")
        {
            requested.Add("sandbox_exec");
        }

        if (assignment.AgentType == "review-executor" || node?.RequiredCapabilities.Contains("review.format") == true)
        {
            requested.Add("review_format");
        }

        if (assignment.AgentType is "code-reader-agent" or "context-agent" || node?.RequiredCapabilities.Contains("file.read") == true)
        {
            requested.Add("read_file");
            requested.Add("list_directory");
        }

        if (assignment.AllowedTools.Any(tool => tool.Contains("write", StringComparison.OrdinalIgnoreCase)))
        {
            requested.Add("apply_patch");
        }

        // Auto-assign read-only tools to any agent type that needs workspace access
        if (requested.Count > 0)
        {
            requested.Add("read_file");
            requested.Add("list_directory");
        }

        return requested
            .Where(available.Contains)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToArray();
    }
}
