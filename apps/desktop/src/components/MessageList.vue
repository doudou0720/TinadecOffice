<script setup lang="ts">
import { Bot } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import { UiScrollArea } from '@/components/ui'
import type { MessageDto } from '../api'
import MessageItem from './MessageItem.vue'

const { t } = useI18n()

defineProps<{
  messages: MessageDto[]
}>()
</script>

<template>
  <UiScrollArea class="message-stream">
    <div class="message-stream-inner">
      <MessageItem
        v-for="(message, index) in messages"
        :key="message.id"
        :message="message"
        :index="index"
      />
      <div v-if="messages.length === 0" class="empty-state">
        <Bot :size="24" />
        <span>{{ t('chat.ready') }}</span>
      </div>
    </div>
  </UiScrollArea>
</template>
