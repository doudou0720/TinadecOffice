using Tinadec.Contracts.Models;

namespace Tinadec.AgentCore.Services;

public sealed record AgentProfileSeed(
    string Id,
    string Name,
    string Layer,
    string AgentType,
    string Mode,
    string Description,
    string ModelRoutePurpose,
    IReadOnlyList<string> AllowedTools,
    IReadOnlyList<string> Capabilities,
    string? SystemPrompt = null);

public sealed record AgentCandidateSeed(
    string Id,
    string GeneratedByAgentId,
    string Name,
    string Layer,
    string AgentType,
    string Description,
    IReadOnlyList<string> SuggestedTools,
    IReadOnlyList<string> EvaluationNotes);

public static class AgentCatalog
{
    public static IReadOnlyList<AgentModeDto> Modes { get; } =
    [
        new("balanced", "Balanced", "Default two-layer orchestration with one planner lane and two executor lanes.", 2, true, true, "balanced"),
        new("plan-first", "Plan First", "Meeting and supervisor agents draft a task graph before execution starts.", 1, true, true, "strict"),
        new("parallel", "Parallel", "Allows more execution-layer workers when dependencies and budget allow it.", 4, true, true, "performance"),
        new("safe-research", "Safe Research", "Read-only exploration with strict approval gates for writes, shell, network, and ACP.", 2, false, true, "strict")
    ];

