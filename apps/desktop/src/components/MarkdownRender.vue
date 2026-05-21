<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const props = defineProps<{
  content: string
}>()

const renderedHtml = computed(() => {
  const rawHtml = marked.parse(props.content, {
    breaks: true,
    gfm: true,
  })
  return DOMPurify.sanitize(rawHtml as string)
})
</script>

<template>
  <div class="markdown-body" v-html="renderedHtml" />
</template>
