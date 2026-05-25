<script setup lang="ts">
import type { TraceSummary, TraceDetail, SpanNode } from '../types/trace'
import { getSpanColor } from '../types/trace'
import { ref, computed } from 'vue'

const props = defineProps<{
  traces: TraceSummary[]
  currentTrace: TraceDetail | null
  selectedSpan: SpanNode | null
  loading: boolean
}>()

const emit = defineEmits<{
  'select-trace': [traceId: string]
  'select-span': [span: SpanNode]
}>()

const filterName = ref('')
const filterStatus = ref('')

const filteredTraces = computed(() => {
  let result = props.traces
  if (filterName.value) {
    const q = filterName.value.toLowerCase()
    result = result.filter(t => t.root_span_name.toLowerCase().includes(q))
  }
  if (filterStatus.value) {
    result = result.filter(t => t.error_count > 0 ? 'error' : 'ok' === filterStatus.value.toLowerCase())
  }
  return result
})

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms.toFixed(0)}ms`
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`
  return `${(ms / 60000).toFixed(1)}m`
}

function flattenSpans(nodes: SpanNode[], depth = 0): Array<SpanNode & { depth: number }> {
  const result: Array<SpanNode & { depth: number }> = []
  for (const node of nodes) {
    result.push({ ...node, depth })
    if (node.children?.length) {
      result.push(...flattenSpans(node.children, depth + 1))
    }
  }
  return result
}

const flatSpans = computed(() => {
  if (!props.currentTrace?.root_span) return []
  return flattenSpans(props.currentTrace.root_span)
})
</script>

<template>
  <div class="trace-timeline">
    <!-- Filter bar -->
    <div class="timeline-filter">
      <input v-model="filterName" placeholder="Filter by name..." class="filter-input" />
      <select v-model="filterStatus" class="filter-select">
        <option value="">All status</option>
        <option value="ok">OK</option>
        <option value="error">Error</option>
      </select>
    </div>

    <!-- Trace list (when no trace selected) -->
    <div v-if="!currentTrace" class="trace-list">
      <div v-if="loading" class="timeline-empty">Loading traces...</div>
      <div v-else-if="filteredTraces.length === 0" class="timeline-empty">No traces found</div>
      <div
        v-for="trace in filteredTraces"
        :key="trace.trace_id"
        class="trace-item"
        @click="emit('select-trace', trace.trace_id)"
      >
        <div class="trace-item-color" :style="{ background: getSpanColor(trace.root_span_name, trace.error_count > 0 ? 'ERROR' : 'OK') }" />
        <div class="trace-item-info">
          <div class="trace-item-name">{{ trace.root_span_name }}</div>
          <div class="trace-item-meta">
            {{ formatDuration(trace.root_span_duration_ms) }} · {{ trace.span_count }} spans
            <span v-if="trace.error_count > 0" class="error-badge">{{ trace.error_count }} errors</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Span waterfall (when trace selected) -->
    <div v-else class="span-waterfall">
      <button class="back-btn" @click="emit('select-trace', '')">← Back to traces</button>
      <div
        v-for="span in flatSpans"
        :key="span.span_id"
        class="span-row"
        :class="{ selected: selectedSpan?.span_id === span.span_id, error: span.status === 'ERROR' }"
        :style="{ paddingLeft: `${span.depth * 20 + 8}px` }"
        @click="emit('select-span', span)"
      >
        <div class="span-row-bar">
          <div
            class="span-bar"
            :style="{
              width: `${Math.min(span.duration_ms / (currentTrace?.root_span?.[0]?.duration_ms || 1) * 100, 100)}%`,
              background: getSpanColor(span.name, span.status)
            }"
          />
        </div>
        <div class="span-row-info">
          <span class="span-name">{{ span.name }}</span>
          <span class="span-duration">{{ formatDuration(span.duration_ms) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.trace-timeline { height: 100%; display: flex; flex-direction: column; }
.timeline-filter { display: flex; gap: 8px; padding: 8px 12px; border-bottom: 1px solid #30363d; }
.filter-input, .filter-select {
  background: #0d1117; border: 1px solid #30363d; color: #e6edf3;
  padding: 4px 8px; border-radius: 4px; font-size: 12px;
}
.filter-input { flex: 1; }

.trace-list { flex: 1; overflow-y: auto; }
.trace-item {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px; cursor: pointer; border-bottom: 1px solid #21262d;
}
.trace-item:hover { background: #161b22; }
.trace-item-color { width: 4px; height: 32px; border-radius: 2px; flex-shrink: 0; }
.trace-item-name { font-size: 13px; font-weight: 500; }
.trace-item-meta { font-size: 11px; color: #8b949e; }
.error-badge { color: #f85149; margin-left: 4px; }
.timeline-empty { padding: 24px; text-align: center; color: #8b949e; }

.span-waterfall { flex: 1; overflow-y: auto; }
.back-btn { background: none; border: none; color: #58a6ff; cursor: pointer; padding: 8px 12px; font-size: 12px; }
.span-row {
  display: flex; align-items: center; gap: 8px; padding: 4px 8px;
  border-bottom: 1px solid #21262d; cursor: pointer; min-height: 28px;
}
.span-row:hover { background: #161b22; }
.span-row.selected { background: #1c2333; }
.span-row.error .span-name { color: #f85149; }

.span-row-bar { flex: 2; height: 14px; background: #21262d; border-radius: 3px; position: relative; overflow: hidden; }
.span-bar { position: absolute; top: 0; left: 0; height: 100%; border-radius: 3px; opacity: 0.7; }
.span-row-info { flex: 1; display: flex; justify-content: space-between; align-items: center; min-width: 0; }
.span-name { font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.span-duration { font-size: 11px; color: #8b949e; flex-shrink: 0; }
</style>
