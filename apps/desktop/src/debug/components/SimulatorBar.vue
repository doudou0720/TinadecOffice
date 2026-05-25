<script setup lang="ts">
import { ref } from 'vue'
import type { SimulationMode, SimulateMessageRequest, ForceApprovalDecisionRequest } from '../types/simulation'

const props = defineProps<{
  mode: SimulationMode
  currentStep: number
  totalSteps: number
}>()

const emit = defineEmits<{
  step: []
  run: []
  pause: []
  reset: []
  'inject-message': [request: SimulateMessageRequest]
  'inject-tool-result': [request: { run_id: string; tool_id: string; status: string; summary?: string }]
  'force-approval': [request: ForceApprovalDecisionRequest]
}>()

const injectContent = ref('')
const injectSessionId = ref('')
const approvalId = ref('')
const expanded = ref(false)
</script>

<template>
  <div class="simulator-bar" :class="{ expanded }">
    <div class="simulator-main">
      <div class="simulator-controls">
        <button class="sim-btn" :disabled="mode === 'idle'" @click="emit('step')" title="Step">▶</button>
        <button class="sim-btn" :disabled="mode === 'idle'" @click="emit('run')" title="Run">▶▶</button>
        <button class="sim-btn" :disabled="mode !== 'running'" @click="emit('pause')" title="Pause">⏸</button>
        <button class="sim-btn" @click="emit('reset')" title="Reset">⏮</button>
        <span class="sim-step" v-if="totalSteps > 0">Step {{ currentStep }}/{{ totalSteps }}</span>
        <span class="sim-mode" :class="mode">{{ mode }}</span>
      </div>
      <button class="sim-expand-btn" @click="expanded = !expanded">
        {{ expanded ? '▼' : '▲' }} Tools
      </button>
    </div>
    <div v-if="expanded" class="simulator-tools">
      <div class="tool-group">
        <label class="tool-label">Inject Message</label>
        <input v-model="injectSessionId" placeholder="Session ID" class="tool-input small" />
        <input v-model="injectContent" placeholder="Message content" class="tool-input" />
        <button class="tool-btn" @click="injectSessionId && injectContent && emit('inject-message', { session_id: injectSessionId, content: injectContent })">Send</button>
      </div>
      <div class="tool-group">
        <label class="tool-label">Force Approval</label>
        <input v-model="approvalId" placeholder="Approval ID" class="tool-input small" />
        <button class="tool-btn approve" @click="approvalId && emit('force-approval', { approval_id: approvalId, decision: 'approved' })">Approve</button>
        <button class="tool-btn reject" @click="approvalId && emit('force-approval', { approval_id: approvalId, decision: 'rejected' })">Reject</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.simulator-bar {
  background: #161b22;
  border-top: 1px solid #30363d;
  transition: height 0.2s;
}
.simulator-main {
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px 12px;
}
.simulator-controls { display: flex; align-items: center; gap: 4px; }
.sim-btn {
  background: #21262d; border: 1px solid #30363d; color: #e6edf3;
  padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;
}
.sim-btn:hover:not(:disabled) { background: #30363d; }
.sim-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.sim-step { font-size: 11px; color: #8b949e; margin-left: 8px; }
.sim-mode { font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 3px; margin-left: 8px; }
.sim-mode.idle { background: #6e7681; color: #fff; }
.sim-mode.running { background: #238636; color: #fff; }
.sim-mode.paused { background: #d29922; color: #fff; }

.sim-expand-btn { background: none; border: none; color: #58a6ff; cursor: pointer; font-size: 12px; }

.simulator-tools { padding: 8px 12px; border-top: 1px solid #21262d; }
.tool-group { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.tool-label { font-size: 11px; color: #8b949e; min-width: 100px; }
.tool-input {
  background: #0d1117; border: 1px solid #30363d; color: #e6edf3;
  padding: 4px 8px; border-radius: 4px; font-size: 12px; flex: 1;
}
.tool-input.small { width: 120px; flex: none; }
.tool-btn {
  background: #21262d; border: 1px solid #30363d; color: #e6edf3;
  padding: 4px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;
}
.tool-btn:hover { background: #30363d; }
.tool-btn.approve { border-color: #238636; color: #3fb950; }
.tool-btn.reject { border-color: #da3633; color: #f85149; }
</style>
