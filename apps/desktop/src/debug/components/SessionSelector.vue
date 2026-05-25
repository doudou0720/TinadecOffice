<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const gatewayUrl = window.tinadec?.gatewayUrl?.() ?? 'http://127.0.0.1:48730'

const sessions = ref<Array<{ id: string; title: string }>>([])
const selectedSessionId = ref('')

async function fetchSessions() {
  try {
    const res = await fetch(`${gatewayUrl}/api/v1/sessions`)
    const data = await res.json()
    sessions.value = data.map((s: any) => ({ id: s.id, title: s.title || s.id }))
  } catch {
    sessions.value = []
  }
}

onMounted(fetchSessions)
</script>

<template>
  <select v-model="selectedSessionId" class="session-selector">
    <option value="">{{ t('debugStudio.allSessions') }}</option>
    <option v-for="session in sessions" :key="session.id" :value="session.id">
      {{ session.title }}
    </option>
  </select>
</template>

<style scoped>
.session-selector {
  background: #21262d;
  border: 1px solid #30363d;
  color: #e6edf3;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: border-color 0.15s;
}
.session-selector:hover { border-color: #484f58; }
.session-selector:focus {
  outline: none;
  border-color: #58a6ff;
}
</style>
