<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import SectionHeader from '@/components/SectionHeader.vue'
import {
  mockLeads,
  PRODUCT_LABELS,
  STATUS_LABELS,
  STATUS_COLORS,
  formatDateTime,
} from '@/data/mockData'
import type { LeadStatus, ProductTrail } from '@/types'

const router = useRouter()
const search = ref('')
const filterStatus = ref<LeadStatus | 'all'>('all')
const filterProduct = ref<ProductTrail | 'all'>('all')

const filtered = computed(() =>
  mockLeads.filter((lead) => {
    const matchSearch =
      !search.value ||
      lead.name.toLowerCase().includes(search.value.toLowerCase()) ||
      lead.phone.includes(search.value)
    const matchStatus = filterStatus.value === 'all' || lead.status === filterStatus.value
    const matchProduct = filterProduct.value === 'all' || lead.product === filterProduct.value
    return matchSearch && matchStatus && matchProduct
  }),
)

function openLead(id: string): void {
  router.push({ name: 'lead', params: { id } })
}
</script>

<template>
  <div class="space-y-6">
    <SectionHeader title="Leads" subtitle="Base completa · busca e filtros" />

    <div class="panel-card flex flex-col gap-3 p-4 lg:flex-row lg:items-center">
      <input
        v-model="search"
        type="search"
        placeholder="Buscar por nome ou telefone..."
        class="min-w-[200px] flex-1 rounded-xl border-0 bg-pnm-50/80 px-4 py-2.5 text-sm outline-none ring-1 ring-zinc-200/80 focus:ring-pnm-400"
      />
      <select
        v-model="filterStatus"
        class="rounded-xl border-0 bg-pnm-50/80 px-3 py-2.5 text-sm outline-none ring-1 ring-zinc-200/80"
      >
        <option value="all">Todos os status</option>
        <option v-for="(label, key) in STATUS_LABELS" :key="key" :value="key">{{ label }}</option>
      </select>
      <select
        v-model="filterProduct"
        class="rounded-xl border-0 bg-pnm-50/80 px-3 py-2.5 text-sm outline-none ring-1 ring-zinc-200/80"
      >
        <option value="all">Todos os produtos</option>
        <option v-for="(label, key) in PRODUCT_LABELS" :key="key" :value="key">{{ label }}</option>
      </select>
      <span class="text-xs text-zinc-500">{{ filtered.length }} leads</span>
    </div>

    <div class="panel-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[900px] text-left text-sm">
          <thead class="bg-pnm-50/40 text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th class="px-5 py-3 font-medium">Lead</th>
              <th class="px-5 py-3 font-medium">Telefone</th>
              <th class="px-5 py-3 font-medium">Produto</th>
              <th class="px-5 py-3 font-medium">Status</th>
              <th class="px-5 py-3 font-medium">Origem</th>
              <th class="px-5 py-3 font-medium">Último contato</th>
              <th class="px-5 py-3 font-medium">Score</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100">
            <tr
              v-for="lead in filtered"
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
              <td class="px-5 py-3 text-zinc-600">{{ lead.phone }}</td>
              <td class="px-5 py-3 text-xs text-zinc-600">{{ PRODUCT_LABELS[lead.product] }}</td>
              <td class="px-5 py-3">
                <span class="rounded-full px-2 py-0.5 text-xs font-medium" :class="STATUS_COLORS[lead.status]">
                  {{ STATUS_LABELS[lead.status] }}
                </span>
              </td>
              <td class="px-5 py-3 text-xs capitalize text-zinc-500">{{ lead.origin.replace('_', ' ') }}</td>
              <td class="px-5 py-3 text-xs text-zinc-500">{{ formatDateTime(lead.lastContact) }}</td>
              <td class="px-5 py-3 font-mono text-xs">{{ lead.score }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
