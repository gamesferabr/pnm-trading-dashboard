<script setup lang="ts">
import { mockCampaigns, formatDateTime } from '@/data/mockData'
import SectionHeader from '@/components/SectionHeader.vue'

const antiBlockRules = [
  { label: 'Delay entre mensagens', value: '8–25 seg (aleatório)' },
  { label: 'Limite diário por chip', value: '200 mensagens' },
  { label: 'Mensagens em balões', value: 'Sim · comportamento humano' },
  { label: 'Rotação de chips', value: '2 números cadastrados' },
]
</script>

<template>
  <div class="space-y-8">
    <SectionHeader title="Broadcasts" subtitle="Campanhas, disparos e regras anti-bloqueio" />

    <div class="rounded-2xl border border-amber-200/60 bg-amber-50/80 p-4">
      <p class="text-sm font-medium text-amber-900">
        Módulo em desenvolvimento — estrutura visual para apresentação v1
      </p>
      <p class="mt-1 text-xs text-amber-700">
        Conforme briefing: acessível no menu, funcionalidades completas na fase 2.
      </p>
    </div>

    <section class="space-y-4">
      <SectionHeader title="Resumo de campanhas" subtitle="Indicadores do módulo de marketing" />
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
        <p class="text-sm text-zinc-500">Campanhas enviadas</p>
        <p class="mt-1 font-mono text-2xl font-semibold text-pnm-800">12</p>
      </div>
      <div class="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
        <p class="text-sm text-zinc-500">Taxa média de resposta</p>
        <p class="mt-1 font-mono text-2xl font-semibold text-pnm-800">28,4%</p>
      </div>
      <div class="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
        <p class="text-sm text-zinc-500">Msgs enviadas (mês)</p>
        <p class="mt-1 font-mono text-2xl font-semibold text-pnm-800">1.847</p>
      </div>
      <div class="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
        <p class="text-sm text-zinc-500">Agendadas</p>
        <p class="mt-1 font-mono text-2xl font-semibold text-pnm-800">2</p>
      </div>
      </div>
    </section>

    <section class="space-y-4">
      <SectionHeader title="Disparos e configuração" subtitle="Broadcast, anti-bloqueio e e-mail marketing" />
      <div class="grid gap-6 lg:grid-cols-2">
      <!-- Nova campanha -->
      <div class="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
        <h3 class="font-semibold text-pnm-900">Novo broadcast</h3>
        <p class="text-xs text-zinc-500">Segmentação + agendamento com anti-bloqueio</p>

        <form class="mt-4 space-y-4" @submit.prevent>
          <div>
            <label class="mb-1 block text-xs font-medium text-zinc-600">Nome da campanha</label>
            <input
              type="text"
              placeholder="Ex: Convite Live Boi Gordo"
              class="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none focus:border-pnm-500"
            />
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-zinc-600">Segmento</label>
            <select class="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none">
              <option>Leads qualificados · Mercado Futuro</option>
              <option>Reaquecimento 30 dias</option>
              <option>Interessados GETI</option>
              <option>Grupo VIP @pnm.trading</option>
            </select>
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-zinc-600">Mensagem</label>
            <textarea
              rows="4"
              placeholder="Olá! A PNM Trading abre vagas para..."
              class="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none focus:border-pnm-500"
            />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="mb-1 block text-xs font-medium text-zinc-600">Data</label>
              <input
                type="date"
                class="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none"
              />
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-zinc-600">Hora</label>
              <input
                type="time"
                class="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none"
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

      <!-- Anti-bloqueio -->
      <div class="space-y-4">
        <div class="rounded-2xl border border-red-100 bg-red-50/50 p-5">
          <h3 class="font-semibold text-red-900">Regras anti-bloqueio WhatsApp</h3>
          <p class="mt-1 text-xs text-red-700">
            A PNM já sofreu bloqueio por disparo inadequado — regras obrigatórias no sistema.
          </p>
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

        <div class="panel-card p-5 shadow-sm">
          <h3 class="font-semibold text-pnm-900">Email marketing</h3>
          <p class="text-xs text-zinc-500">Template básico · segmentação da base RD Station</p>
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
      <SectionHeader title="Histórico de campanhas" subtitle="Campanhas enviadas e agendadas" />
      <div class="panel-card overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[640px] text-left text-sm">
            <thead class="bg-zinc-50 text-xs uppercase text-zinc-500">
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
                    class="rounded-full px-2 py-0.5 text-xs font-medium"
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
