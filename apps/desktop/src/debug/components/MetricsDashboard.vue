<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Loader2 } from '@lucide/vue'
import type { DiagnosticsReport } from '../types/metrics'

const { t } = useI18n()

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
    <h3 class="dashboard-title">{{ t('debugStudio.metricsTitle') }}</h3>

    <div v-if="!diagnostics" class="dashboard-empty">
      <Loader2 :size="24" class="empty-icon spinning" />
      <span>{{ t('debugStudio.loadingDiagnostics') }}</span>
    </div>

    <template v-else>
      <!-- Summary cards -->
      <div class="metric-cards">
        <div class="metric-card">
          <div class="metric-value">{{ diagnostics.record_count }}</div>
          <div class="metric-label">{{ t('debugStudio.traceRecords') }}</div>
        </div>
        <div class="metric-card error">
          <div class="metric-value">{{ diagnostics.failure_count }}</div>
          <div class="metric-label">{{ t('debugStudio.failures') }}</div>
        </div>
        <div class="metric-card warning">
          <div class="metric-value">{{ diagnostics.slow_span_count }}</div>
          <div class="metric-label">{{ t('debugStudio.slowSpans') }}</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">{{ diagnostics.top_spans_by_count.length }}</div>
          <div class="metric-label">{{ t('debugStudio.spanTypes') }}</div>
        </div>
      </div>

      <!-- Top spans by count -->
      <div class="metric-section">
        <h4 class="section-title">{{ t('debugStudio.topSpansByCount') }}</h4>
        <div class="span-table">
          <div class="span-table-header">
            <span>{{ t('debugStudio.name') }}</span>
            <span>{{ t('debugStudio.count') }}</span>
            <span>{{ t('debugStudio.failuresCol') }}</span>
            <span>{{ t('debugStudio.avg') }}</span>
            <span>{{ t('debugStudio.max') }}</span>
          </div>
          <div v-for="span in diagnostics.top_spans_by_count.slice(0, 10)" :key="span.name" class="span-table-row">
            <span class="span-name">{{ span.name }}</span>
            <span class="span-num">{{ span.count }}</span>
            <span class="span-num" :class="{ 'text-error': span.failure_count > 0 }">{{ span.failure_count }}</span>
            <span class="span-num">{{ formatDuration(span.average_duration_ms) }}</span>
            <span class="span-num">{{ formatDuration(span.max_duration_ms) }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.metrics-dashboard { padding: 20px; }
.dashboard-title { font-size: 16px; font-weight: 600; margin: 0 0 20px; }

.dashboard-empty {
  color: #8b949e;
  text-align: center;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.empty-icon { color: #6e7681; }
.empty-icon.spinning {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ---- Metric Cards ---- */
.metric-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}
.metric-card {
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 10px;
  padding: 20px 16px;
  text-align: center;
  transition: border-color 0.15s;
}
.metric-card:hover { border-color: #484f58; }
.metric-card.error { border-color: #da3633; }
.metric-card.error:hover { border-color: #f85149; }
.metric-card.warning { border-color: #d29922; }
.metric-card.warning:hover { border-color: #e3b341; }

.metric-value {
  font-size: 28px;
  font-weight: 700;
  color: #e6edf3;
  font-variant-numeric: tabular-nums;
}
.metric-card.error .metric-value { color: #f85149; }
.metric-card.warning .metric-value { color: #d29922; }
.metric-label {
  font-size: 12px;
  color: #8b949e;
  margin-top: 6px;
}

/* ---- Span Table ---- */
.metric-section { margin-bottom: 24px; }
.section-title {
  font-size: 11px;
  font-weight: 600;
  color: #8b949e;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 10px;
}

.span-table { font-size: 12px; }
.span-table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 8px;
  padding: 6px 10px;
  color: #8b949e;
  border-bottom: 1px solid #30363d;
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}
.span-table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 8px;
  padding: 8px 10px;
  border-bottom: 1px solid #21262d;
  transition: background 0.12s;
}
.span-table-row:hover { background: #161b22; }
.span-name { color: #58a6ff; }
.span-num { font-variant-numeric: tabular-nums; }
.text-error { color: #f85149; font-weight: 600; }
</style>
