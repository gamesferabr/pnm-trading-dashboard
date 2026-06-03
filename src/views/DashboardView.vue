<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'
import KpiCard from '@/components/KpiCard.vue'
import CardHeader from '@/components/CardHeader.vue'
import NavIcon from '@/components/NavIcon.vue'
import {
  dashboardStats,
  leadsByStatus,
  hotLeads,
  recentActivity,
  leadsTrend,
  STATUS_LABELS,
  PRODUCT_LABELS,
  formatRelativeTime,
} from '@/data/mockData'
import type { LeadStatus } from '@/types'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)

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

const areaChartOptions = {
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

const activityMeta: Record<
  string,
  { title: string; category: string; icon: string }
> = {
  conversa: { title: 'Mensagem recebida', category: 'Message', icon: 'message' },
  handoff: { title: 'Handoff solicitado', category: 'Conversation', icon: 'bot' },
  qualificado: { title: 'Lead qualificado', category: 'Qualification', icon: 'users' },
  fechado: { title: 'Venda confirmada', category: 'Sale', icon: 'trend' },
  reaquecimento: { title: 'Reaquecimento enviado', category: 'Automation', icon: 'megaphone' },
}

const closedCount = leadsByStatus.fechado
const lostCount = leadsByStatus.perdido
</script>

<template>
  <div class="space-y-6">
    <!-- KPIs — linha superior estilo CliniTrack -->
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        label="Leads ativos"
        :value="dashboardStats.activeConversations"
        :hint="`${dashboardStats.totalLeads} no total`"
      >
        <template #icon><NavIcon name="users" /></template>
      </KpiCard>

      <KpiCard label="Handoffs hoje" :value="dashboardStats.handoffsToday">
        <template #icon><NavIcon name="message" /></template>
      </KpiCard>

      <KpiCard
        label="Qualificados"
        :value="leadsByStatus.qualificado"
        hint="Prontos para contato humano"
      >
        <template #icon><NavIcon name="calendar" /></template>
      </KpiCard>

      <KpiCard
        label="Taxa de conversão"
        :value="`${dashboardStats.qualificationRate}%`"
        :hint="`${closedCount} fechados · ${lostCount} perdidos`"
      >
        <template #icon><NavIcon name="trend" /></template>
      </KpiCard>
    </div>

    <!-- Gráfico + Atividade recente -->
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
                {{ activityMeta[item.type]?.category ?? item.description }}
              </p>
            </div>
            <span class="shrink-0 text-xs text-zinc-400">
              {{ formatRelativeTime(item.timestamp) }}
            </span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Funil por etapa -->
    <div class="panel-card p-6">
      <CardHeader title="Funil por etapa" meta="distribuição atual" />
      <div class="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div
          v-for="(count, status) in leadsByStatus"
          :key="status"
          class="rounded-xl bg-pnm-50/60 px-4 py-4 text-center"
        >
          <p class="font-serif text-2xl font-semibold text-pnm-800">{{ count }}</p>
          <p class="mt-1 text-xs text-zinc-500">{{ STATUS_LABELS[status as LeadStatus] }}</p>
        </div>
      </div>
    </div>

    <!-- Leads quentes + Reaquecimento -->
    <div class="grid gap-5 lg:grid-cols-2">
      <div class="panel-card p-6">
        <CardHeader title="Leads quentes" meta="intenção forte detectada" />
        <ul class="space-y-3">
          <li
            v-for="lead in hotLeads"
            :key="lead.id"
            class="rounded-xl bg-pnm-50/50 px-4 py-3"
          >
            <div class="flex items-start justify-between gap-2">
              <p class="text-sm font-medium text-pnm-900">{{ lead.name }}</p>
              <span class="shrink-0 text-xs text-zinc-400">{{ lead.time }}</span>
            </div>
            <p class="mt-1 text-xs text-pnm-600">{{ PRODUCT_LABELS[lead.product] }}</p>
            <p class="mt-0.5 text-xs text-zinc-500">{{ lead.reason }}</p>
          </li>
        </ul>
      </div>

      <div class="panel-card p-6">
        <CardHeader title="Reaquecimento de base" meta="RD Station · 30 / 60 / 90 dias" />
        <div class="grid gap-3 sm:grid-cols-3">
          <div class="rounded-xl bg-pnm-50/60 p-4 text-center">
            <p class="font-serif text-2xl font-semibold text-pnm-800">
              {{ dashboardStats.reactivation30 }}
            </p>
            <p class="mt-1 text-xs text-zinc-500">30 dias</p>
          </div>
          <div class="rounded-xl bg-pnm-50/60 p-4 text-center">
            <p class="font-serif text-2xl font-semibold text-pnm-800">
              {{ dashboardStats.reactivation60 }}
            </p>
            <p class="mt-1 text-xs text-zinc-500">60 dias</p>
          </div>
          <div class="rounded-xl bg-pnm-50/60 p-4 text-center">
            <p class="font-serif text-2xl font-semibold text-pnm-800">
              {{ dashboardStats.reactivation90 }}
            </p>
            <p class="mt-1 text-xs text-zinc-500">90 dias</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
