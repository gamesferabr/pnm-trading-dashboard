<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import NavIcon from '@/components/NavIcon.vue'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

interface NavItem {
  name: string
  to: string
  icon: string
}

interface NavSection {
  label: string
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    label: 'Operação',
    items: [
      { name: 'Painel', to: '/', icon: 'grid' },
      { name: 'Pipeline', to: '/pipeline', icon: 'kanban' },
    ],
  },
  {
    label: 'Inteligência',
    items: [{ name: 'Agente IA', to: '/agente', icon: 'bot' }],
  },
  {
    label: 'Marketing',
    items: [{ name: 'Broadcasts', to: '/marketing', icon: 'megaphone' }],
  },
]

const flatNav = computed(() => navSections.flatMap((s) => s.items))

function isActive(to: string): boolean {
  if (to === '/') return route.path === '/'
  return route.path === to || route.path.startsWith(`${to}/`)
}

function handleLogout(): void {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="flex min-h-screen bg-surface">
    <aside
      class="fixed inset-y-0 left-0 z-40 hidden w-[240px] flex-col bg-pnm-950 text-white lg:flex"
    >
      <!-- Seletor de usuário -->
      <div class="p-4">
        <div
          class="flex items-center gap-3 rounded-xl bg-pnm-900/80 px-3 py-2.5"
        >
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/90 text-sm font-bold text-pnm-950"
          >
            P
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium">{{ auth.user?.name ?? 'Usuário' }}</p>
            <p class="truncate text-[11px] text-pnm-300">{{ auth.user?.role }}</p>
          </div>
        </div>
      </div>

      <nav class="flex-1 overflow-y-auto px-3 pb-4">
        <div v-for="section in navSections" :key="section.label">
          <p class="nav-section-label">{{ section.label }}</p>
          <RouterLink
            v-for="item in section.items"
            :key="item.to"
            :to="item.to"
            class="nav-link"
            :class="{ 'nav-link-active': isActive(item.to) }"
          >
            <NavIcon :name="item.icon" />
            {{ item.name }}
          </RouterLink>
        </div>
      </nav>

      <div class="border-t border-white/8 p-4">
        <button
          type="button"
          class="w-full rounded-lg px-3 py-2 text-left text-sm text-pnm-300 transition hover:bg-white/5 hover:text-white"
          @click="handleLogout"
        >
          Sair
        </button>
      </div>
    </aside>

    <header
      class="fixed inset-x-0 top-0 z-30 flex items-center justify-between bg-pnm-950 px-4 py-3 text-white lg:hidden"
    >
      <div class="flex items-center gap-2">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/90 text-xs font-bold text-pnm-950">
          P
        </div>
        <span class="text-sm font-medium">PNM Trading</span>
      </div>
      <button type="button" class="text-xs text-pnm-300" @click="handleLogout">Sair</button>
    </header>

    <main class="flex-1 pt-14 lg:ml-[240px] lg:pt-0">
      <nav class="flex gap-1 overflow-x-auto border-b border-zinc-200/60 bg-white/60 px-3 py-2 lg:hidden">
        <RouterLink
          v-for="item in flatNav"
          :key="item.to"
          :to="item.to"
          class="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium"
          :class="isActive(item.to) ? 'bg-pnm-700 text-white' : 'text-zinc-600'"
        >
          {{ item.name }}
        </RouterLink>
      </nav>

      <div class="p-5 lg:p-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>
