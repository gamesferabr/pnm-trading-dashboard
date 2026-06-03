<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  getLeadById,
  PRODUCT_LABELS,
  STATUS_LABELS,
  STATUS_COLORS,
  formatDate,
  formatDateTime,
} from '@/data/mockData'
import SectionHeader from '@/components/SectionHeader.vue'
import CardHeader from '@/components/CardHeader.vue'

const route = useRoute()
const router = useRouter()

const lead = computed(() => getLeadById(String(route.params.id)))
const noteDraft = ref(lead.value?.notes ?? '')

const checklistLabels: Record<string, string> = {
  nome: 'Nome confirmado',
  dor: 'Dor principal identificada',
  experiencia: 'Nível de experiência',
  rebanho: 'Tamanho do rebanho/operação',
  disponibilidade: 'Disponibilidade',
  budget: 'Budget aproximado',
}

const timelineStyles: Record<string, string> = {
  ia: 'border-l-emerald-400 bg-emerald-50',
  lead: 'border-l-sky-400 bg-sky-50',
  humano: 'border-l-violet-400 bg-violet-50',
  sistema: 'border-l-zinc-400 bg-zinc-50',
  nota: 'border-l-amber-400 bg-amber-50',
}

const aiBadge: Record<string, string> = {
  ativa: 'bg-emerald-100 text-emerald-700',
  pausada: 'bg-zinc-100 text-zinc-600',
  handoff: 'bg-violet-100 text-violet-700',
}

function goBack(): void {
  router.push({ name: 'pipeline' })
}

function stageLabel(status: string | null): string {
  if (!status) return '—'
  return STATUS_LABELS[status as keyof typeof STATUS_LABELS] ?? status
}
</script>

