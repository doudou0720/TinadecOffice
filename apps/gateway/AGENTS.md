# GATEWAY KNOWLEDGE

## OVERVIEW
Elysia TypeScript BFF/API layer. It proxies Core HTTP/SSE/debug routes and hosts Code/native tool endpoints for Desktop.

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Server routes | `src/index.ts` | Elysia app, Swagger, manual CORS, `/api/v1/*`. |
| Core proxy | `src/coreClient.ts` | `coreUrl`, JSON proxy, SSE proxy. |
| Debug proxy | `src/debugProxy.ts` | Debug API + WebSocket URL helpers. |
| Code tools | `src/codeTools.ts` | Native tool execution/fallback boundary. |
| Tests | `src/coreClient.test.ts` | Node test runner + `tsx`. |

## CONVENTIONS
- Package is ESM (`"type": "module"`); TypeScript uses `NodeNext`.
- Keep Gateway thin. Core owns state, approvals, model routes, sessions, events, and persistence.
- Manual CORS exists because `@elysiajs/cors` returned bad preflight behavior with the Node adapter.
- Use `setStatus(set, result.status)` when forwarding Core response status.
- OpenAPI docs are served at `/docs`.
- Default port is `TINADEC_GATEWAY_PORT ?? 48730`.

## ANTI-PATTERNS
- Do not add durable state here.
- Do not bypass Core contracts when forwarding `/api/v1/*` shapes.
- Do not remove local dev/Electron allowed origins without checking Desktop startup.
- Do not assume dependency diagnostics are valid until `npm install` has run; missing deps cause many false LSP errors.

## COMMANDS
```bash
npm run dev -w @tinadec/gateway
npm run build -w @tinadec/gateway
npm run test -w @tinadec/gateway
```

Target one test from `apps/gateway/`:
```bash
node --test --import tsx src/coreClient.test.ts
```
