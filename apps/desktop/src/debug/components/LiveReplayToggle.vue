<script setup lang="ts">
import { ref } from 'vue'

const mode = ref<'live' | 'replay'>('live')
</script>

<template>
  <div class="live-replay-toggle">
    <button
      class="toggle-btn"
      :class="{ active: mode === 'live' }"
      @click="mode = 'live'"
    >LIVE</button>
    <button
      class="toggle-btn"
      :class="{ active: mode === 'replay' }"
      @click="mode = 'replay'"
    >REPLAY</button>
  </div>
</template>

<style scoped>
.live-replay-toggle {
  display: flex;
  background: #21262d;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #30363d;
}
.toggle-btn {
  background: none; border: none; color: #8b949e;
  padding: 2px 10px; font-size: 10px; font-weight: 700; cursor: pointer;
}
.toggle-btn.active { background: #30363d; color: #e6edf3; }
.toggle-btn:first-child.active { color: #3fb950; }
</style>
