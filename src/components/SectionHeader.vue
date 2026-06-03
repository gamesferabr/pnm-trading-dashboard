<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="mb-6">
    <h2 class="font-serif text-2xl font-semibold text-pnm-900">{{ title }}</h2>
    <p v-if="subtitle" class="mt-1 text-sm text-zinc-500">{{ subtitle }}</p>
    <div class="mt-4 border-b border-zinc-200/80" />
  </div>
</template>
