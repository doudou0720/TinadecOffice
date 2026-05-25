<script setup lang="ts">
import type { SpanNode } from '../types/trace'

const props = defineProps<{
  span: SpanNode | null
}>()

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return '—'
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms.toFixed(0)}ms`
  return `${(ms / 1000).toFixed(2)}s`
}
</script>

<template>
  <div class="inspector-panel">
    <div v-if="!span" class="inspector-empty">
      Select a span to view details
    </div>
    <div v-else class="inspector-content">
      <h3 class="inspector-title">{{ span.name }}</h3>
      <div class="inspector-meta">
        <span class="meta-chip" :class="span.status.toLowerCase()">{{ span.status }}</span>
        <span class="meta-duration">{{ formatDuration(span.duration_ms) }}</span>
        <span class="meta-kind">{{ span.kind }}</span>
      </div>

      <!-- Attributes -->
      <div class="inspector-section">
        <h4 class="section-title">Attributes</h4>
        <table class="attrs-table">
          <tr v-for="(value, key) in span.attributes" :key="key">
            <td class="attr-key">{{ key }}</td>
            <td class="attr-value">{{ formatValue(value) }}</td>
          </tr>
        </table>
      </div>

      <!-- Events -->
      <div v-if="span.events?.length" class="inspector-section">
        <h4 class="section-title">Events ({{ span.events.length }})</h4>
        <div v-for="(event, i) in span.events" :key="i" class="event-item">
          <div class="event-name">{{ event.name }}</div>
          <table v-if="Object.keys(event.attributes).length" class="attrs-table compact">
            <tr v-for="(value, key) in event.attributes" :key="key">
              <td class="attr-key">{{ key }}</td>
              <td class="attr-value">{{ formatValue(value) }}</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- Span IDs -->
      <div class="inspector-section">
        <h4 class="section-title">IDs</h4>
        <div class="id-row"><span class="id-label">Trace</span><code class="id-value">{{ span.name ? 'see trace' : '' }}</code></div>
        <div class="id-row"><span class="id-label">Span</span><code class="id-value">{{ span.span_id }}</code></div>
        <div v-if="span.parent_span_id" class="id-row"><span class="id-label">Parent</span><code class="id-value">{{ span.parent_span_id }}</code></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inspector-panel { height: 100%; overflow-y: auto; background: #0d1117; }
.inspector-empty { display: flex; align-items: center; justify-content: center; height: 100%; color: #8b949e; font-size: 13px; }
.inspector-content { padding: 12px; }

.inspector-title { font-size: 15px; font-weight: 600; margin: 0 0 8px; }
.inspector-meta { display: flex; gap: 8px; align-items: center; margin-bottom: 16px; }
.meta-chip { padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
.meta-chip.ok { background: #238636; color: #fff; }
.meta-chip.error { background: #da3633; color: #fff; }
.meta-duration { font-size: 13px; color: #8b949e; }
.meta-kind { font-size: 11px; color: #6e7681; }

.inspector-section { margin-bottom: 16px; }
.section-title { font-size: 12px; font-weight: 600; color: #8b949e; text-transform: uppercase; margin: 0 0 8px; }

.attrs-table { width: 100%; border-collapse: collapse; }
.attrs-table td { padding: 3px 8px; font-size: 12px; border-bottom: 1px solid #21262d; }
.attr-key { color: #8b949e; white-space: nowrap; width: 40%; }
.attr-value { color: #e6edf3; word-break: break-all; }
.attrs-table.compact td { padding: 2px 8px; }

.event-item { padding: 6px 0; border-bottom: 1px solid #21262d; }
.event-name { font-size: 12px; font-weight: 500; color: #58a6ff; }

.id-row { display: flex; gap: 8px; align-items: center; padding: 2px 0; }
.id-label { font-size: 11px; color: #8b949e; width: 48px; }
.id-value { font-size: 11px; color: #6e7681; font-family: monospace; }
</style>
