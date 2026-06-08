import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { public: true },
    },
    {
      path: '/',
      component: () => import('@/layouts/AppLayout.vue'),
      children: [
        { path: '', name: 'dashboard', component: () => import('@/views/DashboardView.vue') },
        { path: 'leads', name: 'leads', component: () => import('@/views/LeadsView.vue') },
        { path: 'pipeline', name: 'pipeline', component: () => import('@/views/PipelineView.vue') },
        { path: 'conversas', name: 'conversas', component: () => import('@/views/ConversasView.vue') },
        { path: 'agenda', name: 'agenda', component: () => import('@/views/AgendaView.vue') },
        { path: 'recuperacao', name: 'recuperacao', component: () => import('@/views/RecuperacaoView.vue') },
        { path: 'produtos', name: 'produtos', component: () => import('@/views/ProdutosView.vue') },
        { path: 'integracoes', name: 'integracoes', component: () => import('@/views/IntegracoesView.vue') },
        { path: 'eventos', name: 'eventos', component: () => import('@/views/EventosView.vue') },
        { path: 'leads/:id', name: 'lead', component: () => import('@/views/LeadProfileView.vue') },
        { path: 'marketing', name: 'marketing', component: () => import('@/views/MarketingView.vue') },
        { path: 'agente', name: 'agente', component: () => import('@/views/AgentView.vue') },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (!to.meta.public && !auth.isAuthenticated) {
    return { name: 'login' }
  }
  if (to.name === 'login' && auth.isAuthenticated) {
    return { name: 'dashboard' }
  }
})

export default router
