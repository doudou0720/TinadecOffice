<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { SessionDto } from '../api'

const { t } = useI18n()

defineProps<{
  currentSession: SessionDto | null
}>()
</script>

<template>
  <div class="conversation-head">
    <h1>{{ currentSession?.title ?? t('chat.title') }}</h1>
  </div>
</template>
