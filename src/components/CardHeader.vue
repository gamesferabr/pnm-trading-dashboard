<script setup lang="ts">
defineProps<{
  title: string
  meta?: string
}>()
</script>

<template>
  <div class="mb-5 flex items-baseline justify-between gap-4">
    <h3 class="font-serif text-xl font-semibold text-pnm-900">{{ title }}</h3>
    <span v-if="meta" class="shrink-0 text-xs text-zinc-400">{{ meta }}</span>
  </div>
</template>
