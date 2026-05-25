# TinadecCode Architecture

TinadecCode is split into four product responsibilities:

- `src/TinadecCore`: portable C# Core framework and runtime. It owns agents, runs, task graphs, context packs, supervision, approvals, model routes, events, secrets, permissions, capability discovery, SQLite persistence, and **Agent Debug Studio tracing**.
- `native/glue/*`: Codex Rust glue. Core treats Codex as the mature kernel/tool capability source and calls it through stable adapters instead of reimplementing file search, patch, sandbox, and related primitives.
- `apps/gateway`: TinadecCode Elysia BFF/API layer. It exposes `/api/v1/*` (including `/api/v1/debug/*`), OpenAPI docs at `/docs`, and proxies to the Core runtime.
- `apps/desktop`: TinadecCode Desktop, built with Electron + Vue. The renderer receives only the `window.tinadec.*` preload API and talks to TinadecCode over HTTP/SSE. Includes the **Agent Debug Studio** as a separate BrowserWindow.

Core is the only state authority. Gateway and Desktop must not keep session state, approval decisions, model routing state, tool policy state, or provider lifecycle state.

## Default Ports

- TinadecCode Elysia API: `http://127.0.0.1:48730`
- TinadecCore runtime: `http://127.0.0.1:48731`
- Vite renderer: `http://127.0.0.1:5173`

## Event Envelope

All runtime events use:

```json
{
  "v": "1.0",
  "type": "message.created",
  "request_id": "req_xxx",
  "session_id": "sess_xxx",
  "trace_id": "trace_xxx",
  "seq": 1,
  "ts": "2026-05-18T10:15:30Z",
  "capabilities": ["agent.message"],
  "payload": {},
  "error": null
}
```

## Run Locally

```powershell
npm install
npm run restore:dotnet
npm run dev
```

The local environment currently contains `Version=V7.24.42SP3`, which breaks MSBuild version parsing. Root npm scripts remove that variable only for the child .NET process.

## Agent Debug Studio

TinadecCode includes an **Agent Debug Studio** — a dedicated debugging tool designed for Agent systems. See [`docs/agent-debug-studio-plan.md`](agent-debug-studio-plan.md) for the full implementation plan.

### Architecture

- **C# Tracing Layer** (`src/TinadecCore/Tracing/`): OpenTelemetry-based span collection with NDJSON file export, metrics, and diagnostics.
- **Debug API** (`src/TinadecCore/Debug/`): REST endpoints for trace/metrics/diagnostics queries, plus simulation and breakpoint control.
- **WebSocket Feed** (`/api/v1/debug/ws`): Real-time span event streaming to the Debug Studio frontend.
- **Debug Studio Frontend** (`apps/desktop/src/debug/`): Electron BrowserWindow with Trace Timeline, Agent Graph Canvas, Metrics Dashboard, and Simulator Bar.

### Key API Endpoints

| Endpoint | Purpose |
|----------|---------|
| `GET /api/v1/debug/traces` | Query trace list |
| `GET /api/v1/debug/traces/{id}` | Get trace detail with span tree |
| `GET /api/v1/debug/metrics` | Query metric aggregations |
| `GET /api/v1/debug/diagnostics` | Get diagnostic report |
| `GET /api/v1/debug/processes` | Process resource info |
| `WS /api/v1/debug/ws` | Real-time debug event feed |
| `POST /api/v1/debug/simulate/message` | Inject simulated message |
| `POST /api/v1/debug/breakpoints` | Set breakpoint |

### Configuration

Tracing is configured in `appsettings.json` under `TinadecTracing` and can be overridden with environment variables:

- `TINADEC_TRACING_ENABLED` — Enable/disable tracing
- `TINADEC_TRACE_FILE` — NDJSON trace file path
- `TINADEC_OTLP_TRACES_URL` — OTLP traces export URL
- `TINADEC_OTLP_METRICS_URL` — OTLP metrics export URL
