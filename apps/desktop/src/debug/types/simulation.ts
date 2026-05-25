// --- Simulation Types ---

export interface SimulateMessageRequest {
  session_id: string
  content: string
  skip_model_call?: boolean
  mock_model_response?: string
}

export interface SimulateMessageResponse {
  simulation_id: string
  trace_id: string
  simulated: boolean
}

export interface SimulateModelResponseRequest {
  session_id: string
  content: string
}

export interface SimulateToolResultRequest {
  run_id: string
  tool_id: string
  status: string
  summary?: string
}

export interface ForceApprovalDecisionRequest {
  approval_id: string
  decision: string
}

export interface PatchAgentStateRequest {
  session_id: string
  agent_id: string
  state: Record<string, unknown>
}

export interface Breakpoint {
  id: string
  condition_type: string
  condition: Record<string, unknown>
  action: string
  action_params: Record<string, unknown> | null
  hit_count: number
  enabled: boolean
  created_at: string
}

export interface CreateBreakpointRequest {
  condition_type: string
  condition: Record<string, unknown>
  action: string
  action_params?: Record<string, unknown>
}

export type SimulationMode = 'idle' | 'running' | 'paused' | 'stepping'
