// --- Debug API Request/Response Types ---

export interface GetTracesRequest {
  session_id?: string
  run_id?: string
  name?: string
  status?: string
  min_duration_ms?: number
  limit?: number
  offset?: number
}

export interface GetTracesResponse {
  traces: import('./trace').TraceSummary[]
  total_count: number
}

export interface GetSpansRequest {
  name?: string
  status?: string
  min_duration_ms?: number
  limit?: number
}

export interface GetMetricsRequest {
  metric_name: string
  window_ms?: number
  bucket_ms?: number
  group_by?: string[]
}

// WebSocket message types
export interface WsMessage {
  type: string
  data: unknown
  timestamp: number
}

export type WsEventType =
  | 'trace.span.started'
  | 'trace.span.ended'
  | 'trace.metric.sampled'
  | 'agent.state.changed'
  | 'breakpoint.hit'
  | 'simulation.paused'
  | 'event.*'
