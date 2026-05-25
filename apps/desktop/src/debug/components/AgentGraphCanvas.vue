<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { SessionDto } from '../../api'

const gatewayUrl = window.tinadec?.gatewayUrl?.() ?? 'http://127.0.0.1:48730'

interface AgentNode {
  id: string
  label: string
  status: 'completed' | 'running' | 'pending' | 'failed' | 'blocked'
  x: number
  y: number
}

interface AgentEdge {
  from: string
  to: string
}

const nodes = ref<AgentNode[]>([])
const edges = ref<AgentEdge[]>([])
const loading = ref(false)

const statusColors: Record<string, string> = {
  completed: '#238636',
  running: '#58a6ff',
  pending: '#6e7681',
  failed: '#da3633',
  blocked: '#d29922',
}

const statusIcons: Record<string, string> = {
  completed: '●',
  running: '◐',
  pending: '○',
  failed: '✕',
  blocked: '⏸',
}

async function fetchGraph() {
  loading.value = true
  try {
    const res = await fetch(`${gatewayUrl}/api/v1/agents`)
    const agents = await res.json()
    // Place agents in a grid layout
    nodes.value = agents.map((a: any, i: number) => ({
      id: a.id,
      label: a.layer || a.id,
      status: 'pending' as const,
      x: 80 + (i % 3) * 240,
      y: 60 + Math.floor(i / 3) * 140,
    }))
    // Create sequential edges
    edges.value = []
    for (let i = 1; i < nodes.value.length; i++) {
      edges.value.push({ from: nodes.value[i - 1].id, to: nodes.value[i].id })
    }
  } catch {
    // Fallback: show placeholder
    nodes.value = [
      { id: 'planner', label: 'planner', status: 'completed', x: 200, y: 60 },
      { id: 'code-explorer', label: 'code-explorer', status: 'running', x: 80, y: 200 },
      { id: 'code-writer', label: 'code-writer', status: 'pending', x: 320, y: 200 },
      { id: 'review-executor', label: 'review-executor', status: 'blocked', x: 200, y: 340 },
    ]
    edges.value = [
      { from: 'planner', to: 'code-explorer' },
      { from: 'planner', to: 'code-writer' },
      { from: 'code-explorer', to: 'review-executor' },
    ]
  } finally {
    loading.value = false
  }
}

onMounted(fetchGraph)
</script>

<template>
  <div class="agent-graph">
    <div v-if="loading" class="graph-empty">Loading agent graph...</div>
    <svg v-else class="graph-canvas" width="100%" height="100%">
      <!-- Edges -->
      <line
        v-for="(edge, i) in edges"
        :key="'e' + i"
        :x1="nodes.find(n => n.id === edge.from)?.x"
        :y1="nodes.find(n => n.id === edge.from)?.y"
        :x2="nodes.find(n => n.id === edge.to)?.x"
        :y2="nodes.find(n => n.id === edge.to)?.y"
        stroke="#30363d"
        stroke-width="2"
        marker-end="url(#arrow)"
      />
      <!-- Arrow marker -->
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#30363d" />
        </marker>
      </defs>
      <!-- Nodes -->
      <g v-for="node in nodes" :key="node.id">
        <rect
          :x="node.x - 70" :y="node.y - 24"
          width="140" height="48" rx="8"
          :fill="statusColors[node.status]"
          fill-opacity="0.15"
          :stroke="statusColors[node.status]"
          stroke-width="2"
        />
        <text
          :x="node.x" :y="node.y"
          text-anchor="middle" dominant-baseline="middle"
          fill="#e6edf3" font-size="13" font-weight="500"
        >
          {{ statusIcons[node.status] }} {{ node.label }}
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.agent-graph { width: 100%; height: 100%; min-height: 400px; }
.graph-empty { display: flex; align-items: center; justify-content: center; height: 100%; color: #8b949e; }
.graph-canvas { min-height: 400px; }
</style>
