<script setup lang="ts">
import { computed, ref } from 'vue'
import { Line, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  ArcElement,
  Legend,
} from 'chart.js'
import KpiCard from '@/components/KpiCard.vue'
import CardHeader from '@/components/CardHeader.vue'
import NavIcon from '@/components/NavIcon.vue'
import {
  dashboardStats,
  leadsByStatus,
  leadsByProduct,
  hotLeads,
  recentActivity,
  leadsTrend,
  getLeadsByColdWindow,
  STATUS_LABELS,
  PRODUCT_LABELS,
  formatRelativeTime,
  formatDate,
} from '@/data/mockData'
import type { LeadStatus } from '@/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  ArcElement,
  Legend,
)

const reactivationTab = ref<30 | 60 | 90>(30)

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

const productChartData = computed(() => ({
  labels: Object.keys(leadsByProduct).map((k) => {
    const label = PRODUCT_LABELS[k as keyof typeof PRODUCT_LABELS]
    return label.length > 22 ? `${label.slice(0, 20)}…` : label
  }),
  datasets: [
    {
      data: Object.values(leadsByProduct),
      backgroundColor: ['#1e4a38', '#256349', '#2d7a5a', '#3d9970'],
      borderWidth: 0,
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
      labels: { boxWidth: 10, padding: 12, font: { size: 10, family: 'DM Sans' } },
    },
  },
}

const activityMeta: Record<string, { title: string; category: string; icon: string }> = {
  conversa: { title: 'Mensagem recebida', category: 'Message', icon: 'message' },
  handoff: { title: 'Handoff solicitado', category: 'Conversation', icon: 'bot' },
  qualificado: { title: 'Lead qualificado', category: 'Qualification', icon: 'users' },
  fechado: { title: 'Venda confirmada', category: 'Sale', icon: 'trend' },
  reaquecimento: { title: 'Reaquecimento enviado', category: 'Automation', icon: 'megaphone' },
}

const reactivationLeads = computed(() => getLeadsByColdWindow(reactivationTab.value))

const reactivationCounts = {
  30: dashboardStats.reactivation30,
  60: dashboardStats.reactivation60,
  90: dashboardStats.reactivation90,
}
</script>

<template>
  <div class="space-y-6">
    <div class="panel-card flex flex-wrap items-center justify-between gap-3 px-5 py-3">
      <p class="text-sm text-zinc-600">
        Base consolidada · <span class="font-medium text-pnm-800">487 leads</span>
        (incl. ~500 contatos RD Station reativados)
      </p>
      <p class="text-xs text-zinc-400">
        Fabiano · Gustavo · Renan · Atendimento: Cinthia
      </p>
    </div>

    <!-- KPIs briefing -->
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        label="Total de leads"
        :value="dashboardStats.totalLeads"
        :hint="`+${dashboardStats.leadsVariation}% vs mês anterior`"
      >
        <template #icon><NavIcon name="users" /></template>
      </KpiCard>

      <KpiCard
        label="Tempo médio de resposta"
        :value="dashboardStats.avgResponseTime"
        hint="Agente IA · meta &lt; 30s"
      >
        <template #icon><NavIcon name="message" /></template>
      </KpiCard>

      <KpiCard
        label="Taxa de qualificação"
        :value="`${dashboardStats.qualificationRate}%`"
        hint="Triagem completa no mês"
      >
        <template #icon><NavIcon name="trend" /></template>
      </KpiCard>

      <KpiCard
        label="Conversas ativas"
        :value="dashboardStats.activeConversations"
        :hint="`${dashboardStats.handoffsToday} handoffs hoje`"
      >
        <template #icon><NavIcon name="calendar" /></template>
      </KpiCard>
    </div>

    <!-- Gráfico + Atividade -->
    <div class="grid gap-5 lg:grid-cols-5">
      <div class="panel-card p-6 lg:col-span-3">
        <CardHeader title="Novos leads" meta="últimos 30 dias" />
        <div class="h-64">
          <Line :data="areaChartData" :options="areaChartOptions" />
        </div>
      </div>

      <div class="panel-card p-6 lg:col-span-2">
        <CardHeader title="Atividade recente" meta="eventos do sistema" />
        <ul>
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
    </div>

    <!-- Status + Trilha -->
    <div class="grid gap-5 lg:grid-cols-2">
      <div class="panel-card p-6">
        <CardHeader title="Leads por status" meta="funil de atendimento" />
        <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
          <div
            v-for="(count, status) in leadsByStatus"
            :key="status"
            class="rounded-xl bg-pnm-50/60 px-3 py-3 text-center"
          >
            <p class="font-serif text-xl font-semibold text-pnm-800">{{ count }}</p>
            <p class="mt-1 text-[10px] leading-tight text-zinc-500">
              {{ STATUS_LABELS[status as LeadStatus] }}
            </p>
          </div>
        </div>
      </div>

      <div class="panel-card p-6">
        <CardHeader title="Leads por trilha" meta="4 produtos PNM" />
        <div class="h-56">
          <Doughnut :data="productChartData" :options="doughnutOptions" />
        </div>
      </div>
    </div>

    <!-- Leads quentes -->
    <div class="panel-card p-6">
      <CardHeader title="Alertas — lead quente" meta="intenção forte detectada pela IA" />
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="lead in hotLeads"
          :key="lead.id"
          class="rounded-xl bg-amber-50/60 px-4 py-3 ring-1 ring-amber-100"
        >
          <div class="flex items-start justify-between gap-2">
            <p class="text-sm font-medium text-pnm-900">{{ lead.name }}</p>
            <span class="shrink-0 text-xs text-zinc-400">{{ lead.time }}</span>
          </div>
          <p class="mt-1 text-xs text-pnm-600">{{ PRODUCT_LABELS[lead.product] }}</p>
          <p class="mt-0.5 text-xs text-zinc-500">{{ lead.reason }}</p>
        </div>
      </div>
    </div>

    <!-- Reaquecimento com lista filtrável -->
    <div class="panel-card p-6">
      <CardHeader title="Régua de reaquecimento" meta="leads sem interação · base RD Station" />
      <div class="mb-4 flex flex-wrap gap-2">
        <button
          v-for="days in ([30, 60, 90] as const)"
          :key="days"
          type="button"
          class="rounded-lg px-4 py-2 text-sm font-medium transition"
          :class="
            reactivationTab === days
              ? 'bg-pnm-700 text-white'
              : 'bg-pnm-50 text-zinc-600 hover:bg-pnm-100'
          "
          @click="reactivationTab = days"
        >
          {{ days }} dias
          <span class="ml-1 font-mono text-xs opacity-80">({{ reactivationCounts[days] }})</span>
        </button>
      </div>
      <p class="mb-3 text-xs text-zinc-500">
        {{
          reactivationTab === 30
            ? 'Sequência automática de reaquecimento ativa'
            : reactivationTab === 60
              ? 'Abordagem com novidade de produto ou mercado'
              : 'Último contato automatizado → Base Fria'
        }}
      </p>
      <ul class="divide-y divide-zinc-100 rounded-xl bg-pnm-50/40">
        <li
          v-for="lead in reactivationLeads"
          :key="lead.id"
          class="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm"
        >
          <div>
            <p class="font-medium text-pnm-900">{{ lead.name }}</p>
            <p class="text-xs text-zinc-500">{{ PRODUCT_LABELS[lead.product] }}</p>
          </div>
          <div class="text-right text-xs text-zinc-400">
            <p>Último contato: {{ formatDate(lead.lastContact) }}</p>
            <p class="text-pnm-600">Janela {{ reactivationTab }}d</p>
          </div>
        </li>
        <li v-if="!reactivationLeads.length" class="px-4 py-6 text-center text-sm text-zinc-400">
          Nenhum lead nesta janela no recorte atual.
        </li>
      </ul>
    </div>
  </div>
</template>
