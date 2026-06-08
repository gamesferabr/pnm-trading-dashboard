<script setup lang="ts">
import SectionHeader from '@/components/SectionHeader.vue'
import { PRODUCT_INFO, PRODUCT_LABELS, leadsByProduct, productPerformance } from '@/data/mockData'
</script>

<template>
  <div class="space-y-6">
    <SectionHeader
      title="Produtos"
      subtitle="4 trilhas do agente IA · cadastro PNM Trading"
    />

    <div class="grid gap-5 lg:grid-cols-2">
      <div
        v-for="product in PRODUCT_INFO"
        :key="product.trail"
        class="panel-card p-6"
      >
        <p class="text-xs font-semibold uppercase tracking-wide text-pnm-600">Trilha</p>
        <h3 class="mt-1 font-serif text-xl font-semibold text-pnm-900">
          {{ PRODUCT_LABELS[product.trail] }}
        </h3>
        <p class="mt-3 text-sm text-zinc-600">{{ product.audience }}</p>
        <div class="mt-4 flex gap-6 border-t border-zinc-100 pt-4">
          <div>
            <p class="font-serif text-2xl font-semibold text-pnm-800">{{ leadsByProduct[product.trail] }}</p>
            <p class="text-[10px] text-zinc-500">Leads na base</p>
          </div>
          <div>
            <p class="font-serif text-2xl font-semibold text-pnm-800">
              {{ productPerformance.find((p) => p.trail === product.trail)?.qualified ?? 0 }}
            </p>
            <p class="text-[10px] text-zinc-500">Qualificados</p>
          </div>
          <div>
            <p class="font-serif text-2xl font-semibold text-pnm-800">
              {{ productPerformance.find((p) => p.trail === product.trail)?.closed ?? 0 }}
            </p>
            <p class="text-[10px] text-zinc-500">Fechados</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
