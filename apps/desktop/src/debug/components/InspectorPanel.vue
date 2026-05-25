<script setup lang="ts">
import type { SpanNode } from '../types/trace'
import { useI18n } from 'vue-i18n'
import { Search } from '@lucide/vue'

const { t } = useI18n()

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
      <Search :size="32" class="empty-icon" />
      <div class="empty-text">{{ t('debugStudio.selectSpan') }}</div>
    </div>
    <div v-else class="inspector-content">
      <!-- Header -->
      <div class="inspector-header">
        <h3 class="inspector-title">{{ span.name }}</h3>
        <div class="inspector-meta">
          <span class="meta-chip" :class="span.status.toLowerCase()">{{ span.status }}</span>
          <span class="meta-duration">{{ formatDuration(span.duration_ms) }}</span>
          <span class="meta-kind">{{ span.kind }}</span>
        </div>
      </div>

      <!-- Attributes -->
      <div class="inspector-section">
        <h4 class="section-title">{{ t('debugStudio.attributes') }}</h4>
        <table class="attrs-table">
          <tr v-for="(value, key) in span.attributes" :key="key">
            <td class="attr-key">{{ key }}</td>
            <td class="attr-value">{{ formatValue(value) }}</td>
          </tr>
        </table>
      </div>

      <!-- Events -->
      <div v-if="span.events?.length" class="inspector-section">
        <h4 class="section-title">{{ t('debugStudio.eventsCount', { count: span.events.length }) }}</h4>
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
        <h4 class="section-title">{{ t('debugStudio.ids') }}</h4>
        <div class="id-row">
          <span class="id-label">{{ t('debugStudio.traceLabel') }}</span>
          <code class="id-value">{{ t('debugStudio.seeTrace') }}</code>
        </div>
        <div class="id-row">
          <span class="id-label">{{ t('debugStudio.spanLabel') }}</span>
          <code class="id-value">{{ span.span_id }}</code>
        </div>
        <div v-if="span.parent_span_id" class="id-row">
          <span class="id-label">{{ t('debugStudio.parentLabel') }}</span>
          <code class="id-value">{{ span.parent_span_id }}</code>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inspector-panel {
  height: 100%;
  overflow-y: auto;
  background: #0d1117;
}

/* ---- Empty State ---- */
.inspector-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 10px;
  color: #8b949e;
}
.empty-icon { color: #6e7681; opacity: 0.6; }
.empty-text { font-size: 13px; }

/* ---- Content ---- */
.inspector-content { padding: 16px; }

.inspector-header {
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #21262d;
}
.inspector-title {
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 8px;
  line-height: 1.4;
}
.inspector-meta {
  display: flex;
  gap: 8px;
  align-items: center;
}
.meta-chip {
  padding: 2px 10px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.3px;
}
.meta-chip.ok { background: #238636; color: #fff; }
.meta-chip.error { background: #da3633; color: #fff; }
.meta-duration { font-size: 13px; color: #8b949e; font-variant-numeric: tabular-nums; }
.meta-kind { font-size: 11px; color: #6e7681; }

/* ---- Sections ---- */
.inspector-section { margin-bottom: 20px; }
.section-title {
  font-size: 11px;
  font-weight: 600;
  color: #8b949e;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 10px;
}

.attrs-table { width: 100%; border-collapse: collapse; }
.attrs-table td {
  padding: 5px 10px;
  font-size: 12px;
  border-bottom: 1px solid #21262d;
  vertical-align: top;
}
.attr-key { color: #8b949e; white-space: nowrap; width: 40%; }
.attr-value { color: #e6edf3; word-break: break-all; }
.attrs-table.compact td { padding: 3px 10px; }

.event-item {
  padding: 8px 0;
  border-bottom: 1px solid #21262d;
}
.event-item:last-child { border-bottom: none; }
.event-name { font-size: 12px; font-weight: 500; color: #58a6ff; margin-bottom: 4px; }

.id-row {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 4px 0;
}
.id-label { font-size: 11px; color: #8b949e; width: 48px; flex-shrink: 0; }
.id-value {
  font-size: 11px;
  color: #6e7681;
  font-family: 'Cascadia Code', 'Fira Code', 'JetBrains Mono', monospace;
  word-break: break-all;
}
</style>
