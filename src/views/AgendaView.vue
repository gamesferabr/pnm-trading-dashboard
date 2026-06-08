<script setup lang="ts">
import { useRouter } from 'vue-router'
import SectionHeader from '@/components/SectionHeader.vue'
import CardHeader from '@/components/CardHeader.vue'
import {
  pendingHandoffs,
  hotLeads,
  PRODUCT_LABELS,
  partnerWorkload,
} from '@/data/mockData'

const router = useRouter()

const followUps = [
  { time: '15:00', title: 'Retorno Fazenda Boa Vista', owner: 'Cinthia', type: 'Reaquecimento 30d' },
  { time: '16:30', title: 'Call com João Batista', owner: 'Renan', type: 'Handoff · Mercado Futuro' },
  { time: '17:00', title: 'Follow-up Texas PNM', owner: 'Fabiano', type: 'Confinamento' },
]

function openLead(id: string): void {
  router.push({ name: 'lead', params: { id } })
}
</script>

<template>
  <div class="space-y-6">
    <SectionHeader title="Agenda" subtitle="Handoffs, retornos e compromissos da equipe" />

    <div class="grid gap-5 lg:grid-cols-2">
      <div class="panel-card p-6">
        <CardHeader title="Handoffs para hoje" meta="prioridade Cinthia e sócios" />
        <ul class="space-y-3">
          <li
            v-for="lead in pendingHandoffs"
            :key="lead.id"
            class="flex cursor-pointer items-center justify-between rounded-xl bg-violet-50/60 px-4 py-3 transition hover:bg-violet-50"
            @click="openLead(lead.id)"
          >
            <div>
              <p class="text-sm font-medium text-pnm-900">{{ lead.name }}</p>
              <p class="text-xs text-zinc-500">{{ PRODUCT_LABELS[lead.product] }} · {{ lead.herdSize }}</p>
            </div>
            <span class="text-xs font-medium text-violet-700">Espera {{ lead.waiting }}</span>
          </li>
        </ul>
      </div>

      <div class="panel-card p-6">
        <CardHeader title="Leads quentes" meta="retorno prioritário" />
        <ul class="space-y-3">
          <li
            v-for="lead in hotLeads"
            :key="lead.id"
            class="flex cursor-pointer items-center justify-between rounded-xl bg-amber-50/60 px-4 py-3 transition hover:bg-amber-50"
            @click="openLead(lead.id)"
          >
            <div>
              <p class="text-sm font-medium text-pnm-900">{{ lead.name }}</p>
              <p class="text-xs text-zinc-500">{{ lead.reason }}</p>
            </div>
            <span class="text-xs text-zinc-400">{{ lead.time }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="panel-card p-6">
      <CardHeader title="Compromissos agendados" meta="quarta-feira · 03 jun 2026" />
      <ul class="divide-y divide-zinc-100">
        <li
          v-for="item in followUps"
          :key="item.title"
          class="flex flex-wrap items-center justify-between gap-2 py-3"
        >
          <div class="flex items-center gap-4">
            <span class="font-mono text-sm font-medium text-pnm-700">{{ item.time }}</span>
            <div>
              <p class="text-sm font-medium text-pnm-900">{{ item.title }}</p>
              <p class="text-xs text-zinc-500">{{ item.type }}</p>
            </div>
          </div>
          <span class="rounded-full bg-pnm-100 px-2.5 py-0.5 text-xs font-medium text-pnm-800">
            {{ item.owner }}
          </span>
        </li>
      </ul>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="person in partnerWorkload" :key="person.name" class="panel-card p-4">
        <p class="font-medium text-pnm-900">{{ person.name }}</p>
        <p class="text-xs text-zinc-500">{{ person.handoffs }} handoffs na fila</p>
      </div>
    </div>
  </div>
</template>
