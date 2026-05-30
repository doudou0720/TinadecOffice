# TINADEC CORE KNOWLEDGE

## OVERVIEW
.NET 10 Core runtime and sole state authority. Owns agents, sessions, approvals, model routes, storage, contracts, tracing, and debug APIs.

## STRUCTURE
```
src/TinadecCore/
├── Program.cs          # DI, HTTP routes, tracing init
├── Abstractions/       # service boundary interfaces
├── Contracts/          # DTO/request/event/security contracts
├── Services/           # orchestration, tools, policy, events, model client
├── Storage/            # SQLite persistence and stored model settings
├── Tracing/            # OpenTelemetry, NDJSON, diagnostics, metrics
└── Debug/              # Debug Studio API, simulation, breakpoints, websocket
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Add/trace endpoint | `Program.cs` | Minimal API route map is centralized. |
| Change persistence | `Storage/CoreStore.cs` | Largest hotspot; pair with CoreStore tests. |
| Change DTO/request | `Contracts/Models`, `Contracts/Events` | Mirror Desktop `api.ts` after Core changes. |
| Tool policy | `Services/ToolRegistryService.cs`, `CapabilityPolicyService.cs` | Approval-first behavior. |
| Orchestration | `Services/OrchestratorService.cs`, `AgentWorkflowRuntime.cs` | Runs, task graph, read-only tools. |
| Model providers | `Services/ModelProviderCatalog.cs`, `OpenAiCompatibleClient.cs` | Provider-instance model center. |
| Debug/tracing | `Tracing/*`, `Debug/*` | Agent Debug Studio backend. |
| Tests | `tests/TinadecCore.Tests`, `tests/Tinadec.Contracts.Tests` | xUnit; contracts split from behavior tests. |

## CONVENTIONS
- Target framework is `net10.0`; nullable and implicit usings are enabled.
- HTTP JSON uses `JsonNamingPolicy.SnakeCaseLower`; keep event/DTO casing stable.
- `CoreStore` is SQLite-first and seeds built-in agents/providers/routes/extensions.
- Tool execution must preserve approval-gated posture.
- `SecretProtector` uses DPAPI on Windows; non-Windows fallback is for development only.
- Trace propagation crosses to Gateway/code tools; preserve `traceparent` behavior in client changes.

## ANTI-PATTERNS
- Do not move Core state into Gateway or Desktop.
- Do not mix unrelated API wiring and SQL/schema changes in one broad edit.
- Do not return stored API keys; expose `has_api_key` only.
- Do not run direct dotnet commands on affected Windows env without clearing `Version` and `Ice-Version`.

## COMMANDS
```powershell
Remove-Item Env:Version -ErrorAction SilentlyContinue
Remove-Item Env:Ice-Version -ErrorAction SilentlyContinue
dotnet run --project src/TinadecCore/TinadecCore.csproj --urls http://127.0.0.1:48731
dotnet test tests/TinadecCore.Tests/TinadecCore.Tests.csproj -v minimal
dotnet test tests/Tinadec.Contracts.Tests/Tinadec.Contracts.Tests.csproj -v minimal
```
