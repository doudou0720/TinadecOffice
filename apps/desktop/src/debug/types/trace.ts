// --- Trace Data Types ---

export interface TraceSummary {
  trace_id: string
  root_span_name: string
  root_span_duration_ms: number
  span_count: number
  error_count: number
  started_at: string
  session_id: string | null
  run_id: string | null
}

export interface TraceDetail {
  trace_id: string
  root_span: SpanNode[]
  resource: Record<string, string>
}

export interface SpanNode {
  span_id: string
  parent_span_id: string | null
  name: string
  kind: string
  start_time: string
  end_time: string
  duration_ms: number
  status: string
  status_message: string | null
  attributes: Record<string, unknown>
  events: SpanEvent[]
  children: SpanNode[]
  links: SpanLink[]
}

export interface SpanEvent {
  name: string
  timestamp: string
  attributes: Record<string, unknown>
}

export interface SpanLink {
  trace_id: string
  span_id: string
  attributes: Record<string, unknown>
}

// Span name constants (mirrors C# SpanDefinitions)
export const SpanNames = {
  AgentTurn: 'agent.turn',
  AgentInference: 'agent.inference',
  AgentToolDispatch: 'agent.tool_dispatch',
  AgentToolExecution: 'agent.tool_execution',
  AgentApproval: 'agent.approval',
  AgentSupervision: 'agent.supervision',
  AgentContextPack: 'agent.context_pack',
  AgentWorkflowCompile: 'agent.workflow_compile',
  SqliteQuery: 'sqlite.query',
  ModelRequest: 'model.request',
} as const

// Color mapping for span types
export const SpanColorMap: Record<string, string> = {
  [SpanNames.AgentTurn]: '#3b82f6',       // blue
  [SpanNames.AgentInference]: '#3b82f6',   // blue
  [SpanNames.AgentToolDispatch]: '#22c55e', // green
  [SpanNames.AgentToolExecution]: '#22c55e', // green
  [SpanNames.AgentApproval]: '#eab308',    // yellow
  [SpanNames.AgentSupervision]: '#f97316',  // orange
  [SpanNames.AgentContextPack]: '#a855f7',  // purple
  [SpanNames.AgentWorkflowCompile]: '#a855f7', // purple
  [SpanNames.SqliteQuery]: '#6b7280',      // gray
  [SpanNames.ModelRequest]: '#3b82f6',     // blue
}

export function getSpanColor(name: string, status: string): string {
  if (status === 'ERROR') return '#ef4444' // red
  return SpanColorMap[name] ?? '#6b7280'
}
