<script setup lang="ts">
import { ref } from 'vue'
import { PRODUCT_LABELS } from '@/data/mockData'
import SectionHeader from '@/components/SectionHeader.vue'
import type { ProductTrail } from '@/types'

const activeTab = ref<ProductTrail>('mercado_futuro')

const agentMetrics = {
  activeConversations: 23,
  avgResponse: '28s',
  handoffRate: '18,4%',
  messagesToday: 347,
  audioTranscriptions: 12,
}

const trails: ProductTrail[] = ['mentoria_grafica', 'texas_pnm', 'mercado_futuro', 'geti']

const promptPreview: Record<ProductTrail, string> = {
  mentoria_grafica:
    'Você é o agente da PNM Trading para pecuaristas interessados em aprender análise gráfica. Tom educacional, acessível. Pergunte sobre experiência com gráficos, tamanho do rebanho e objetivo (proteção ou especulação). Mencione que no PNM o produtor aprende a ler o mercado — do cocho à bolsa.',
  texas_pnm:
    'Você representa a Texas PNM — metodologia de confinamento e engorda intensiva da PNM. Foque em gestão de produção, conversão alimentar e resultados de campo. Qualifique: cabeças em confinamento, nutrição atual (Gustavo), metas de abate.',
  mercado_futuro:
    'Trilha técnica para traders de commodities agrícolas (boi gordo e milho). Linguagem de mercado: contratos, basis, CBOT, B3. Qualifique experiência em hedge, volume operado e acompanhamento das lives do Renan em tempo real.',
  geti:
    'Produto GETI — curso/programa específico da PNM (pnmagro.com.br/geti). Colete interesse, disponibilidade para turma, perfil do produtor. Informe que a próxima turma está prevista para jul/2026 e direcione para consultor humano quando qualificado.',
}

const faqs = [
  { q: 'Quanto custa a mentoria?', a: 'Valores variam conforme plano. Vou conectar você com nosso consultor.' },
  { q: 'Vocês operam milho também?', a: 'Sim! Mercado futuro de boi e milho — acompanhamos em tempo real.' },
  { q: 'O que é Texas PNM?', a: 'Nossa metodologia de confinamento intensivo para máxima eficiência na engorda.' },
]
</script>

