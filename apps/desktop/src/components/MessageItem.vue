<script setup lang="ts">
import { Copy, Check, Pencil } from '@lucide/vue'
import { ref } from 'vue'
import { UiButton } from '@/components/ui'
import MarkdownRender from './MarkdownRender.vue'
import type { MessageDto } from '../api'

const props = defineProps<{
  message: MessageDto
  index: number
}>()

const copied = ref(false)
const isEditing = ref(false)
const editContent = ref('')

function handleCopy() {
  navigator.clipboard.writeText(props.message.content)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}

function startEdit() {
  editContent.value = props.message.content
  isEditing.value = true
}

function cancelEdit() {
  isEditing.value = false
}

function saveEdit() {
  // TODO: emit edit event
  isEditing.value = false
}
</script>

<template>
  <article class="message-wrapper" :class="message.role">
    <!-- AI 消息：Markdown 渲染，无头像无对话框 -->
    <template v-if="message.role === 'assistant'">
      <div class="assistant-message-row">
        <div class="message-content assistant">
          <MarkdownRender :content="message.content" />
        </div>
      </div>
    </template>

    <!-- 用户消息：对话框气泡 + 左侧操作按钮 -->
    <template v-else>
      <div class="user-message-row">
        <!-- 左侧操作按钮 -->
        <div class="user-message-actions">
          <UiButton variant="ghost" size="icon" class="message-action-btn" :title="$t('chat.copy')" @click="handleCopy">
            <Check v-if="copied" :size="12" />
            <Copy v-else :size="12" />
          </UiButton>
          <UiButton variant="ghost" size="icon" class="message-action-btn" :title="$t('chat.edit')" @click="startEdit">
            <Pencil :size="12" />
          </UiButton>
        </div>

        <!-- 对话框气泡 -->
        <div class="message-content user">
          <template v-if="isEditing">
            <textarea v-model="editContent" class="edit-textarea" rows="3" />
            <div class="edit-actions">
              <UiButton variant="ghost" size="sm" @click="cancelEdit">{{ $t('common.cancel') }}</UiButton>
              <UiButton variant="default" size="sm" @click="saveEdit">{{ $t('common.save') }}</UiButton>
            </div>
          </template>
          <p v-else>{{ message.content }}</p>
        </div>
      </div>
    </template>
  </article>
</template>
