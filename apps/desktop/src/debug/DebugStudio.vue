<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDebugWebSocket } from './composables/useDebugWebSocket'
import { useTraceData } from './composables/useTraceData'
import { useSimulation } from './composables/useSimulation'
import { useMetrics } from './composables/useMetrics'
import TraceTimeline from './components/TraceTimeline.vue'
import InspectorPanel from './components/InspectorPanel.vue'
import AgentGraphCanvas from './components/AgentGraphCanvas.vue'
import SimulatorBar from './components/SimulatorBar.vue'
import MetricsDashboard from './components/MetricsDashboard.vue'
import DiagnosticsReport from './components/DiagnosticsReport.vue'
import SessionSelector from './components/SessionSelector.vue'
import LiveReplayToggle from './components/LiveReplayToggle.vue'
import { Bug, Minus, Square, X } from '@lucide/vue'

const ws = useDebugWebSocket()
const traceData = useTraceData()
const simulation = useSimulation()
const metrics = useMetrics()

const activeTab = ref<'timeline' | 'graph' | 'metrics' | 'diagnostics'>('timeline')

function minimizeWindow() {
  window.tinadec?.minimizeWindow?.()
}
function maximizeWindow() {
  window.tinadec?.maximizeWindow?.()
}
function closeWindow() {
  window.tinadec?.closeWindow?.()
}

onMounted(() => {
  ws.connect()
  traceData.fetchTraces()
  metrics.fetchDiagnostics()
})
</script>

<template>
  <div class="debug-studio">
    <!-- Title bar -->
    <header class="debug-titlebar">
      <div class="debug-titlebar-left">
        <Bug :size="16" class="debug-icon" />
        <span class="debug-title">Agent Debug Studio</span>
        <SessionSelector />
        <LiveReplayToggle />
      </div>
      <div class="debug-titlebar-right">
        <span class="ws-status" :class="{ connected: ws.connected.value }">
          {{ ws.connected.value ? 'LIVE' : 'OFFLINE' }}
        </span>
        <button class="window-btn" @click="minimizeWindow"><Minus :size="14" /></button>
        <button class="window-btn" @click="maximizeWindow"><Square :size="12" /></button>
        <button class="window-btn close" @click="closeWindow"><X :size="14" /></button>
      </div>
    </header>

    <!-- Tab bar -->
    <nav class="debug-tabs">
      <button class="debug-tab" :class="{ active: activeTab === 'timeline' }" @click="activeTab = 'timeline'">Timeline</button>
      <button class="debug-tab" :class="{ active: activeTab === 'graph' }" @click="activeTab = 'graph'">Agent Graph</button>
      <button class="debug-tab" :class="{ active: activeTab === 'metrics' }" @click="activeTab = 'metrics'">Metrics</button>
      <button class="debug-tab" :class="{ active: activeTab === 'diagnostics' }" @click="activeTab = 'diagnostics'">Diagnostics</button>
    </nav>

    <!-- Main content area -->
    <main class="debug-main">
      <div v-if="activeTab === 'timeline'" class="debug-timeline-layout">
        <div class="debug-timeline-left">
          <TraceTimeline
            :traces="traceData.traces.value"
            :current-trace="traceData.currentTrace.value"
            :selected-span="traceData.selectedSpan.value"
            :loading="traceData.loading.value"
            @select-trace="traceData.fetchTraceDetail"
            @select-span="traceData.selectSpan"
          />
        </div>
        <div class="debug-timeline-right">
          <InspectorPanel
            :span="traceData.selectedSpan.value"
          />
        </div>
      </div>

      <div v-else-if="activeTab === 'graph'" class="debug-graph-layout">
        <AgentGraphCanvas />
      </div>

      <div v-else-if="activeTab === 'metrics'" class="debug-metrics-layout">
        <MetricsDashboard :diagnostics="metrics.diagnostics.value" />
      </div>

      <div v-else-if="activeTab === 'diagnostics'" class="debug-diagnostics-layout">
        <DiagnosticsReport :report="metrics.diagnostics.value" />
      </div>
    </main>

    <!-- Bottom simulator bar -->
    <SimulatorBar
      :mode="simulation.mode.value"
      :current-step="simulation.currentStep.value"
      :total-steps="simulation.totalSteps.value"
      @step="ws.stepSimulation"
      @run="ws.resumeSimulation"
      @pause="() => { simulation.mode.value = 'paused' }"
      @reset="ws.resetSimulation"
      @inject-message="simulation.injectMessage"
      @inject-tool-result="simulation.injectToolResult"
      @force-approval="simulation.forceApprovalDecision"
    />
  </div>
</template>

<style scoped>
.debug-studio {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #0d1117;
  color: #e6edf3;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.debug-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  background: #161b22;
  border-bottom: 1px solid #30363d;
  -webkit-app-region: drag;
  user-select: none;
}

.debug-titlebar-left,
.debug-titlebar-right {
  display: flex;
  align-items: center;
  gap: 8px;
  -webkit-app-region: no-drag;
}

.debug-icon { color: #58a6ff; }
.debug-title { font-size: 13px; font-weight: 600; }

.ws-status {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 3px;
  background: #6e7681;
  color: #fff;
}
.ws-status.connected {
  background: #238636;
}

.window-btn {
  background: none;
  border: none;
  color: #8b949e;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.window-btn:hover { background: #30363d; }
.window-btn.close:hover { background: #da3633; color: #fff; }

.debug-tabs {
  display: flex;
  gap: 0;
  background: #161b22;
  border-bottom: 1px solid #30363d;
  padding: 0 12px;
}

.debug-tab {
  background: none;
  border: none;
  color: #8b949e;
  padding: 8px 16px;
  font-size: 12px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.15s;
}
.debug-tab:hover { color: #e6edf3; }
.debug-tab.active {
  color: #58a6ff;
  border-bottom-color: #58a6ff;
}

.debug-main {
  flex: 1;
  overflow: auto;
}

.debug-timeline-layout {
  display: flex;
  height: 100%;
}
.debug-timeline-left { flex: 3; border-right: 1px solid #30363d; overflow: auto; }
.debug-timeline-right { flex: 2; overflow: auto; }

.debug-graph-layout,
.debug-metrics-layout,
.debug-diagnostics-layout {
  height: 100%;
  overflow: auto;
  padding: 16px;
}
</style>
