<script setup lang="ts">
import type { DiagnosticsReport } from '../types/metrics'

const props = defineProps<{
  diagnostics: DiagnosticsReport | null
}>()

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms.toFixed(0)}ms`
  return `${(ms / 1000).toFixed(1)}s`
}
</script>

<template>
  <div class="metrics-dashboard">
    <h3 class="dashboard-title">Metrics Dashboard</h3>

    <div v-if="!diagnostics" class="dashboard-empty">
      Loading diagnostics...
    </div>

    <template v-else>
      <!-- Summary cards -->
      <div class="metric-cards">
        <div class="metric-card">
          <div class="metric-value">{{ diagnostics.record_count }}</div>
          <div class="metric-label">Trace Records</div>
        </div>
        <div class="metric-card error">
          <div class="metric-value">{{ diagnostics.failure_count }}</div>
          <div class="metric-label">Failures</div>
        </div>
        <div class="metric-card warning">
          <div class="metric-value">{{ diagnostics.slow_span_count }}</div>
          <div class="metric-label">Slow Spans (&gt;5s)</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">{{ diagnostics.top_spans_by_count.length }}</div>
          <div class="metric-label">Span Types</div>
        </div>
      </div>

      <!-- Top spans by count -->
      <div class="metric-section">
        <h4 class="section-title">Top Spans by Count</h4>
        <div class="span-table">
          <div class="span-table-header">
            <span>Name</span><span>Count</span><span>Failures</span><span>Avg</span><span>Max</span>
          </div>
          <div v-for="span in diagnostics.top_spans_by_count.slice(0, 10)" :key="span.name" class="span-table-row">
            <span class="span-name">{{ span.name }}</span>
            <span>{{ span.count }}</span>
            <span :class="{ 'text-error': span.failure_count > 0 }">{{ span.failure_count }}</span>
            <span>{{ formatDuration(span.average_duration_ms) }}</span>
            <span>{{ formatDuration(span.max_duration_ms) }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.metrics-dashboard { padding: 16px; }
.dashboard-title { font-size: 16px; font-weight: 600; margin: 0 0 16px; }
.dashboard-empty { color: #8b949e; text-align: center; padding: 24px; }

.metric-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
.metric-card {
  background: #161b22; border: 1px solid #30363d; border-radius: 8px;
  padding: 16px; text-align: center;
}
.metric-card.error { border-color: #da3633; }
.metric-card.warning { border-color: #d29922; }
.metric-value { font-size: 28px; font-weight: 700; color: #e6edf3; }
.metric-card.error .metric-value { color: #f85149; }
.metric-card.warning .metric-value { color: #d29922; }
.metric-label { font-size: 12px; color: #8b949e; margin-top: 4px; }

.metric-section { margin-bottom: 20px; }
.section-title { font-size: 13px; font-weight: 600; color: #8b949e; text-transform: uppercase; margin: 0 0 8px; }

.span-table { font-size: 12px; }
.span-table-header {
  display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 8px;
  padding: 4px 8px; color: #8b949e; border-bottom: 1px solid #30363d; font-weight: 600;
}
.span-table-row {
  display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 8px;
  padding: 4px 8px; border-bottom: 1px solid #21262d;
}
.span-name { color: #58a6ff; }
.text-error { color: #f85149; }
</style>
