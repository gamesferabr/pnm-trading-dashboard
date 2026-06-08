<script setup lang="ts">
import { ref, computed } from 'vue'
import SectionHeader from '@/components/SectionHeader.vue'
import CardHeader from '@/components/CardHeader.vue'
import {
  dashboardStats,
  getLeadsByColdWindow,
  PRODUCT_LABELS,
  formatDate,
} from '@/data/mockData'

const activeTab = ref<30 | 60 | 90>(30)

const counts = {
  30: dashboardStats.reactivation30,
  60: dashboardStats.reactivation60,
  90: dashboardStats.reactivation90,
}

const leads = computed(() => getLeadsByColdWindow(activeTab.value))

const windowDesc: Record<30 | 60 | 90, string> = {
  30: 'Lead entra na sequência automática de reaquecimento pelo agente IA.',
  60: 'Abordagem diferenciada — agente menciona novidade de produto ou mercado (boi/milho).',
  90: 'Último contato automatizado. Sem resposta, lead vai para Base Fria.',
}
</script>

<template>
  <div class="space-y-6">
    <SectionHeader
      title="Recuperação"
      subtitle="Régua de reaquecimento · base RD Station (~500 contatos)"
    />

    <div class="grid gap-4 sm:grid-cols-3">
      <div
        v-for="days in ([30, 60, 90] as const)"
        :key="days"
        class="panel-card cursor-pointer p-5 transition"
        :class="activeTab === days ? 'ring-2 ring-pnm-500' : 'hover:ring-1 hover:ring-zinc-200'"
        @click="activeTab = days"
      >
        <p class="text-xs font-semibold uppercase tracking-wide text-zinc-500">{{ days }} dias sem contato</p>
        <p class="mt-1 font-serif text-3xl font-semibold text-pnm-800">{{ counts[days] }}</p>
        <p class="mt-2 text-xs text-zinc-500">leads na janela</p>
      </div>
    </div>

    <div class="panel-card px-5 py-3">
      <p class="text-sm text-zinc-600">{{ windowDesc[activeTab] }}</p>
      <p class="mt-1 text-xs text-zinc-400">
        Total em reaquecimento ativo: {{ dashboardStats.reactivationActive }} leads
      </p>
    </div>

    <div class="panel-card overflow-hidden">
      <div class="border-b border-zinc-100 px-6 py-4">
        <CardHeader :title="`Leads — janela ${activeTab} dias`" meta="lista filtrável para Cinthia" />
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-pnm-50/40 text-xs uppercase text-zinc-500">
            <tr>
              <th class="px-5 py-3 font-medium">Lead</th>
              <th class="px-5 py-3 font-medium">Produto</th>
              <th class="px-5 py-3 font-medium">Localização</th>
              <th class="px-5 py-3 font-medium">Último contato</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100">
            <tr v-for="lead in leads" :key="lead.id">
              <td class="px-5 py-3 font-medium text-pnm-900">{{ lead.name }}</td>
              <td class="px-5 py-3 text-xs text-zinc-600">{{ PRODUCT_LABELS[lead.product] }}</td>
              <td class="px-5 py-3 text-xs text-zinc-500">{{ lead.location }}</td>
              <td class="px-5 py-3 text-xs text-zinc-500">{{ formatDate(lead.lastContact) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
