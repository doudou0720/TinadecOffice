<script setup lang="ts">
import { Bot, User, Copy, Check } from '@lucide/vue'
import { ref } from 'vue'
import { UiBadge, UiButton } from '@/components/ui'
import type { MessageDto } from '../api'

const props = defineProps<{
  message: MessageDto
  index: number
}>()

const copied = ref(false)

function handleCopy() {
  navigator.clipboard.writeText(props.message.content)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}
</script>

<template>
  <article class="message-wrapper" :class="message.role">
    <div class="message-meta">
      <div class="avatar">
        <User v-if="message.role === 'user'" :size="14" />
        <Bot v-else :size="14" />
      </div>
    </div>

    <div class="message-body">
      <div v-if="message.role === 'user'" class="user-message-header">
        <UiButton variant="ghost" size="icon" class="message-copy-btn" @click="handleCopy">
          <Check v-if="copied" :size="12" />
          <Copy v-else :size="12" />
        </UiButton>
        <UiBadge variant="secondary" class="message-index-badge">{{ index + 1 }}</UiBadge>
      </div>

      <div class="message-content">
        <p>{{ message.content }}</p>
      </div>
    </div>
  </article>
</template>
