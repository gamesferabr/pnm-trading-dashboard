<script setup lang="ts">
import { PRODUCT_LABELS, PRODUCT_INFO } from '@/data/mockData'
import SectionHeader from '@/components/SectionHeader.vue'
import CardHeader from '@/components/CardHeader.vue'

const agentMetrics = {
  activeConversations: 23,
  avgResponse: '28s',
  handoffRate: '18,4%',
  messagesToday: 347,
  audioTranscriptions: 12,
}

const faqs = [
  { q: 'Quanto custa a mentoria?', a: 'Valores variam conforme plano. Vou conectar você com nosso consultor.' },
  { q: 'Vocês operam milho também?', a: 'Sim! Mercado futuro de boi e milho — acompanhamos em tempo real.' },
  { q: 'O que é Texas PNM?', a: 'Nossa metodologia de confinamento intensivo para máxima eficiência na engorda.' },
]

const agentFlow = [
  { step: 1, title: 'Contato inicial', desc: 'Lead preenche formulário ou envia mensagem no WhatsApp' },
  { step: 2, title: 'Resposta rápida', desc: 'Agente responde em até 30s com saudação e pergunta aberta' },
  { step: 3, title: 'Roteamento', desc: 'Roteador analisa resposta e aplica contexto da trilha (1 de 4 produtos)' },
  { step: 4, title: 'Qualificação', desc: 'Coleta: nome, dor, experiência, rebanho, disponibilidade e budget' },
  { step: 5, title: 'Sync CRM', desc: 'Dados gravados em tempo real no perfil do lead, campo a campo' },
  { step: 6, title: 'Handoff', desc: 'Lead qualificado → notificação à Cinthia → coluna Handoff' },
  { step: 7, title: 'Modo escuta', desc: 'Cinthia assume; agente pausa respostas automáticas' },
]

const capabilities = [
  { name: 'Suporte a áudio', priority: 'ALTA', desc: 'Transcrição Whisper/Groq — crítico para produtores rurais' },
  { name: 'Reaquecimento 30/60/90d', priority: 'ALTA', desc: 'Mensagens automáticas para leads sem interação' },
  { name: 'Alerta lead quente', priority: 'ALTA', desc: 'Detecta preço, link de pagamento ou data específica' },
  { name: 'Log no CRM', priority: 'ALTA', desc: 'Toda mensagem salva na timeline com timestamp' },
  { name: 'Anti-delay humanizado', priority: 'MÉDIA', desc: 'Mensagens em balões com delay simulado' },
  { name: 'Identificação de idioma', priority: 'BAIXA', desc: 'Responde no idioma do lead (ex.: espanhol)' },
]

const priorityClass: Record<string, string> = {
  ALTA: 'text-red-600',
  MÉDIA: 'text-amber-700',
  BAIXA: 'text-emerald-600',
}
</script>

<template>
  <div class="space-y-8">
    <SectionHeader
      title="Agente de IA"
      subtitle="1 agente · 1 WhatsApp · 4 trilhas · monitoramento em tempo real"
    />

    <div class="panel-card px-5 py-3">
      <p class="text-sm text-zinc-600">
        Arquitetura: um único agente com roteador dinâmico entre as 4 trilhas PNM.
        O lead não percebe a troca — o bloco de contexto muda conforme o produto identificado.
      </p>
    </div>

    <section class="space-y-4">
      <SectionHeader title="Métricas do agente" subtitle="Conversas, tempo de resposta, handoff e volume" />
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
          class="panel-card p-4"
        >
          <p class="text-xs text-zinc-500">{{ label }}</p>
          <p class="mt-1 font-serif text-xl font-semibold text-pnm-800">{{ value }}</p>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <SectionHeader title="Os 4 produtos PNM" subtitle="Trilhas do agente e público-alvo" />
      <div class="panel-card overflow-hidden">
        <table class="w-full text-left text-sm">
          <thead class="bg-pnm-800 text-xs uppercase tracking-wide text-white">
            <tr>
              <th class="px-5 py-3 font-medium">Produto / Trilha</th>
              <th class="px-5 py-3 font-medium">Público-alvo e foco da conversa</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100">
            <tr v-for="product in PRODUCT_INFO" :key="product.trail">
              <td class="px-5 py-3 font-medium text-pnm-900">
                {{ PRODUCT_LABELS[product.trail] }}
              </td>
              <td class="px-5 py-3 text-zinc-600">{{ product.audience }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="space-y-4">
      <SectionHeader title="Configuração e monitoramento" subtitle="Status, FAQs e blacklist" />
      <div class="grid gap-6 lg:grid-cols-3">
        <div class="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
          <div class="flex items-center gap-2">
            <span class="relative flex h-3 w-3">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span class="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </span>
            <h3 class="font-semibold text-emerald-900">Agente online</h3>
          </div>
          <p class="mt-2 text-xs text-emerald-700">
            WhatsApp conectado · Resposta &lt;30s · Suporte a áudio ativo
          </p>
          <dl class="mt-4 space-y-2 text-sm">
            <div class="flex justify-between">
              <dt class="text-emerald-700">Roteador de produto</dt>
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
            <div class="flex justify-between">
              <dt class="text-emerald-700">Modo pausa manual</dt>
              <dd class="font-medium text-emerald-900">Ativo</dd>
            </div>
          </dl>
        </div>

        <div class="panel-card p-5">
          <CardHeader title="FAQs por produto" meta="treinamento de perguntas frequentes" />
          <ul class="mt-3 space-y-3">
            <li v-for="faq in faqs" :key="faq.q" class="rounded-lg bg-pnm-50/60 p-3 text-xs">
              <p class="font-medium text-pnm-900">{{ faq.q }}</p>
              <p class="mt-1 text-zinc-600">{{ faq.a }}</p>
            </li>
          </ul>
        </div>

        <div class="panel-card p-5">
          <CardHeader title="Blacklist de palavras" meta="pausa agente + alerta humano" />
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
    </section>

    <section class="space-y-4">
      <SectionHeader title="Capacidades técnicas" subtitle="Funcionalidades do agente por prioridade" />
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="cap in capabilities"
          :key="cap.name"
          class="panel-card p-4"
        >
          <div class="flex items-center justify-between gap-2">
            <p class="text-sm font-medium text-pnm-900">{{ cap.name }}</p>
            <span class="text-[10px] font-bold" :class="priorityClass[cap.priority]">
              {{ cap.priority }}
            </span>
          </div>
          <p class="mt-1 text-xs text-zinc-500">{{ cap.desc }}</p>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <SectionHeader title="Fluxo completo do agente" subtitle="Jornada do lead em 7 passos" />
      <div class="panel-card p-5">
        <ol class="space-y-4">
          <li
            v-for="item in agentFlow"
            :key="item.step"
            class="flex gap-4"
          >
            <span
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pnm-700 font-mono text-sm font-semibold text-white"
            >
              {{ item.step }}
            </span>
            <div>
              <p class="font-medium text-pnm-900">{{ item.title }}</p>
              <p class="text-sm text-zinc-500">{{ item.desc }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  </div>
</template>
