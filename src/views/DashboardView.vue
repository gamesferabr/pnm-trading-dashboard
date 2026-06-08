<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Line, Doughnut, Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  ArcElement,
  Legend,
} from 'chart.js'
import KpiCard from '@/components/KpiCard.vue'
import CardHeader from '@/components/CardHeader.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import NavIcon from '@/components/NavIcon.vue'
import {
  dashboardStats,
  leadsByStatus,
  leadsByOrigin,
  hotLeads,
  recentActivity,
  leadsTrend,
  getLeadsByColdWindow,
  funnelConversion,
  weeklySummary,
  pendingHandoffs,
  partnerWorkload,
  productPerformance,
  agentLiveStatus,
  STATUS_LABELS,
  PRODUCT_LABELS,
  ORIGIN_LABELS,
  formatRelativeTime,
  formatDate,
} from '@/data/mockData'
import type { LeadStatus } from '@/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  ArcElement,
  Legend,
)

const router = useRouter()
const reactivationTab = ref<30 | 60 | 90>(30)

const totalStatus = computed(() =>
  Object.values(leadsByStatus).reduce((sum, n) => sum + n, 0),
)

const todayLabel = new Date().toLocaleDateString('pt-BR', {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
})

const areaChartData = computed(() => ({
  labels: leadsTrend.labels,
  datasets: [
    {
      label: 'Novos leads',
      data: leadsTrend.data,
      borderColor: '#1e4a38',
      backgroundColor: 'rgba(45, 122, 90, 0.12)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 4,
    },
  ],
}))

const originChartData = computed(() => ({
  labels: Object.keys(leadsByOrigin).map((k) => {
    const label = ORIGIN_LABELS[k] ?? k
    return label.length > 18 ? `${label.slice(0, 16)}…` : label
  }),
  datasets: [
    {
      data: Object.values(leadsByOrigin),
      backgroundColor: ['#1e4a38', '#256349', '#2d7a5a', '#3d9970', '#5cb88a'],
      borderWidth: 0,
    },
  ],
}))

const funnelBarData = computed(() => ({
  labels: funnelConversion.map((s) => `${s.from} → ${s.to}`),
  datasets: [
    {
      label: 'Taxa de conversão (%)',
      data: funnelConversion.map((s) => s.rate),
      backgroundColor: ['#1e4a38', '#256349', '#2d7a5a', '#3d9970'],
      borderRadius: 6,
      barThickness: 18,
    },
  ],
}))

const chartBaseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0f2219',
      titleFont: { family: 'DM Sans' },
      bodyFont: { family: 'DM Sans' },
      padding: 10,
      cornerRadius: 8,
    },
  },
}

const areaChartOptions = {
  ...chartBaseOptions,
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#a1a1aa', font: { size: 11, family: 'DM Sans' } },
      border: { display: false },
    },
    y: {
      grid: { color: 'rgba(0,0,0,0.04)' },
      ticks: { color: '#a1a1aa', font: { size: 11, family: 'DM Sans' }, stepSize: 2 },
      border: { display: false },
      beginAtZero: true,
    },
  },
}

const doughnutOptions = {
  ...chartBaseOptions,
  plugins: {
    ...chartBaseOptions.plugins,
    legend: {
      display: true,
      position: 'bottom' as const,
      labels: { boxWidth: 8, padding: 10, font: { size: 9, family: 'DM Sans' } },
    },
  },
}

const funnelBarOptions = {
  ...chartBaseOptions,
  indexAxis: 'y' as const,
  scales: {
    x: {
      max: 100,
      grid: { color: 'rgba(0,0,0,0.04)' },
      ticks: { color: '#a1a1aa', font: { size: 10 }, callback: (v: number | string) => `${v}%` },
      border: { display: false },
    },
    y: {
      grid: { display: false },
      ticks: { color: '#71717a', font: { size: 10, family: 'DM Sans' } },
      border: { display: false },
    },
  },
}

const activityMeta: Record<string, { title: string; icon: string }> = {
  conversa: { title: 'Mensagem recebida', icon: 'message' },
  handoff: { title: 'Handoff solicitado', icon: 'bot' },
  qualificado: { title: 'Lead qualificado', icon: 'users' },
  fechado: { title: 'Venda confirmada', icon: 'trend' },
  reaquecimento: { title: 'Reaquecimento enviado', icon: 'megaphone' },
}