<template>
  <div v-if="lead" class="space-y-6">
    <SectionHeader :title="lead.name" subtitle="Perfil completo do lead · tela principal da Cinthia" />

    <button
      type="button"
      class="text-sm font-medium text-pnm-600 transition hover:text-pnm-800"
      @click="goBack"
    >
      Voltar ao pipeline
    </button>

    <div class="grid gap-6 lg:grid-cols-3">
      <div class="space-y-4 lg:col-span-1">
        <div class="panel-card p-5">
          <div class="flex items-start justify-between">
            <div>
              <h2 class="font-serif text-xl font-semibold text-pnm-950">{{ lead.name }}</h2>
              <p v-if="lead.hotLead" class="mt-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
                Lead quente
              </p>
            </div>
            <span
              class="rounded-full px-2.5 py-1 text-xs font-medium"
              :class="STATUS_COLORS[lead.status]"
            >
              {{ STATUS_LABELS[lead.status] }}
            </span>
          </div>

          <div class="mt-4 flex items-center gap-2">
            <span
              class="rounded-full px-2 py-0.5 text-[10px] font-medium uppercase"
              :class="aiBadge[lead.aiStatus]"
            >
              IA {{ lead.aiStatus }}
            </span>
            <span v-if="lead.coldWindow" class="text-xs text-zinc-500">
              Reaquecimento {{ lead.coldWindow }}d
            </span>
          </div>

          <dl class="mt-5 space-y-3 text-sm">
            <div>
              <dt class="text-xs text-zinc-500">Telefone</dt>
              <dd class="font-medium">{{ lead.phone }}</dd>
            </div>
            <div v-if="lead.email">
              <dt class="text-xs text-zinc-500">E-mail</dt>
              <dd class="font-medium">{{ lead.email }}</dd>
            </div>
            <div>
              <dt class="text-xs text-zinc-500">Localização</dt>
              <dd class="font-medium">{{ lead.location }}</dd>
            </div>
            <div v-if="lead.herdSize">
              <dt class="text-xs text-zinc-500">Rebanho / Operação</dt>
              <dd class="font-medium">{{ lead.herdSize }}</dd>
            </div>
            <div>
              <dt class="text-xs text-zinc-500">Trilha identificada</dt>
              <dd class="font-medium text-pnm-700">{{ PRODUCT_LABELS[lead.product] }}</dd>
            </div>
            <div>
              <dt class="text-xs text-zinc-500">Origem</dt>
              <dd class="font-medium capitalize">{{ lead.origin.replace('_', ' ') }}</dd>
            </div>
            <div>
              <dt class="text-xs text-zinc-500">Último contato</dt>
              <dd class="font-medium">{{ formatDateTime(lead.lastContact) }}</dd>
            </div>
            <div>
              <dt class="text-xs text-zinc-500">Criado em</dt>
              <dd class="font-medium">{{ formatDate(lead.createdAt) }}</dd>
            </div>
          </dl>
        </div>

        <div class="panel-card p-5">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-pnm-900">Status de qualificação</h3>
            <span class="font-serif text-lg font-semibold text-pnm-700">{{ lead.score }}%</span>
          </div>
          <ul class="mt-4 space-y-2">
            <li
              v-for="(done, key) in lead.qualification"
              :key="key"
              class="flex items-center gap-2 text-sm"
            >
              <span
                class="flex h-5 w-5 items-center justify-center rounded-full text-xs"
                :class="done ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-400'"
              >
                {{ done ? 'OK' : '—' }}
              </span>
              <span :class="done ? 'text-pnm-900' : 'text-zinc-400'">
                {{ checklistLabels[key] }}
              </span>
            </li>
          </ul>
        </div>

        <div class="panel-card p-5">
          <h3 class="font-semibold text-pnm-900">Ações rápidas</h3>
          <div class="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              class="rounded-xl bg-pnm-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-pnm-600"
            >
              Assumir atendimento
            </button>
            <button
              type="button"
              class="rounded-xl border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              Mover etapa
            </button>
            <button
              type="button"
              class="rounded-xl border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              Adicionar nota
            </button>
            <button
              type="button"
              class="rounded-xl border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
            >
              Marcar perdido
            </button>
          </div>
        </div>

        <div class="panel-card p-5">
          <CardHeader title="Notas da Cinthia" meta="campo livre para anotações manuais" />
          <textarea
            v-model="noteDraft"
            rows="4"
            placeholder="Registrar observações do atendimento humano..."
            class="mt-3 w-full rounded-xl border-0 bg-pnm-50/80 p-3 text-sm outline-none ring-1 ring-zinc-200/80 focus:ring-pnm-400"
          />
          <button
            type="button"
            class="mt-2 rounded-lg bg-pnm-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-pnm-600"
          >
            Salvar nota
          </button>
        </div>

        <div v-if="lead.stageHistory?.length" class="panel-card p-5">
          <CardHeader title="Histórico de etapas" meta="quem moveu e quando" />
          <ul class="mt-3 space-y-3">
            <li
              v-for="entry in [...lead.stageHistory].reverse()"
              :key="entry.id"
              class="rounded-lg bg-pnm-50/60 px-3 py-2 text-xs"
            >
              <div class="flex items-center justify-between gap-2">
                <span class="font-medium text-pnm-900">
                  {{ stageLabel(entry.from) }} → {{ stageLabel(entry.to) }}
                </span>
                <span class="text-zinc-400">{{ formatDateTime(entry.timestamp) }}</span>
              </div>
              <p class="mt-1 text-zinc-500">
                Por: {{ entry.changedBy === 'ia' ? 'Agente IA' : entry.author ?? 'Humano' }}
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div class="lg:col-span-2">
        <div class="panel-card p-5">
          <CardHeader title="Timeline de conversa" meta="IA, lead, ações manuais e sistema" />

          <div v-if="lead.timeline.length" class="mt-6 space-y-4">
            <div
              v-for="event in lead.timeline"
              :key="event.id"
              class="rounded-xl border-l-4 p-4"
              :class="timelineStyles[event.type]"
            >
              <div class="flex items-center justify-between gap-2">
                <span class="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {{
                    event.type === 'ia'
                      ? 'Agente IA'
                      : event.type === 'lead'
                        ? 'Lead'
                        : event.type === 'humano'
                          ? 'Atendente'
                          : event.type
                  }}
                </span>
                <span class="text-xs text-zinc-400">{{ formatDateTime(event.timestamp) }}</span>
              </div>
              <p class="mt-2 text-sm text-pnm-900">{{ event.message }}</p>
            </div>
          </div>
          <p v-else class="mt-8 text-center text-sm text-zinc-400">
            Nenhuma mensagem registrada ainda.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="panel-card p-12 text-center">
    <p class="text-zinc-500">Lead não encontrado.</p>
    <button type="button" class="mt-4 text-sm font-medium text-pnm-600" @click="goBack">
      Voltar ao pipeline
    </button>
  </div>
</template>
