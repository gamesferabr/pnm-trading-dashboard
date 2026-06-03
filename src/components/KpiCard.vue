<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  hint?: string
}>()
</script>

<template>
  <div class="panel-card card-hover p-5">
    <div class="flex items-start justify-between gap-3">
      <div class="icon-box">
        <slot name="icon" />
      </div>
    </div>
    <p class="mt-4 text-sm text-zinc-500">{{ label }}</p>
    <p class="font-serif mt-1 text-3xl font-semibold tracking-tight text-pnm-800">{{ value }}</p>
    <p v-if="hint" class="mt-1.5 text-xs text-zinc-400">{{ hint }}</p>
  </div>
</template>
