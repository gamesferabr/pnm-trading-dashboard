<script setup lang="ts">
import SectionHeader from '@/components/SectionHeader.vue'
import NavIcon from '@/components/NavIcon.vue'
import { recentActivity, formatRelativeTime } from '@/data/mockData'

const activityMeta: Record<string, { title: string; icon: string }> = {
  conversa: { title: 'Mensagem recebida', icon: 'message' },
  handoff: { title: 'Handoff solicitado', icon: 'bot' },
  qualificado: { title: 'Lead qualificado', icon: 'users' },
  fechado: { title: 'Venda confirmada', icon: 'trend' },
  reaquecimento: { title: 'Reaquecimento enviado', icon: 'megaphone' },
}

const systemEvents = [
  { id: 'e-1', title: 'Reaquecimento 30d executado', detail: '89 mensagens enfileiradas · anti-bloqueio ativo', timestamp: '2026-06-03T09:00:00' },
  { id: 'e-2', title: 'Alerta lead quente', detail: 'Marcos Aurélio pediu cotação boi gordo → notificação Renan', timestamp: '2026-06-03T14:20:00' },
  { id: 'e-3', title: 'Áudio transcrito', detail: 'Agropecuária Três Irmãos · Whisper/Groq · 42s', timestamp: '2026-06-03T10:55:00' },
  { id: 'e-4', title: 'Lead movido para Base Fria', detail: 'Lucas Ferreira · 90d sem resposta', timestamp: '2026-06-02T18:00:00' },
]

interface TimelineEvent {
  id: string
  title: string
  detail: string
  timestamp: string
  icon: string
}

const allEvents: TimelineEvent[] = [
  ...recentActivity.map((item) => ({
    id: item.id,
    title: activityMeta[item.type]?.title ?? item.leadName,
    detail: `${item.leadName} · ${item.description}`,
    timestamp: item.timestamp,
    icon: activityMeta[item.type]?.icon ?? 'pulse',
  })),
  ...systemEvents.map((item) => ({
    id: item.id,
    title: item.title,
    detail: item.detail,
    timestamp: item.timestamp,
    icon: 'pulse',
  })),
].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
</script>

<template>
  <div class="space-y-6">
    <SectionHeader title="Eventos" subtitle="Log unificado · CRM, agente IA e automações" />

    <div class="panel-card divide-y divide-zinc-100">
      <div v-for="event in allEvents" :key="event.id" class="flex items-start gap-4 px-5 py-4">
        <div class="icon-box">
          <NavIcon :name="event.icon" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-pnm-900">{{ event.title }}</p>
          <p class="mt-0.5 text-xs text-zinc-500">{{ event.detail }}</p>
        </div>
        <span class="shrink-0 text-xs text-zinc-400">
          {{ formatRelativeTime(event.timestamp) }}
        </span>
      </div>
    </div>
  </div>
</template>
