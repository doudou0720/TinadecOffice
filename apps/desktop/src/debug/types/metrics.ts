// --- Metrics Types ---

export interface MetricBucket {
  started_at: string
  ended_at: string
  count: number
  sum: number
  min: number
  max: number
  p50: number
  p95: number
  p99: number
  attributes: Record<string, string>
}

export interface MetricSummary {
  total_count: number
  total_sum: number
  avg: number
  min: number
  max: number
  p50: number
  p95: number
  p99: number
}

export interface MetricsResponse {
  metric_name: string
  window_ms: number
  bucket_ms: number
  buckets: MetricBucket[]
  summary: MetricSummary
}

export interface DiagnosticsReport {
  generated_at: string
  trace_file_path: string
  record_count: number
  parse_error_count: number
  failure_count: number
  interruption_count: number
  slow_span_threshold_ms: number
  slow_span_count: number
  top_spans_by_count: SpanSummary[]
  slowest_spans: SlowSpanEntry[]
  common_failures: FailureCluster[]
  latest_failures: RecentFailure[]
  latest_warnings_and_errors: LogEvent[]
}

export interface SpanSummary {
  name: string
  count: number
  failure_count: number
  total_duration_ms: number
  average_duration_ms: number
  max_duration_ms: number
}

export interface SlowSpanEntry {
  name: string
  duration_ms: number
  ended_at: string
  trace_id: string
  span_id: string
}

export interface FailureCluster {
  name: string
  cause: string
  count: number
  last_seen_at: string
  trace_id: string
  span_id: string
}

export interface RecentFailure {
  name: string
  duration_ms: number
  ended_at: string
  cause: string
  trace_id: string
  span_id: string
}

export interface LogEvent {
  span_name: string
  level: string
  message: string
  seen_at: string
  trace_id: string
  span_id: string
}
