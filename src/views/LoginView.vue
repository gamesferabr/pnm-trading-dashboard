<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const email = ref('cinthia@pnmtrading.com.br')
const password = ref('pnm2026')

async function handleSubmit(): Promise<void> {
  const ok = await auth.login(email.value, password.value)
  if (ok) router.push({ name: 'dashboard' })
}
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Painel esquerdo — estilo CliniTrack -->
    <div
      class="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-pnm-950 p-12 text-white lg:flex"
    >
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#256349_0%,_transparent_50%)] opacity-60" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#1e4a38_0%,_transparent_60%)] opacity-40" />

      <div class="relative z-10">
        <div class="flex items-center gap-3">
          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-lg font-bold backdrop-blur"
          >
            PNM
          </div>
          <span class="text-xl font-semibold tracking-tight">PNM Trading</span>
        </div>
      </div>

      <div class="relative z-10 max-w-lg space-y-6">
        <h1 class="text-4xl font-bold leading-tight tracking-tight">
          Do cocho à Bolsa,<br />do lead ao fechamento.
        </h1>
        <p class="text-lg text-pnm-200/90">
          CRM visual, agente de IA no WhatsApp e reaquecimento automático — tudo em um só lugar para
          a equipe PNM Trading.
        </p>

        <div class="grid grid-cols-3 gap-4 pt-4">
          <div class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <p class="font-mono text-2xl font-semibold text-accent-soft">&lt;30s</p>
            <p class="mt-1 text-sm text-pnm-200">1ª resposta IA</p>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <p class="font-mono text-2xl font-semibold text-accent-soft">+34%</p>
            <p class="mt-1 text-sm text-pnm-200">Qualificação</p>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <p class="font-mono text-2xl font-semibold text-accent-soft">24/7</p>
            <p class="mt-1 text-sm text-pnm-200">Agente ativo</p>
          </div>
        </div>
      </div>

      <p class="relative z-10 text-sm text-pnm-300/70">
        Gestão, estratégia comercial e ação · @pnm.trading
      </p>
    </div>

    <!-- Formulário de login -->
    <div class="flex w-full flex-col justify-center bg-white px-6 py-12 lg:w-1/2 lg:px-16">
      <div class="mx-auto w-full max-w-md">
        <div class="mb-8 lg:hidden">
          <div class="flex items-center gap-2">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-pnm-700 text-sm font-bold text-white">
              PNM
            </div>
            <span class="text-lg font-semibold text-pnm-900">PNM Trading</span>
          </div>
        </div>

        <div class="mb-8">
          <p class="text-sm font-medium text-pnm-500">Acesso da equipe</p>
          <h2 class="mt-1 text-2xl font-bold text-pnm-950">Bem-vindo de volta</h2>
          <p class="mt-2 text-sm text-zinc-500">
            Entre para acompanhar leads, handoffs e atendimentos da PNM.
          </p>
        </div>

        <form class="space-y-5" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="mb-1.5 block text-sm font-medium text-zinc-700">E-mail</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              autocomplete="email"
              placeholder="seu@pnmtrading.com.br"
              class="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-pnm-500 focus:bg-white focus:ring-2 focus:ring-pnm-500/20"
            />
          </div>

          <div>
            <label for="password" class="mb-1.5 block text-sm font-medium text-zinc-700">Senha</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              autocomplete="current-password"
              placeholder="••••••••"
              class="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-pnm-500 focus:bg-white focus:ring-2 focus:ring-pnm-500/20"
            />
          </div>

          <p v-if="auth.error" class="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {{ auth.error }}
          </p>

          <button
            type="submit"
            :disabled="auth.loading"
            class="w-full rounded-xl bg-pnm-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-pnm-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ auth.loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>

        <p class="mt-8 rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-xs text-zinc-500">
          Demo: <span class="font-mono">cinthia@pnmtrading.com.br</span> · senha
          <span class="font-mono">pnm2026</span>
        </p>

        <p class="mt-4 text-center text-xs text-zinc-400">
          Dados isolados por equipe. Cada login enxerga só os leads da PNM Trading.
        </p>
      </div>
    </div>
  </div>
</template>
