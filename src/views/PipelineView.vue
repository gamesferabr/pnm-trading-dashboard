<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  mockLeads,
  STATUS_LABELS,
  STATUS_COLORS,
  PRODUCT_LABELS,
  formatDateTime,
} from '@/data/mockData'
import SectionHeader from '@/components/SectionHeader.vue'
import type { Lead, LeadStatus, ProductTrail } from '@/types'

const router = useRouter()

const search = ref('')
const filterProduct = ref<ProductTrail | 'all'>('all')
const filterStatus = ref<LeadStatus | 'all'>('all')
const viewMode = ref<'kanban' | 'list'>('kanban')

const columns: LeadStatus[] = [
  'novo',
  'em_atendimento',
  'qualificado',
  'handoff',
  'fechado',
  'perdido',
]

const filteredLeads = computed(() => {
  return mockLeads.filter((lead) => {
    const matchSearch =
      !search.value ||
      lead.name.toLowerCase().includes(search.value.toLowerCase()) ||
      lead.phone.includes(search.value)
    const matchProduct = filterProduct.value === 'all' || lead.product === filterProduct.value
    const matchStatus = filterStatus.value === 'all' || lead.status === filterStatus.value
    return matchSearch && matchProduct && matchStatus
  })
})

function leadsInColumn(status: LeadStatus): Lead[] {
  return filteredLeads.value.filter((l) => l.status === status)
}

function openLead(id: string): void {
  router.push({ name: 'lead', params: { id } })
}

const aiBadge: Record<string, string> = {
  ativa: 'bg-emerald-100 text-emerald-700',
  pausada: 'bg-zinc-100 text-zinc-600',
  handoff: 'bg-violet-100 text-violet-700',
}
</script>

<template>
  <div class="space-y-6">
    <SectionHeader title="Pipeline de leads" subtitle="Funil visual de atendimento e qualificação" />

    <div class="panel-card flex flex-col gap-3 p-4 lg:flex-row lg:items-center">
      <input
        v-model="search"
        type="search"
        placeholder="Buscar por nome ou telefone..."
        class="flex-1 rounded-xl border-0 bg-pnm-50/80 px-4 py-2.5 text-sm outline-none ring-1 ring-zinc-200/80 focus:ring-pnm-400"
      />
      <select
        v-model="filterProduct"
        class="rounded-xl border-0 bg-pnm-50/80 px-3 py-2.5 text-sm outline-none ring-1 ring-zinc-200/80"
      >
        <option value="all">Todos os produtos</option>
        <option v-for="(label, key) in PRODUCT_LABELS" :key="key" :value="key">{{ label }}</option>
      </select>
      <select
        v-model="filterStatus"
        class="rounded-xl border-0 bg-pnm-50/80 px-3 py-2.5 text-sm outline-none ring-1 ring-zinc-200/80"
      >
        <option value="all">Todos os status</option>
        <option v-for="(label, key) in STATUS_LABELS" :key="key" :value="key">{{ label }}</option>
      </select>
      <div class="flex rounded-xl bg-pnm-50/80 p-1 ring-1 ring-zinc-200/80">
        <button
          type="button"
          class="rounded-lg px-3 py-1.5 text-xs font-medium transition"
          :class="viewMode === 'kanban' ? 'bg-pnm-700 text-white' : 'text-zinc-600'"
          @click="viewMode = 'kanban'"
        >
          Kanban
        </button>
        <button
          type="button"
          class="rounded-lg px-3 py-1.5 text-xs font-medium transition"
          :class="viewMode === 'list' ? 'bg-pnm-700 text-white' : 'text-zinc-600'"
          @click="viewMode = 'list'"
        >
          Lista
        </button>
      </div>
    </div>

    <div v-if="viewMode === 'kanban'" class="flex gap-4 overflow-x-auto pb-2">
      <div v-for="status in columns" :key="status" class="w-72 shrink-0">
        <div class="mb-3 flex items-center justify-between px-1">
          <h3 class="text-sm font-medium text-pnm-800">{{ STATUS_LABELS[status] }}</h3>
          <span class="rounded-full bg-white px-2 py-0.5 font-mono text-xs text-zinc-500 shadow-sm">
            {{ leadsInColumn(status).length }}
          </span>
        </div>
        <div class="space-y-3">
          <button
            v-for="lead in leadsInColumn(status)"
            :key="lead.id"
            type="button"
            class="panel-card card-hover w-full p-4 text-left"
            @click="openLead(lead.id)"
          >
            <div class="flex items-start justify-between gap-2">
              <p class="text-sm font-medium text-pnm-900">{{ lead.name }}</p>
              <span
                v-if="lead.hotLead"
                class="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-amber-800"
              >
                Quente
              </span>
            </div>
            <p class="mt-1 text-xs text-pnm-600">{{ PRODUCT_LABELS[lead.product] }}</p>
            <p class="mt-2 text-xs text-zinc-400">{{ formatDateTime(lead.lastContact) }}</p>
            <div class="mt-3 flex items-center gap-2">
              <span
                class="rounded-full px-2 py-0.5 text-[10px] font-medium uppercase"
                :class="aiBadge[lead.aiStatus]"
              >
                IA {{ lead.aiStatus }}
              </span>
              <span v-if="lead.coldWindow" class="text-[10px] text-zinc-400">
                {{ lead.coldWindow }}d frio
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <div v-else class="panel-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[720px] text-left text-sm">
          <thead class="border-b border-zinc-100 bg-pnm-50/40 text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th class="px-5 py-3 font-medium">Lead</th>
              <th class="px-5 py-3 font-medium">Produto</th>
              <th class="px-5 py-3 font-medium">Status</th>
              <th class="px-5 py-3 font-medium">IA</th>
              <th class="px-5 py-3 font-medium">Último contato</th>
              <th class="px-5 py-3 font-medium">Score</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100">
            <tr
              v-for="lead in filteredLeads"
              :key="lead.id"
              class="cursor-pointer transition hover:bg-pnm-50/40"
              @click="openLead(lead.id)"
            >
              <td class="px-5 py-3">
                <span class="font-medium text-pnm-900">{{ lead.name }}</span>
                <span
                  v-if="lead.hotLead"
                  class="ml-2 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-amber-800"
                >
                  Quente
                </span>
              </td>
              <td class="px-5 py-3 text-zinc-600">{{ PRODUCT_LABELS[lead.product] }}</td>
              <td class="px-5 py-3">
                <span
                  class="rounded-full px-2 py-0.5 text-xs font-medium"
                  :class="STATUS_COLORS[lead.status]"
                >
                  {{ STATUS_LABELS[lead.status] }}
                </span>
              </td>
              <td class="px-5 py-3 text-xs capitalize text-zinc-600">{{ lead.aiStatus }}</td>
              <td class="px-5 py-3 text-xs text-zinc-500">{{ formatDateTime(lead.lastContact) }}</td>
              <td class="px-5 py-3 font-mono text-xs">{{ lead.score }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
