<script setup lang="ts">
import SectionHeader from '@/components/SectionHeader.vue'
import CardHeader from '@/components/CardHeader.vue'
import { agentLiveStatus } from '@/data/mockData'

const integrations = [
  {
    name: 'WhatsApp Business',
    status: 'Conectado',
    detail: 'Número principal · agente IA ativo · resposta < 30s',
    ok: true,
  },
  {
    name: 'RD Station',
    status: 'Sincronizado',
    detail: '~500 contatos importados · reaquecimento 30/60/90d',
    ok: true,
  },
  {
    name: 'Instagram @pnm.trading',
    status: 'Conectado',
    detail: 'Leads via DM e stories · roteamento automático',
    ok: true,
  },
  {
    name: 'Whisper / Groq',
    status: 'Ativo',
    detail: 'Transcrição de áudios — crítico para produtores rurais',
    ok: true,
  },
  {
    name: 'Formulário Site PNM',
    status: 'Ativo',
    detail: 'pnmagro.com.br · leads entram direto no CRM',
    ok: true,
  },
  {
    name: 'Chip secundário WhatsApp',
    status: 'Standby',
    detail: 'Rotação anti-bloqueio · 2 números cadastrados',
    ok: false,
  },
]
</script>

<template>
  <div class="space-y-6">
    <SectionHeader title="Integrações" subtitle="Canais conectados ao CRM e agente IA" />

    <div class="panel-card flex flex-wrap items-center gap-4 px-5 py-4">
      <span class="relative flex h-2.5 w-2.5">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </span>
      <p class="text-sm text-zinc-600">
        Roteador de trilhas:
        <span class="font-medium text-emerald-700">
          {{ agentLiveStatus.routerActive ? 'Ativo' : 'Inativo' }}
        </span>
        · WhatsApp:
        <span class="font-medium text-emerald-700">
          {{ agentLiveStatus.whatsappConnected ? 'Online' : 'Offline' }}
        </span>
      </p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="item in integrations" :key="item.name" class="panel-card p-5">
        <div class="flex items-start justify-between gap-2">
          <CardHeader :title="item.name" />
          <span
            class="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase"
            :class="item.ok ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'"
          >
            {{ item.status }}
          </span>
        </div>
        <p class="mt-2 text-xs text-zinc-500">{{ item.detail }}</p>
      </div>
    </div>
  </div>
</template>
