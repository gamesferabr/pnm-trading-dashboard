<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import SectionHeader from '@/components/SectionHeader.vue'
import {
  mockLeads,
  PRODUCT_LABELS,
  formatDateTime,
  dashboardStats,
} from '@/data/mockData'

const router = useRouter()

const activeChats = computed(() =>
  mockLeads.filter(
    (lead) =>
      lead.aiStatus === 'ativa' ||
      lead.status === 'em_atendimento' ||
      lead.status === 'novo',
  ),
)

function openLead(id: string): void {
  router.push({ name: 'lead', params: { id } })
}

function lastMessage(lead: (typeof mockLeads)[0]): string {
  const timeline = lead.timeline
  const last = timeline.length ? timeline[timeline.length - 1] : undefined
  return last?.message ?? 'Conversa iniciada — aguardando mensagens'
}
</script>

<template>
  <div class="space-y-6">
    <SectionHeader
      title="Conversas"
      subtitle="Inbox centralizado · WhatsApp + agente IA"
    />

    <div class="grid gap-4 sm:grid-cols-3">
      <div class="panel-card p-4">
        <p class="text-xs text-zinc-500">Conversas ativas</p>
        <p class="font-serif text-2xl font-semibold text-pnm-800">{{ dashboardStats.activeConversations }}</p>
      </div>
      <div class="panel-card p-4">
        <p class="text-xs text-zinc-500">Tempo médio resposta</p>
        <p class="font-serif text-2xl font-semibold text-pnm-800">{{ dashboardStats.avgResponseTime }}</p>
      </div>
      <div class="panel-card p-4">
        <p class="text-xs text-zinc-500">Msgs IA hoje</p>
        <p class="font-serif text-2xl font-semibold text-pnm-800">{{ dashboardStats.messagesToday }}</p>
      </div>
    </div>

    <div class="panel-card divide-y divide-zinc-100">
      <button
        v-for="lead in activeChats"
        :key="lead.id"
        type="button"
        class="flex w-full items-start gap-4 px-5 py-4 text-left transition hover:bg-pnm-50/40"
        @click="openLead(lead.id)"
      >
        <div
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pnm-100 text-sm font-semibold text-pnm-800"
        >
          {{ lead.name.charAt(0) }}
        </div>
        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between gap-2">
            <p class="font-medium text-pnm-900">{{ lead.name }}</p>
            <span class="shrink-0 text-xs text-zinc-400">{{ formatDateTime(lead.lastContact) }}</span>
          </div>
          <p class="mt-0.5 text-xs text-pnm-600">{{ PRODUCT_LABELS[lead.product] }}</p>
          <p class="mt-1 truncate text-sm text-zinc-500">{{ lastMessage(lead) }}</p>
        </div>
        <span
          class="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase"
          :class="
            lead.aiStatus === 'ativa'
              ? 'bg-emerald-100 text-emerald-700'
              : lead.aiStatus === 'handoff'
                ? 'bg-violet-100 text-violet-700'
                : 'bg-zinc-100 text-zinc-600'
          "
        >
          IA {{ lead.aiStatus }}
        </span>
      </button>
    </div>

    <div v-if="!activeChats.length" class="panel-card p-12 text-center text-sm text-zinc-400">
      Nenhuma conversa ativa no momento.
    </div>
  </div>
</template>
