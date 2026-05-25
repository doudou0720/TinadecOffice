<script setup lang="ts">
import type { DiagnosticsReport, FailureCluster, RecentFailure } from '../types/metrics'

const props = defineProps<{
  report: DiagnosticsReport | null
}>()

function formatTime(iso: string): string {
  try { return new Date(iso).toLocaleTimeString() } catch { return iso }
}
</script>

<template>
  <div class="diagnostics-report">
    <h3 class="report-title">Diagnostics Report</h3>

    <div v-if="!report" class="report-empty">No diagnostics data available</div>

    <template v-else>
      <div class="report-meta">
        <span>Generated: {{ formatTime(report.generated_at) }}</span>
        <span>Trace file: {{ report.trace_file_path }}</span>
      </div>

      <!-- Common Failures -->
      <div class="report-section">
        <h4 class="section-title">Common Failures</h4>
        <div v-if="report.common_failures.length === 0" class="empty-note">No failures recorded</div>
        <div v-for="(failure, i) in report.common_failures" :key="i" class="failure-item">
          <div class="failure-header">
            <span class="failure-name">{{ failure.name }}</span>
            <span class="failure-count">{{ failure.count }}×</span>
          </div>
          <div class="failure-cause">{{ failure.cause }}</div>
          <div class="failure-time">Last seen: {{ formatTime(failure.last_seen_at) }}</div>
        </div>
      </div>

      <!-- Latest Failures -->
      <div class="report-section">
        <h4 class="section-title">Latest Failures</h4>
        <div v-if="report.latest_failures.length === 0" class="empty-note">No recent failures</div>
        <div v-for="(failure, i) in report.latest_failures.slice(0, 10)" :key="i" class="failure-item compact">
          <span class="failure-name">{{ failure.name }}</span>
          <span class="failure-cause">{{ failure.cause }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.diagnostics-report { padding: 16px; }
.report-title { font-size: 16px; font-weight: 600; margin: 0 0 8px; }
.report-empty { color: #8b949e; text-align: center; padding: 24px; }
.report-meta { font-size: 12px; color: #6e7681; margin-bottom: 16px; display: flex; gap: 16px; }

.report-section { margin-bottom: 20px; }
.section-title { font-size: 13px; font-weight: 600; color: #8b949e; text-transform: uppercase; margin: 0 0 8px; }
.empty-note { color: #6e7681; font-size: 13px; padding: 8px 0; }

.failure-item {
  padding: 8px 12px; background: #161b22; border: 1px solid #30363d;
  border-radius: 6px; margin-bottom: 8px; border-left: 3px solid #da3633;
}
.failure-item.compact { padding: 4px 8px; }
.failure-header { display: flex; justify-content: space-between; align-items: center; }
.failure-name { font-size: 13px; font-weight: 500; color: #f85149; }
.failure-count { font-size: 12px; color: #8b949e; }
.failure-cause { font-size: 12px; color: #8b949e; margin-top: 2px; }
.failure-time { font-size: 11px; color: #6e7681; margin-top: 2px; }
</style>
