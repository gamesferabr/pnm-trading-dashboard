<script setup lang="ts">
import { computed } from 'vue'
import { mockCampaigns, marketingStats, formatDateTime } from '@/data/mockData'
import SectionHeader from '@/components/SectionHeader.vue'
import CardHeader from '@/components/CardHeader.vue'

const antiBlockRules = [
  { label: 'Delay entre mensagens', value: '8–25 seg (aleatório)' },
  { label: 'Limite por hora', value: `${marketingStats.hourlyLimit} mensagens` },
  { label: 'Limite diário por chip', value: `${marketingStats.dailyLimit} mensagens` },
  { label: 'Mensagens em balões', value: 'Sim · comportamento humano' },
  { label: 'Rotação de chips', value: '2 números cadastrados' },
]

const hourlyUsagePercent = computed(() =>
  Math.round((marketingStats.messagesThisHour / marketingStats.hourlyLimit) * 100),
)

const hourlyBarColor = computed(() => {
  if (hourlyUsagePercent.value >= 90) return 'bg-red-500'
  if (hourlyUsagePercent.value >= 70) return 'bg-amber-500'
  return 'bg-emerald-500'
})
</script>

<template>
  <div class="space-y-8">
    <SectionHeader title="Marketing" subtitle="Broadcast, segmentação e regras anti-bloqueio WhatsApp" />

    <div class="panel-card border-amber-200/60 bg-amber-50/80 px-5 py-4">
      <p class="text-sm font-medium text-amber-900">
        Módulo secundário — acessível no menu para apresentação v1
      </p>
      <p class="mt-1 text-xs text-amber-700">
        Funcionalidades completas na fase 2, após CRM e agente IA operacionais.
      </p>
    </div>

    <section class="space-y-4">
      <SectionHeader title="Resumo de campanhas" subtitle="Indicadores do módulo de marketing" />
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="panel-card p-5">
          <p class="text-sm text-zinc-500">Campanhas enviadas</p>
          <p class="mt-1 font-serif text-2xl font-semibold text-pnm-800">
            {{ marketingStats.campaignsSent }}
          </p>
        </div>
        <div class="panel-card p-5">
          <p class="text-sm text-zinc-500">Taxa média de resposta</p>
          <p class="mt-1 font-serif text-2xl font-semibold text-pnm-800">
            {{ marketingStats.avgResponseRate }}%
          </p>
        </div>
        <div class="panel-card p-5">
          <p class="text-sm text-zinc-500">Msgs enviadas (mês)</p>
          <p class="mt-1 font-serif text-2xl font-semibold text-pnm-800">
            {{ marketingStats.messagesThisMonth.toLocaleString('pt-BR') }}
          </p>
        </div>
        <div class="panel-card p-5">
          <p class="text-sm text-zinc-500">Agendadas</p>
          <p class="mt-1 font-serif text-2xl font-semibold text-pnm-800">
            {{ marketingStats.scheduled }}
          </p>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <SectionHeader title="Anti-bloqueio em tempo real" subtitle="Monitoramento obrigatório de cadência" />
      <div class="panel-card p-5">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="text-sm font-medium text-pnm-900">Mensagens nesta hora</p>
            <p class="mt-1 font-serif text-3xl font-semibold text-pnm-800">
              {{ marketingStats.messagesThisHour }}
              <span class="text-lg font-normal text-zinc-400">/ {{ marketingStats.hourlyLimit }}</span>
            </p>
          </div>
          <div class="text-right">
            <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Sistema ativo
            </span>
            <p class="mt-1 text-xs text-zinc-500">
              Hoje: {{ marketingStats.messagesToday }} / {{ marketingStats.dailyLimit }} msgs
            </p>
          </div>
        </div>
        <div class="mt-4 h-2 overflow-hidden rounded-full bg-zinc-100">
          <div
            class="h-full rounded-full transition-all"
            :class="hourlyBarColor"
            :style="{ width: `${hourlyUsagePercent}%` }"
          />
        </div>
        <p class="mt-2 text-xs text-zinc-500">
          {{ hourlyUsagePercent }}% do limite horário utilizado · delays aleatórios entre envios
        </p>
      </div>
    </section>

    <section class="space-y-4">
      <SectionHeader title="Disparos e configuração" subtitle="Broadcast, segmentação e e-mail marketing" />
      <div class="grid gap-6 lg:grid-cols-2">
        <div class="panel-card p-5">
          <CardHeader title="Novo broadcast" meta="segmentação + agendamento com anti-bloqueio" />

          <form class="mt-4 space-y-4" @submit.prevent>
            <div>
              <label class="mb-1 block text-xs font-medium text-zinc-600">Nome da campanha</label>
              <input
                type="text"
                placeholder="Ex: Convite Live Boi Gordo"
                class="w-full rounded-xl border-0 bg-pnm-50/80 px-3 py-2.5 text-sm outline-none ring-1 ring-zinc-200/80 focus:ring-pnm-400"
              />
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-zinc-600">Segmento</label>
              <select class="w-full rounded-xl border-0 bg-pnm-50/80 px-3 py-2.5 text-sm outline-none ring-1 ring-zinc-200/80">
                <option>Leads qualificados · Mercado Futuro</option>
                <option>Reaquecimento 30 dias</option>
                <option>Reaquecimento 60 dias</option>
                <option>Reaquecimento 90 dias · Base Fria</option>
                <option>Interessados GETI</option>
                <option>Grupo VIP @pnm.trading</option>
              </select>
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-zinc-600">Mensagem</label>
              <textarea
                rows="4"
                placeholder="Olá! A PNM Trading abre vagas para..."
                class="w-full rounded-xl border-0 bg-pnm-50/80 px-3 py-2.5 text-sm outline-none ring-1 ring-zinc-200/80 focus:ring-pnm-400"
              />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="mb-1 block text-xs font-medium text-zinc-600">Data</label>
                <input
                  type="date"
                  class="w-full rounded-xl border-0 bg-pnm-50/80 px-3 py-2.5 text-sm outline-none ring-1 ring-zinc-200/80"
                />
              </div>
              <div>
                <label class="mb-1 block text-xs font-medium text-zinc-600">Hora</label>
                <input
                  type="time"
                  class="w-full rounded-xl border-0 bg-pnm-50/80 px-3 py-2.5 text-sm outline-none ring-1 ring-zinc-200/80"
                />
              </div>
            </div>
            <button
              type="button"
              class="w-full rounded-xl bg-pnm-700 py-2.5 text-sm font-semibold text-white transition hover:bg-pnm-600"
            >
              Agendar broadcast
            </button>
          </form>
        </div>

        <div class="space-y-4">
          <div class="rounded-2xl border border-red-100 bg-red-50/50 p-5">
            <CardHeader title="Regras anti-bloqueio WhatsApp" meta="obrigatório — PNM já sofreu bloqueio" />
            <dl class="mt-4 space-y-3">
              <div
                v-for="rule in antiBlockRules"
                :key="rule.label"
                class="flex items-center justify-between rounded-lg bg-white/80 px-3 py-2 text-sm"
              >
                <dt class="text-zinc-600">{{ rule.label }}</dt>
                <dd class="font-mono text-xs font-medium text-pnm-800">{{ rule.value }}</dd>
              </div>
            </dl>
          </div>

          <div class="panel-card p-5">
            <CardHeader title="E-mail marketing" meta="templates básicos · base RD Station" />
            <button
              type="button"
              class="mt-4 w-full rounded-xl border border-dashed border-zinc-300 py-3 text-sm text-zinc-500 transition hover:border-pnm-400 hover:text-pnm-600"
            >
              + Criar template de e-mail
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <SectionHeader title="Histórico de campanhas" subtitle="Disparos enviados e agendados" />
      <div class="panel-card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[640px] text-left text-sm">
            <thead class="bg-pnm-50/60 text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th class="px-5 py-3 font-medium">Campanha</th>
                <th class="px-5 py-3 font-medium">Segmento</th>
                <th class="px-5 py-3 font-medium">Enviadas</th>
                <th class="px-5 py-3 font-medium">Abertura</th>
                <th class="px-5 py-3 font-medium">Resposta</th>
                <th class="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-100">
              <tr v-for="campaign in mockCampaigns" :key="campaign.id">
                <td class="px-5 py-3">
                  <p class="font-medium text-pnm-900">{{ campaign.name }}</p>
                  <p class="text-xs text-zinc-400">{{ formatDateTime(campaign.sentAt) }}</p>
                </td>
                <td class="px-5 py-3 text-xs text-zinc-600">{{ campaign.segment }}</td>
                <td class="px-5 py-3 font-mono text-xs">{{ campaign.messages }}</td>
                <td class="px-5 py-3 font-mono text-xs">
                  {{ campaign.openRate ? `${campaign.openRate}%` : '—' }}
                </td>
                <td class="px-5 py-3 font-mono text-xs">
                  {{ campaign.responseRate ? `${campaign.responseRate}%` : '—' }}
                </td>
                <td class="px-5 py-3">
                  <span
                    class="rounded-full px-2 py-0.5 text-xs font-medium capitalize"
                    :class="{
                      'bg-emerald-100 text-emerald-700': campaign.status === 'concluida',
                      'bg-sky-100 text-sky-700': campaign.status === 'agendada',
                      'bg-zinc-100 text-zinc-600': campaign.status === 'rascunho',
                    }"
                  >
                    {{ campaign.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>
