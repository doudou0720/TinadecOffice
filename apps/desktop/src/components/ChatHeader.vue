<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { SessionDto, ProjectDto } from '../api'

const { t } = useI18n()

defineProps<{
  currentSession: SessionDto | null
  currentProject: ProjectDto | null
}>()
</script>

<template>
  <div class="conversation-head">
    <h1>{{ currentSession?.title ?? t('chat.title') }}</h1>
    <p v-if="currentProject?.path">{{ currentProject.path }}</p>
  </div>
</template>