<template>
  <div class="space-y-8">
    <SectionHeader title="Agente de IA" subtitle="Configuração, métricas e monitoramento do atendimento" />

    <section class="space-y-4">
      <SectionHeader title="Métricas do agente" subtitle="Desempenho em tempo real do atendimento por IA" />
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <div
        v-for="(value, label) in {
          'Conversas ativas': agentMetrics.activeConversations,
          'Tempo médio': agentMetrics.avgResponse,
          'Taxa handoff': agentMetrics.handoffRate,
          'Msgs hoje': agentMetrics.messagesToday,
          'Áudios transcritos': agentMetrics.audioTranscriptions,
        }"
        :key="label"
        class="panel-card p-4 shadow-sm"
      >
        <p class="text-xs text-zinc-500">{{ label }}</p>
        <p class="mt-1 font-mono text-xl font-semibold text-pnm-800">{{ value }}</p>
      </div>
      </div>
    </section>

    <section class="space-y-4">
      <SectionHeader title="Configuração e monitoramento" subtitle="Prompts por trilha, status e FAQs" />
      <div class="grid gap-6 lg:grid-cols-3">
      <!-- Editor de prompt -->
      <div class="panel-card p-5 shadow-sm lg:col-span-2">
        <h3 class="font-semibold text-pnm-900">Editor de prompt por trilha</h3>
        <p class="text-xs text-zinc-500">1 agente · 4 trilhas · roteador automático</p>

        <div class="mt-4 flex flex-wrap gap-2">
          <button
            v-for="trail in trails"
            :key="trail"
            type="button"
            class="rounded-lg px-3 py-1.5 text-xs font-medium transition"
            :class="
              activeTab === trail
                ? 'bg-pnm-700 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            "
            @click="activeTab = trail"
          >
            {{ PRODUCT_LABELS[trail] }}
          </button>
        </div>

        <textarea
          :value="promptPreview[activeTab]"
          rows="8"
          readonly
          class="mt-4 w-full rounded-xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-xs leading-relaxed text-zinc-700 outline-none"
        />

        <div class="mt-3 flex gap-2">
          <button
            type="button"
            class="rounded-xl bg-pnm-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-pnm-600"
          >
            Salvar prompt
          </button>
          <button
            type="button"
            class="rounded-xl border border-zinc-200 px-4 py-2 text-xs font-medium text-zinc-600 transition hover:bg-zinc-50"
          >
            Ver histórico de versões
          </button>
        </div>
      </div>

      <!-- Status e FAQs -->
      <div class="space-y-4">
        <div class="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
          <div class="flex items-center gap-2">
            <span class="relative flex h-3 w-3">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span class="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </span>
            <h3 class="font-semibold text-emerald-900">Agente online</h3>
          </div>
          <p class="mt-2 text-xs text-emerald-700">
            WhatsApp conectado · Resposta em &lt;30s · Suporte a áudio ativo
          </p>
          <dl class="mt-4 space-y-2 text-sm">
            <div class="flex justify-between">
              <dt class="text-emerald-700">Roteador</dt>
              <dd class="font-medium text-emerald-900">Ativo</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-emerald-700">Reaquecimento 30/60/90d</dt>
              <dd class="font-medium text-emerald-900">Ativo</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-emerald-700">Alerta lead quente</dt>
              <dd class="font-medium text-emerald-900">Ativo</dd>
            </div>
          </dl>
        </div>

        <div class="panel-card p-5 shadow-sm">
          <h3 class="font-semibold text-pnm-900">FAQs por produto</h3>
          <ul class="mt-3 space-y-3">
            <li
              v-for="faq in faqs"
              :key="faq.q"
              class="rounded-lg bg-zinc-50 p-3 text-xs"
            >
              <p class="font-medium text-pnm-900">{{ faq.q }}</p>
              <p class="mt-1 text-zinc-600">{{ faq.a }}</p>
            </li>
          </ul>
        </div>

        <div class="panel-card p-5 shadow-sm">
          <h3 class="font-semibold text-pnm-900">Blacklist de palavras</h3>
          <p class="mt-1 text-xs text-zinc-500">Pausa agente + alerta humano</p>
          <div class="mt-3 flex flex-wrap gap-2">
            <span
              v-for="word in ['golpe', 'processo', 'advogado', 'reclame aqui']"
              :key="word"
              class="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700"
            >
              {{ word }}
            </span>
          </div>
        </div>
      </div>
      </div>
    </section>

    <section class="space-y-4">
      <SectionHeader title="Fluxo do agente" subtitle="Jornada do lead do primeiro contato ao handoff" />
      <div class="panel-card p-5 shadow-sm">
        <div class="flex flex-wrap items-center gap-2 text-xs">
        <span class="rounded-lg bg-pnm-100 px-3 py-2 font-medium text-pnm-800">Lead entra (WhatsApp/Form)</span>
        <span class="text-zinc-400">→</span>
        <span class="rounded-lg bg-sky-100 px-3 py-2 font-medium text-sky-800">Saudação &lt;30s</span>
        <span class="text-zinc-400">→</span>
        <span class="rounded-lg bg-amber-100 px-3 py-2 font-medium text-amber-800">Roteador identifica trilha</span>
        <span class="text-zinc-400">→</span>
        <span class="rounded-lg bg-violet-100 px-3 py-2 font-medium text-violet-800">Qualificação estruturada</span>
        <span class="text-zinc-400">→</span>
        <span class="rounded-lg bg-emerald-100 px-3 py-2 font-medium text-emerald-800">Handoff para Cinthia</span>
        </div>
      </div>
    </section>
  </div>
</template>