const reactivationLeads = computed(() => getLeadsByColdWindow(reactivationTab.value))

const reactivationCounts = {
  30: dashboardStats.reactivation30,
  60: dashboardStats.reactivation60,
  90: dashboardStats.reactivation90,
}

function statusPercent(count: number): string {
  return ((count / totalStatus.value) * 100).toFixed(1)
}

function openLead(id: string): void {
  router.push({ name: 'lead', params: { id } })
}
</script>

<template>
  <div class="space-y-10">
    <SectionHeader
      title="Painel"
      :subtitle="`Visão geral do CRM · ${todayLabel}`"
    />

    <!-- Contexto operacional -->
    <div class="panel-card flex flex-wrap items-center justify-between gap-4 px-5 py-4">
      <div>
        <p class="text-sm font-medium text-pnm-900">PNM Trading · CRM + Atendimento IA</p>
        <p class="mt-0.5 text-xs text-zinc-500">
          Base de {{ dashboardStats.totalLeads }} leads
          ({{ dashboardStats.rdStationBase }} contatos RD Station em reativação)
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
          Agente IA online
        </span>
        <span class="rounded-full bg-pnm-100 px-3 py-1 text-xs font-medium text-pnm-800">
          {{ dashboardStats.activeConversations }} conversas ativas
        </span>
        <span class="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-800">
          {{ dashboardStats.pendingHandoffs }} handoffs pendentes
        </span>
      </div>
    </div>

    <!-- Visão geral — KPIs -->
    <section>
      <p class="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">Visão geral</p>
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <KpiCard
          label="Total de leads"
          :value="dashboardStats.totalLeads"
          :hint="`+${dashboardStats.leadsVariation}% vs mês anterior`"
        >
          <template #icon><NavIcon name="users" /></template>
        </KpiCard>
        <KpiCard
          label="Novos hoje"
          :value="dashboardStats.newLeadsToday"
          hint="Entradas WhatsApp + Instagram"
        >
          <template #icon><NavIcon name="grid" /></template>
        </KpiCard>
        <KpiCard
          label="Tempo médio resposta"
          :value="dashboardStats.avgResponseTime"
          hint="Meta agente IA &lt; 30s"
        >
          <template #icon><NavIcon name="message" /></template>
        </KpiCard>
        <KpiCard
          label="Taxa qualificação"
          :value="`${dashboardStats.qualificationRate}%`"
          :hint="`${dashboardStats.qualifiedToday} qualificados hoje`"
        >
          <template #icon><NavIcon name="trend" /></template>
        </KpiCard>
        <KpiCard
          label="Vendas no mês"
          :value="dashboardStats.salesThisMonth"
          :hint="`+${dashboardStats.salesVariation}% vs abril`"
        >
          <template #icon><NavIcon name="calendar" /></template>
        </KpiCard>
        <KpiCard
          label="Msgs IA hoje"
          :value="dashboardStats.messagesToday"
          :hint="`${dashboardStats.audioToday} áudios transcritos`"
        >
          <template #icon><NavIcon name="bot" /></template>
        </KpiCard>
      </div>
    </section>

    <!-- Operação do dia -->
    <section>
      <p class="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">Operação do dia</p>
      <div class="grid gap-5 lg:grid-cols-12">
        <div class="panel-card p-6 lg:col-span-5">
          <CardHeader title="Novos leads" meta="últimos 30 dias" />
          <div class="h-52">
            <Line :data="areaChartData" :options="areaChartOptions" />
          </div>
          <div class="mt-4 grid grid-cols-3 gap-2 border-t border-zinc-100 pt-4">
            <div class="text-center">
              <p class="font-serif text-lg font-semibold text-pnm-800">{{ weeklySummary.newLeads }}</p>
              <p class="text-[10px] text-zinc-500">Esta semana</p>
            </div>
            <div class="text-center">
              <p class="font-serif text-lg font-semibold text-pnm-800">{{ weeklySummary.qualified }}</p>
              <p class="text-[10px] text-zinc-500">Qualificados</p>
            </div>
            <div class="text-center">
              <p class="font-serif text-lg font-semibold text-pnm-800">{{ weeklySummary.closed }}</p>
              <p class="text-[10px] text-zinc-500">Fechados</p>
            </div>
          </div>
        </div>

        <div class="panel-card p-6 lg:col-span-4">
          <CardHeader title="Agente IA · status" meta="monitoramento em tempo real" />
          <div class="mt-2 flex items-center gap-2">
            <span class="relative flex h-2.5 w-2.5">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span class="text-sm font-medium text-emerald-800">WhatsApp conectado</span>
          </div>
          <dl class="mt-4 space-y-2.5 text-sm">
            <div class="flex justify-between rounded-lg bg-pnm-50/60 px-3 py-2">
              <dt class="text-zinc-600">Conversas ativas</dt>
              <dd class="font-mono font-medium text-pnm-900">{{ dashboardStats.activeConversations }}</dd>
            </div>
            <div class="flex justify-between rounded-lg bg-pnm-50/60 px-3 py-2">
              <dt class="text-zinc-600">Handoffs hoje</dt>
              <dd class="font-mono font-medium text-pnm-900">{{ dashboardStats.handoffsToday }}</dd>
            </div>
            <div class="flex justify-between rounded-lg bg-pnm-50/60 px-3 py-2">
              <dt class="text-zinc-600">Msgs / hora</dt>
              <dd class="font-mono font-medium text-pnm-900">{{ agentLiveStatus.messagesPerHour }}</dd>
            </div>
            <div class="flex justify-between rounded-lg bg-pnm-50/60 px-3 py-2">
              <dt class="text-zinc-600">Roteador 4 trilhas</dt>
              <dd class="font-medium text-emerald-700">Ativo</dd>
            </div>
            <div class="flex justify-between rounded-lg bg-pnm-50/60 px-3 py-2">
              <dt class="text-zinc-600">Reaquecimento 30/60/90</dt>
              <dd class="font-medium text-emerald-700">Ativo</dd>
            </div>
          </dl>
        </div>

        <div class="panel-card p-6 lg:col-span-3">
          <CardHeader title="Resumo semanal" meta="funil consolidado" />
          <ul class="mt-2 space-y-2">
            <li
              v-for="item in [
                { label: 'Novos leads', value: weeklySummary.newLeads, color: 'bg-sky-500' },
                { label: 'Qualificados', value: weeklySummary.qualified, color: 'bg-emerald-500' },
                { label: 'Handoffs', value: weeklySummary.handoffs, color: 'bg-violet-500' },
                { label: 'Fechados', value: weeklySummary.closed, color: 'bg-pnm-600' },
                { label: 'Perdidos', value: weeklySummary.lost, color: 'bg-zinc-400' },
                { label: 'Reativados RD', value: weeklySummary.reactivated, color: 'bg-amber-500' },
              ]"
              :key="item.label"
              class="flex items-center justify-between text-sm"
            >
              <span class="flex items-center gap-2 text-zinc-600">
                <span class="h-2 w-2 rounded-full" :class="item.color" />
                {{ item.label }}
              </span>
              <span class="font-mono font-medium text-pnm-900">{{ item.value }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Funil e produtos -->
    <section>
      <p class="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">Funil e produtos</p>
      <div class="grid gap-5 lg:grid-cols-12">
        <div class="panel-card p-6 lg:col-span-5">
          <CardHeader title="Leads por status" meta="6 etapas do funil" />
          <div class="space-y-3">
            <div
              v-for="(count, status) in leadsByStatus"
              :key="status"
              class="group"
            >
              <div class="mb-1 flex items-center justify-between text-xs">
                <span class="font-medium text-zinc-700">
                  {{ STATUS_LABELS[status as LeadStatus] }}
                </span>
                <span class="text-zinc-400">
                  {{ count }} · {{ statusPercent(count) }}%
                </span>
              </div>
              <div class="h-2 overflow-hidden rounded-full bg-zinc-100">
                <div
                  class="h-full rounded-full bg-pnm-600 transition-all group-hover:bg-pnm-500"
                  :style="{ width: `${statusPercent(count)}%` }"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="panel-card p-6 lg:col-span-4">
          <CardHeader title="Conversão do funil" meta="taxa entre etapas · mês atual" />
          <div class="h-52">
            <Bar :data="funnelBarData" :options="funnelBarOptions" />
          </div>
        </div>

        <div class="panel-card p-6 lg:col-span-3">
          <CardHeader title="Leads por origem" meta="canais de entrada" />
          <div class="h-52">
            <Doughnut :data="originChartData" :options="doughnutOptions" />
          </div>
        </div>
      </div>

      <div class="panel-card mt-5 overflow-hidden">
        <div class="border-b border-zinc-100 px-6 py-4">
          <CardHeader title="Performance por trilha" meta="4 produtos PNM · leads, qualificados e fechados" />
        </div>
        <div class="overflow-x-auto">
          <table class="w-full min-w-[640px] text-left text-sm">
            <thead class="bg-pnm-50/40 text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th class="px-6 py-3 font-medium">Produto / Trilha</th>
                <th class="px-6 py-3 font-medium">Leads</th>
                <th class="px-6 py-3 font-medium">Qualificados</th>
                <th class="px-6 py-3 font-medium">Fechados</th>
                <th class="px-6 py-3 font-medium">Conv. fechamento</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-100">
              <tr v-for="row in productPerformance" :key="row.trail">
                <td class="px-6 py-3 font-medium text-pnm-900">{{ PRODUCT_LABELS[row.trail] }}</td>
                <td class="px-6 py-3 font-mono text-zinc-600">{{ row.leads }}</td>
                <td class="px-6 py-3 font-mono text-zinc-600">{{ row.qualified }}</td>
                <td class="px-6 py-3 font-mono text-zinc-600">{{ row.closed }}</td>
                <td class="px-6 py-3">
                  <div class="flex items-center gap-2">
                    <div class="h-1.5 w-20 overflow-hidden rounded-full bg-zinc-100">
                      <div
                        class="h-full rounded-full bg-pnm-600"
                        :style="{ width: `${row.rate}%` }"
                      />
                    </div>
                    <span class="font-mono text-xs text-zinc-500">{{ row.rate }}%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Prioridades -->
    <section>
      <p class="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">Prioridades do dia</p>
      <div class="grid gap-5 lg:grid-cols-2">
        <div class="panel-card p-6">
          <CardHeader title="Alertas — lead quente" meta="intenção forte · preço, link ou data" />
          <div class="space-y-3">
            <button
              v-for="lead in hotLeads"
              :key="lead.id"
              type="button"
              class="flex w-full items-start justify-between gap-3 rounded-xl bg-amber-50/70 px-4 py-3 text-left ring-1 ring-amber-100 transition hover:bg-amber-50"
              @click="openLead(lead.id)"
            >
              <div>
                <p class="text-sm font-medium text-pnm-900">{{ lead.name }}</p>
                <p class="mt-0.5 text-xs text-pnm-600">{{ PRODUCT_LABELS[lead.product] }}</p>
                <p class="mt-1 text-xs text-zinc-500">{{ lead.reason }}</p>
              </div>
              <span class="shrink-0 rounded-full bg-amber-200/80 px-2 py-0.5 text-[10px] font-semibold uppercase text-amber-900">
                {{ lead.time }}
              </span>
            </button>
          </div>
        </div>

        <div class="panel-card overflow-hidden">
          <div class="border-b border-zinc-100 px-6 py-4">
            <CardHeader title="Handoffs pendentes" meta="aguardando Cinthia ou sócios" />
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-pnm-50/40 text-xs uppercase text-zinc-500">
                <tr>
                  <th class="px-5 py-2.5 font-medium">Lead</th>
                  <th class="px-5 py-2.5 font-medium">Trilha</th>
                  <th class="px-5 py-2.5 font-medium">Rebanho</th>
                  <th class="px-5 py-2.5 font-medium">Score</th>
                  <th class="px-5 py-2.5 font-medium">Espera</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-zinc-100">
                <tr
                  v-for="lead in pendingHandoffs"
                  :key="lead.id"
                  class="cursor-pointer transition hover:bg-pnm-50/40"
                  @click="openLead(lead.id)"
                >
                  <td class="px-5 py-3 font-medium text-pnm-900">{{ lead.name }}</td>
                  <td class="px-5 py-3 text-xs text-zinc-600">{{ PRODUCT_LABELS[lead.product] }}</td>
                  <td class="px-5 py-3 text-xs text-zinc-500">{{ lead.herdSize }}</td>
                  <td class="px-5 py-3 font-mono text-xs">{{ lead.score }}%</td>
                  <td class="px-5 py-3 text-xs font-medium text-violet-700">{{ lead.waiting }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- Equipe -->
    <section>
      <p class="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">Equipe PNM</p>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="person in partnerWorkload"
          :key="person.name"
          class="panel-card p-5"
        >
          <p class="font-medium text-pnm-900">{{ person.name }}</p>
          <p class="text-xs text-zinc-500">{{ person.role }}</p>
          <p class="mt-3 text-[10px] uppercase tracking-wide text-zinc-400">Foco</p>
          <p class="text-xs font-medium text-pnm-700">{{ person.focus }}</p>
          <div class="mt-4 flex gap-4 border-t border-zinc-100 pt-3">
            <div>
              <p class="font-serif text-xl font-semibold text-pnm-800">{{ person.handoffs }}</p>
              <p class="text-[10px] text-zinc-500">Handoffs</p>
            </div>
            <div v-if="person.qualified">
              <p class="font-serif text-xl font-semibold text-pnm-800">{{ person.qualified }}</p>
              <p class="text-[10px] text-zinc-500">Qualificados</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recuperação -->
    <section>
      <p class="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">Recuperação de base</p>
      <div class="grid gap-5 lg:grid-cols-12">
        <div class="grid gap-4 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
          <div
            v-for="days in ([30, 60, 90] as const)"
            :key="days"
            class="panel-card cursor-pointer p-5 transition"
            :class="reactivationTab === days ? 'ring-2 ring-pnm-500' : 'hover:ring-1 hover:ring-zinc-200'"
            @click="reactivationTab = days"
          >
            <p class="text-xs font-medium uppercase tracking-wide text-zinc-500">{{ days }} dias</p>
            <p class="mt-1 font-serif text-3xl font-semibold text-pnm-800">
              {{ reactivationCounts[days] }}
            </p>
            <p class="mt-1 text-xs text-zinc-500">
              {{
                days === 30
                  ? 'Reaquecimento automático'
                  : days === 60
                    ? 'Novidade de mercado'
                    : 'Último contato → Base Fria'
              }}
            </p>
          </div>
        </div>

        <div class="panel-card p-6 lg:col-span-8">
          <CardHeader
            title="Régua de reaquecimento"
            :meta="`Janela ${reactivationTab}d · ${reactivationCounts[reactivationTab]} leads na fila`"
          />
          <ul class="divide-y divide-zinc-100 rounded-xl bg-pnm-50/40">
            <li
              v-for="lead in reactivationLeads.slice(0, 6)"
              :key="lead.id"
              class="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm"
            >
              <div>
                <p class="font-medium text-pnm-900">{{ lead.name }}</p>
                <p class="text-xs text-zinc-500">{{ PRODUCT_LABELS[lead.product] }}</p>
              </div>
              <div class="text-right text-xs text-zinc-400">
                <p>Último contato: {{ formatDate(lead.lastContact) }}</p>
                <p class="text-pnm-600">Sequência {{ reactivationTab }}d ativa</p>
              </div>
            </li>
          </ul>
          <p class="mt-3 text-center text-xs text-zinc-400">
            Total em reaquecimento ativo: {{ dashboardStats.reactivationActive }} leads
          </p>
        </div>
      </div>
    </section>

    <!-- Atividade -->
    <section>
      <p class="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">Últimos eventos</p>
      <div class="panel-card p-6">
        <CardHeader title="Atividade recente" meta="conversas, handoffs, qualificações e vendas" />
        <ul class="grid gap-0 lg:grid-cols-2 lg:gap-x-8">
          <li
            v-for="item in recentActivity"
            :key="item.id"
            class="flex items-start gap-3 border-b border-zinc-100 py-3.5 last:border-0"
          >
            <div class="icon-box">
              <NavIcon :name="activityMeta[item.type]?.icon ?? 'message'" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-pnm-900">
                {{ activityMeta[item.type]?.title ?? item.leadName }}
              </p>
              <p class="mt-0.5 text-xs text-zinc-400">
                {{ item.leadName }} · {{ item.description }}
              </p>
            </div>
            <span class="shrink-0 text-xs text-zinc-400">
              {{ formatRelativeTime(item.timestamp) }}
            </span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