    /// <summary>
    /// Dual-layer agent architecture:
    ///   Layer 1 – Planning (主动智能体): self-driven, orchestrates tasks, monitors quality.
    ///   Layer 2 – Execution (被动执行智能体): receives assignments, performs specialised work.
    /// </summary>
    public static IReadOnlyList<AgentProfileSeed> Profiles { get; } =
    [
        // ─────────────────────────────────────────────
        // Layer 1 · Planning · 主动智能体
        // ─────────────────────────────────────────────

        // 1. 会议/用户交流智能体
        new(
            "agent_meeting",
            "会议智能体",
            "planning",
            "meeting",
            "plan-first",
            "与用户对话，理解意图，拆解任务为有依赖关系的任务图，定义成功标准与审批节点。",
            "planner",
            ["skill", "model.chat"],
            ["task_graph.create", "success_criteria.define", "approval_points.mark", "intent.parse"]),

        // 2. 数据（上下文）压缩智能体
        new(
            "agent_context_compressor",
            "上下文压缩智能体",
            "planning",
            "context-compressor",
            "balanced",
            "持续检测重复上下文模式，维护可逆上下文包、证据映射和 Token 预算摘要，确保长会话不超限。",
            "context",
            ["message.read", "event.read"],
            ["context.compact", "context.pattern.detect", "evidence.map", "summary.expand", "token_budget.guard"]),

        // 3. 进化演化智能体
        new(
            "agent_evolver",
            "进化演化智能体",
            "planning",
            "evolver",
            "safe-research",
            "观察重复工作流模式，提出候选技能、MCP清单、提示词或智能体规格，不在热路径上发布。",
            "evolution",
            ["event.read", "skill.read"],
            ["evolution.observe", "pattern.learn", "candidate.generate", "evaluation.plan", "skill.propose", "mcp.propose", "executor.propose"]),

        // 4. 工具助理智能体
        new(
            "agent_tool_assistant",
            "工具助理智能体",
            "planning",
            "tool-assistant",
            "balanced",
            "为每个任务节点选择模型路由、工具、MCP Server、ACP 适配器和权限信封。",
            "tooling",
            ["skill", "mcp.list", "model.route"],
            ["toolkit.resolve", "model_route.resolve", "policy_scope.assign", "tool.recommend"]),

        // 5. 监督审查智能体
        new(
            "agent_supervisor",
            "监督审查智能体",
            "planning",
            "supervisor",
            "safe-research",
            "负责全局安全、成本、质量、取消与审批闸门，监控执行层产出并触发告警。",
            "supervisor",
            ["approval", "event.read", "policy"],
            ["authorize", "abort_run", "raise_alert", "budget.guard", "quality.review"]),

        // 6. 技能工具学习智能体
        new(
            "agent_skill_learner",
            "技能学习智能体",
            "planning",
            "skill-learner",
            "balanced",
            "从历史交互和反馈中学习新技能模式，将习得的结构化知识注册为可复用技能或工具模板。",
            "evolution",
            ["event.read", "skill.read", "model.chat"],
            ["skill.learn", "tool.template.create", "knowledge.register", "feedback.analyze"]),

        // ─────────────────────────────────────────────
        // Layer 2 · Execution · 被动执行类智能体
        // ─────────────────────────────────────────────

        // 1. 任务规划智能体
        new(
            "executor_task_planner",
            "任务规划智能体",
            "execution",
            "task-planner",
            "balanced",
            "接收任务图节点，运行确定性规划步骤并产出结构化步骤结果与执行建议。",
            "executor",
            ["task.step", "event.write"],
            ["step.run", "step.result", "plan.decompose"]),

        // 2. 测试多模态智能体
        new(
            "executor_test_multimodal",
            "测试多模态智能体",
            "execution",
            "test-multimodal",
            "balanced",
            "在审批下运行测试，支持文本与多模态证据（截图、视频帧等），输出命令、结果与失败分类。",
            "test",
            ["shell.approved", "event.write", "model.multimodal"],
            ["test.run", "failure.classify", "visual.diff", "evidence.capture"]),

        // 3. 代码探查智能体
        new(
            "executor_code_explorer",
            "代码探查智能体",
            "execution",
            "code-explorer",
            "safe-research",
            "只读工作者：查找文件、符号、引用与相关代码证据，产出结构化代码定位结果。",
            "search",
            ["file.read", "grep", "glob"],
            ["code.search", "symbol.locate", "evidence.collect", "ref.trace"]),

        // 4. 在线搜索特化智能体
        new(
            "executor_search_specialist",
            "在线搜索特化智能体",
            "execution",
            "search-specialist",
            "safe-research",
            "只读工作者：在文档、事件与扩展市场中执行广泛搜索，为代码定位做前置准备。",
            "search",
            ["file.read", "grep", "glob", "event.read"],
            ["search.query", "evidence.collect", "web.search", "doc.retrieve"]),

        // 5. 文件查找智能体
        new(
            "executor_file_finder",
            "文件查找智能体",
            "execution",
            "file-finder",
            "safe-research",
            "只读工作者：通过 Glob 模式、文件名、路径片段快速定位工作区中的目标文件。",
            "search",
            ["file.read", "glob"],
            ["file.glob", "file.locate", "path.resolve"]),

        // 6. Git管理智能体
        new(
            "executor_git_manager",
            "Git管理智能体",
            "execution",
            "git-manager",
            "balanced",
            "在审批下执行 Git 操作：分支、提交、合并、变基、差异查看、冲突解决指导。",
            "executor",
            ["shell.approved", "event.write"],
            ["git.branch", "git.commit", "git.merge", "git.diff", "git.rebase", "conflict.resolve"]),

        // 7. 代码编写智能体
        new(
            "executor_code_writer",
            "代码编写智能体",
            "execution",
            "code-writer",
            "balanced",
            "在审批下修改和创建代码文件，应用补丁，确保变更符合任务规格与代码风格。",
            "executor",
            ["shell.approved", "event.write", "file.write.approved"],
            ["code.write", "patch.apply", "code.refactor", "style.enforce"]),

        // 8. 设计智能体
        new(
            "executor_designer",
            "设计智能体",
            "execution",
            "designer",
            "balanced",
            "执行界面与交互设计任务：生成 UI 组件、样式、布局方案与设计 Token，产出可视化设计稿。",
            "executor",
            ["model.chat", "model.multimodal", "event.write"],
            ["design.generate", "ui.component.create", "style.compose", "layout.plan", "design_token.emit"])
    ];

    public static IReadOnlyList<AgentCandidateSeed> Candidates { get; } =
    [
        new(
            "cand_evolution_review_agent",
            "agent_evolver",
            "进化审查智能体",
            "execution",
            "review-executor",
            "由进化智能体从重复审查工作流中生成的候选。可运行只读代码审查、引用文件并在完成前请求验证。",
            ["file.read", "grep", "git.diff"],
            ["Schema valid", "Read-only by default", "Needs golden-repo evaluation before enablement"]),
        new(
            "cand_mcp_packager_agent",
            "agent_evolver",
            "MCP打包智能体",
            "planning",
            "tool-packager",
            "候选：将重复的外部工具设置步骤转化为声明式 MCP 扩展清单。",
            ["event.read", "market.preview"],
            ["Requires extension signing workflow", "Must stay out of hot-path execution"])
    ];
}
