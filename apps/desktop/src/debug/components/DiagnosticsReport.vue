<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ClipboardList, CheckCircle2 } from '@lucide/vue'
import type { DiagnosticsReport, FailureCluster, RecentFailure } from '../types/metrics'

const { t } = useI18n()

const props = defineProps<{
  report: DiagnosticsReport | null
}>()

function formatTime(iso: string): string {
  try { return new Date(iso).toLocaleTimeString() } catch { return iso }
}
</script>

<template>
  <div class="diagnostics-report">
    <h3 class="report-title">{{ t('debugStudio.diagnosticsTitle') }}</h3>

    <div v-if="!report" class="report-empty">
      <ClipboardList :size="24" class="empty-icon" />
      <span>{{ t('debugStudio.noDiagnostics') }}</span>
    </div>

    <template v-else>
      <!-- Meta info -->
      <div class="report-meta">
        <div class="meta-item">
          <span class="meta-label">{{ t('debugStudio.generated') }}</span>
          <span class="meta-value">{{ formatTime(report.generated_at) }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">{{ t('debugStudio.traceFile') }}</span>
          <code class="meta-value code">{{ report.trace_file_path }}</code>
        </div>
      </div>

      <!-- Common Failures -->
      <div class="report-section">
        <h4 class="section-title">{{ t('debugStudio.commonFailures') }}</h4>
        <div v-if="report.common_failures.length === 0" class="empty-note">
          <CheckCircle2 :size="14" class="empty-icon-sm" /> {{ t('debugStudio.noFailures') }}
        </div>
        <div v-for="(failure, i) in report.common_failures" :key="i" class="failure-item">
          <div class="failure-header">
            <span class="failure-name">{{ failure.name }}</span>
            <span class="failure-count">{{ failure.count }}×</span>
          </div>
          <div class="failure-cause">{{ failure.cause }}</div>
          <div class="failure-time">{{ t('debugStudio.lastSeen') }}: {{ formatTime(failure.last_seen_at) }}</div>
        </div>
      </div>

      <!-- Latest Failures -->
      <div class="report-section">
        <h4 class="section-title">{{ t('debugStudio.latestFailures') }}</h4>
        <div v-if="report.latest_failures.length === 0" class="empty-note">
          <CheckCircle2 :size="14" class="empty-icon-sm" /> {{ t('debugStudio.noRecentFailures') }}
        </div>
        <div v-for="(failure, i) in report.latest_failures.slice(0, 10)" :key="i" class="failure-item compact">
          <span class="failure-name">{{ failure.name }}</span>
          <span class="failure-cause">{{ failure.cause }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.diagnostics-report { padding: 20px; }
.report-title { font-size: 16px; font-weight: 600; margin: 0 0 16px; }

.report-empty {
  color: #8b949e;
  text-align: center;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.empty-icon { color: #6e7681; }

/* ---- Meta ---- */
.report-meta {
  display: flex;
  gap: 24px;
  padding: 12px 16px;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  margin-bottom: 24px;
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.meta-label { font-size: 12px; color: #8b949e; }
.meta-value { font-size: 12px; color: #e6edf3; }
.meta-value.code {
  font-family: 'Cascadia Code', 'Fira Code', 'JetBrains Mono', monospace;
  color: #6e7681;
}

/* ---- Sections ---- */
.report-section { margin-bottom: 24px; }
.section-title {
  font-size: 11px;
  font-weight: 600;
  color: #8b949e;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px;
}
.empty-note {
  color: #6e7681;
  font-size: 13px;
  padding: 12px 0;
  display: flex;
  align-items: center;
  gap: 6px;
}
.empty-icon-sm { color: #238636; flex-shrink: 0; }

/* ---- Failure Items ---- */
.failure-item {
  padding: 12px 16px;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  margin-bottom: 8px;
  border-left: 3px solid #da3633;
  transition: border-color 0.15s;
}
.failure-item:hover { border-color: #484f58; border-left-color: #f85149; }
.failure-item.compact {
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.failure-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}
.failure-name { font-size: 13px; font-weight: 500; color: #f85149; }
.failure-count { font-size: 12px; color: #8b949e; font-variant-numeric: tabular-nums; }
.failure-cause { font-size: 12px; color: #8b949e; margin-top: 2px; }
.failure-time { font-size: 11px; color: #6e7681; margin-top: 4px; }
</style>
