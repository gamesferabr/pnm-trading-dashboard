import type {
  ActivityItem,
  Campaign,
  Lead,
  LeadStatus,
  ProductInfo,
  ProductTrail,
  PromptVersion,
} from '@/types'

export const PRODUCT_LABELS: Record<ProductTrail, string> = {
  mentoria_grafica: 'Mentoria Análise Gráfica',
  texas_pnm: 'Texas PNM · Confinamento',
  mercado_futuro: 'Mercado Futuro Boi/Milho',
  geti: 'GETI',
}

export const STATUS_LABELS: Record<LeadStatus, string> = {
  novo: 'Novo',
  em_atendimento: 'Em atendimento',
  qualificado: 'Qualificado',
  handoff: 'Handoff',
  fechado: 'Fechado',
  perdido: 'Perdido',
}

export const STATUS_COLORS: Record<LeadStatus, string> = {
  novo: 'bg-sky-100 text-sky-700',
  em_atendimento: 'bg-amber-100 text-amber-800',
  qualificado: 'bg-emerald-100 text-emerald-800',
  handoff: 'bg-violet-100 text-violet-800',
  fechado: 'bg-pnm-100 text-pnm-700',
  perdido: 'bg-zinc-100 text-zinc-600',
}

export const DEMO_USERS = [
  { email: 'cinthia@pnmtrading.com.br', password: 'pnm2026', name: 'Cinthia', role: 'Atendimento' },
  { email: 'fabiano@pnmtrading.com.br', password: 'pnm2026', name: 'Fabiano', role: 'Sócio · Pecuária' },
  { email: 'renan@pnmtrading.com.br', password: 'pnm2026', name: 'Renan', role: 'Sócio · Trading' },
]

export const dashboardStats = {
  totalLeads: 487,
  leadsVariation: 12.4,
  avgResponseTime: '28s',
  qualificationRate: 34.2,
  activeConversations: 23,
  handoffsToday: 7,
  pendingHandoffs: 7,
  salesThisMonth: 23,
  salesVariation: 8.6,
  messagesToday: 347,
  audioToday: 12,
  reactivation30: 89,
  reactivation60: 54,
  reactivation90: 112,
  reactivationActive: 255,
  rdStationBase: 500,
  newLeadsToday: 8,
  qualifiedToday: 5,
}

export const leadsByOrigin: Record<string, number> = {
  instagram: 198,
  whatsapp: 142,
  formulario: 67,
  indicacao: 38,
  rd_station: 42,
}

export const ORIGIN_LABELS: Record<string, string> = {
  instagram: 'Instagram @pnm.trading',
  whatsapp: 'WhatsApp direto',
  formulario: 'Formulário / Site',
  indicacao: 'Indicação sócio',
  rd_station: 'Base RD Station',
}

export const funnelConversion = [
  { from: 'Novo', to: 'Em atendimento', rate: 87.3, count: 54 },
  { from: 'Em atendimento', to: 'Qualificado', rate: 42.1, count: 33 },
  { from: 'Qualificado', to: 'Handoff', rate: 68.5, count: 31 },
  { from: 'Handoff', to: 'Fechado', rate: 31.2, count: 6 },
]

export const weeklySummary = {
  newLeads: 48,
  qualified: 16,
  closed: 9,
  lost: 11,
  reactivated: 23,
  handoffs: 18,
}

export const pendingHandoffs = [
  {
    id: 'l-001',
    name: 'Marcos Aurélio',
    product: 'mercado_futuro' as ProductTrail,
    waiting: '12 min',
    herdSize: '480 cabeças',
    score: 92,
  },
  {
    id: 'l-005',
    name: 'João Batista',
    product: 'mercado_futuro' as ProductTrail,
    waiting: '38 min',
    herdSize: '600 cabeças',
    score: 95,
  },
  {
    id: 'l-002',
    name: 'Fazenda Santa Helena',
    product: 'texas_pnm' as ProductTrail,
    waiting: '1h 04',
    herdSize: '850 cabeças',
    score: 88,
  },
]

export const partnerWorkload = [
  { name: 'Fabiano', role: 'Pecuária · Texas PNM', handoffs: 3, qualified: 8, focus: 'Confinamento' },
  { name: 'Gustavo', role: 'Nutrição animal', handoffs: 2, qualified: 5, focus: 'Texas PNM · GETI' },
  { name: 'Renan', role: 'Trading · Mercado Futuro', handoffs: 5, qualified: 12, focus: 'Boi / Milho' },
  { name: 'Cinthia', role: 'Atendimento humano', handoffs: 7, qualified: 0, focus: 'Handoffs ativos' },
]

export const productPerformance = [
  { trail: 'mercado_futuro' as ProductTrail, leads: 167, qualified: 58, closed: 52, rate: 31.1 },
  { trail: 'mentoria_grafica' as ProductTrail, leads: 142, qualified: 41, closed: 38, rate: 26.8 },
  { trail: 'texas_pnm' as ProductTrail, leads: 98, qualified: 32, closed: 28, rate: 28.6 },
  { trail: 'geti' as ProductTrail, leads: 80, qualified: 24, closed: 16, rate: 20.0 },
]

export const agentLiveStatus = {
  online: true,
  whatsappConnected: true,
  routerActive: true,
  reengagementActive: true,
  hotLeadAlerts: true,
  avgFirstResponse: '28s',
  messagesPerHour: 42,
}

export const leadsByStatus: Record<LeadStatus, number> = {
  novo: 62,
  em_atendimento: 78,
  qualificado: 45,
  handoff: 18,
  fechado: 134,
  perdido: 150,
}

export const leadsByProduct: Record<ProductTrail, number> = {
  mentoria_grafica: 142,
  texas_pnm: 98,
  mercado_futuro: 167,
  geti: 80,
}

export const PRODUCT_INFO: ProductInfo[] = [
  {
    trail: 'mentoria_grafica',
    audience: 'Pecuaristas que querem aprender a ler mercado futuro — foco educacional',
  },
  {
    trail: 'texas_pnm',
    audience: 'Confinamento e engorda intensiva — foco em gestão de produção',
  },
  {
    trail: 'mercado_futuro',
    audience: 'Traders de commodities agrícolas — linguagem técnica e financeira',
  },
  {
    trail: 'geti',
    audience: 'Programa GETI — produtor que busca formação completa PNM',
  },
]

export const promptVersionHistory: PromptVersion[] = [
  {
    id: 'pv-1',
    trail: 'mercado_futuro',
    author: 'Admin',
    date: '2026-06-01T10:00:00',
    summary: 'Inclusão de referência CBOT e lives do Renan',
  },
  {
    id: 'pv-2',
    trail: 'texas_pnm',
    author: 'Admin',
    date: '2026-05-20T14:30:00',
    summary: 'Ajuste de qualificação com nutrição (Gustavo)',
  },
  {
    id: 'pv-3',
    trail: 'geti',
    author: 'Admin',
    date: '2026-05-15T09:00:00',
    summary: 'Atualização turma GETI jul/2026',
  },
]

export const marketingStats = {
  campaignsSent: 12,
  avgResponseRate: 28.4,
  messagesThisMonth: 1847,
  scheduled: 2,
  messagesThisHour: 34,
  hourlyLimit: 50,
  dailyLimit: 200,
  messagesToday: 127,
}

export const hotLeads = [
  {
    id: 'l-001',
    name: 'Marcos Aurélio',
    product: 'mercado_futuro' as ProductTrail,
    reason: 'Pediu cotação do contrato de boi gordo',
    time: 'há 12 min',
  },
  {
    id: 'l-002',
    name: 'Fazenda Santa Helena',
    product: 'texas_pnm' as ProductTrail,
    reason: 'Quer link de pagamento do confinamento',
    time: 'há 34 min',
  },
  {
    id: 'l-003',
    name: 'Ricardo Mendes',
    product: 'geti' as ProductTrail,
    reason: 'Perguntou data da próxima turma GETI',
    time: 'há 1h',
  },
  {
    id: 'l-004',
    name: 'Ana Paula Ribeiro',
    product: 'mentoria_grafica' as ProductTrail,
    reason: 'Solicitou valores da mentoria mensal',
    time: 'há 2h',
  },
]

export const recentActivity: ActivityItem[] = [
  {
    id: 'a-1',
    type: 'handoff',
    leadName: 'João Batista',
    description: 'IA transferiu para Cinthia — lead qualificado (Mercado Futuro)',
    timestamp: '2026-06-03T14:22:00',
  },
  {
    id: 'a-2',
    type: 'qualificado',
    leadName: 'Fazenda Boa Vista',
    description: 'Triagem completa — 320 cabeças, interesse em Texas PNM',
    timestamp: '2026-06-03T13:58:00',
  },
  {
    id: 'a-3',
    type: 'conversa',
    leadName: 'Carlos Eduardo',
    description: 'Nova conversa iniciada via Instagram @pnm.trading',
    timestamp: '2026-06-03T13:41:00',
  },
  {
    id: 'a-4',
    type: 'reaquecimento',
    leadName: 'Pedro Henrique',
    description: 'Sequência 60d — agente mencionou alta do milho CBOT',
    timestamp: '2026-06-03T12:15:00',
  },
  {
    id: 'a-5',
    type: 'fechado',
    leadName: 'Silvia Campos',
    description: 'Venda GETI confirmada — turma jun/2026',
    timestamp: '2026-06-03T11:30:00',
  },
  {
    id: 'a-6',
    type: 'conversa',
    leadName: 'Agropecuária Três Irmãos',
    description: 'Lead respondeu áudio — transcrição concluída',
    timestamp: '2026-06-03T10:55:00',
  },
]

export const leadsTrend = {
  labels: ['05/05', '08/05', '11/05', '14/05', '17/05', '20/05', '23/05', '26/05', '29/05', '01/06', '03/06'],
  data: [3, 5, 4, 7, 6, 8, 5, 9, 7, 6, 8],
}

export const mockLeads: Lead[] = [
  {
    id: 'l-001',
    name: 'Marcos Aurélio',
    phone: '(62) 99841-2234',
    email: 'marcos.aurelio@agro.com',
    status: 'handoff',
    product: 'mercado_futuro',
    origin: 'instagram',
    aiStatus: 'handoff',
    lastContact: '2026-06-03T14:48:00',
    createdAt: '2026-05-28T09:12:00',
    hotLead: true,
    herdSize: '480 cabeças',
    location: 'Rio Verde, GO',
    score: 92,
    qualification: { nome: true, dor: true, experiencia: true, rebanho: true, disponibilidade: true, budget: true },
    notes: 'Opera boi e milho. Quer acompanhar live diária do Renan.',
    stageHistory: [
      { id: 'sh-1', from: null, to: 'novo', changedBy: 'ia', timestamp: '2026-05-28T09:12:00' },
      { id: 'sh-2', from: 'novo', to: 'em_atendimento', changedBy: 'ia', timestamp: '2026-05-28T09:13:00' },
      { id: 'sh-3', from: 'em_atendimento', to: 'qualificado', changedBy: 'ia', timestamp: '2026-06-02T11:00:00' },
      { id: 'sh-4', from: 'qualificado', to: 'handoff', changedBy: 'ia', timestamp: '2026-06-03T14:48:00' },
    ],
    timeline: [
      { id: 't1', type: 'lead', message: 'Vi no Instagram de vocês sobre mercado futuro. Quanto custa?', timestamp: '2026-06-03T14:20:00' },
      { id: 't2', type: 'ia', message: 'Olá, Marcos! Sou a assistente da PNM Trading. Você já opera contratos de boi ou milho?', timestamp: '2026-06-03T14:20:28' },
      { id: 't3', type: 'lead', message: 'Opero boi gordo há 2 anos, quero aprender milho também', timestamp: '2026-06-03T14:35:00' },
      { id: 't4', type: 'ia', message: 'Perfeito! Vou conectar você com nosso consultor Renan. Ele acompanha o mercado em tempo real — do cocho à bolsa.', timestamp: '2026-06-03T14:48:00' },
      { id: 't5', type: 'sistema', message: 'Lead marcado como handoff — notificação enviada à Cinthia', timestamp: '2026-06-03T14:48:05' },
    ],
  },
  {
    id: 'l-002',
    name: 'Fazenda Santa Helena',
    phone: '(64) 99233-8871',
    email: 'contato@santahelena.faz',
    status: 'qualificado',
    product: 'texas_pnm',
    origin: 'whatsapp',
    aiStatus: 'ativa',
    lastContact: '2026-06-03T13:10:00',
    createdAt: '2026-06-01T16:00:00',
    hotLead: true,
    herdSize: '850 cabeças',
    location: 'Jataí, GO',
    score: 88,
    qualification: { nome: true, dor: true, experiencia: true, rebanho: true, disponibilidade: true, budget: false },
    notes: '',
    timeline: [
      { id: 't1', type: 'lead', message: 'Quero saber sobre o confinamento Texas PNM', timestamp: '2026-06-01T16:05:00' },
      { id: 't2', type: 'ia', message: 'A Texas PNM é nossa metodologia de engorda intensiva. Quantas cabeças você confina hoje?', timestamp: '2026-06-01T16:05:30' },
    ],
  },
  {
    id: 'l-003',
    name: 'Ricardo Mendes',
    phone: '(65) 98112-4455',
    email: 'ricardo.m@email.com',
    status: 'em_atendimento',
    product: 'geti',
    origin: 'formulario',
    aiStatus: 'ativa',
    lastContact: '2026-06-03T12:45:00',
    createdAt: '2026-06-03T08:30:00',
    hotLead: true,
    location: 'Cuiabá, MT',
    score: 65,
    qualification: { nome: true, dor: true, experiencia: false, rebanho: false, disponibilidade: true, budget: false },
    notes: '',
    timeline: [
      { id: 't1', type: 'lead', message: 'Quando começa a próxima turma do GETI?', timestamp: '2026-06-03T12:45:00' },
      { id: 't2', type: 'ia', message: 'A próxima turma GETI está prevista para julho/2026. Você já é pecuarista ou está iniciando?', timestamp: '2026-06-03T12:45:25' },
    ],
  },
  {
    id: 'l-004',
    name: 'Ana Paula Ribeiro',
    phone: '(67) 99344-2211',
    email: 'anapaula.r@email.com',
    status: 'em_atendimento',
    product: 'mentoria_grafica',
    origin: 'instagram',
    aiStatus: 'ativa',
    lastContact: '2026-06-03T11:20:00',
    createdAt: '2026-06-02T14:00:00',
    hotLead: true,
    herdSize: '120 cabeças',
    location: 'Dourados, MS',
    score: 71,
    qualification: { nome: true, dor: true, experiencia: true, rebanho: true, disponibilidade: false, budget: false },
    notes: '',
    timeline: [],
  },
  {
    id: 'l-005',
    name: 'João Batista',
    phone: '(62) 98455-6677',
    email: 'joao.batista@fazenda.com',
    status: 'handoff',
    product: 'mercado_futuro',
    origin: 'indicacao',
    aiStatus: 'handoff',
    lastContact: '2026-06-03T14:22:00',
    createdAt: '2026-05-20T10:00:00',
    hotLead: false,
    herdSize: '600 cabeças',
    location: 'Goiânia, GO',
    score: 95,
    qualification: { nome: true, dor: true, experiencia: true, rebanho: true, disponibilidade: true, budget: true },
    notes: 'Indicação do Fabiano. Prioridade alta.',
    stageHistory: [
      { id: 'sh-5', from: 'novo', to: 'em_atendimento', changedBy: 'ia', timestamp: '2026-05-20T10:05:00' },
      { id: 'sh-6', from: 'em_atendimento', to: 'qualificado', changedBy: 'ia', timestamp: '2026-05-25T16:00:00' },
      { id: 'sh-7', from: 'qualificado', to: 'handoff', changedBy: 'humano', author: 'Cinthia', timestamp: '2026-06-03T14:22:00' },
    ],
    timeline: [],
  },
  {
    id: 'l-006',
    name: 'Fazenda Boa Vista',
    phone: '(66) 99123-8899',
    email: 'boavista@agro.com',
    status: 'qualificado',
    product: 'texas_pnm',
    origin: 'rd_station',
    aiStatus: 'pausada',
    lastContact: '2026-06-03T13:58:00',
    createdAt: '2026-04-15T08:00:00',
    hotLead: false,
    coldWindow: 30,
    herdSize: '320 cabeças',
    location: 'Sinop, MT',
    score: 90,
    qualification: { nome: true, dor: true, experiencia: true, rebanho: true, disponibilidade: true, budget: true },
    notes: 'Lead reativado do RD Station.',
    stageHistory: [
      { id: 'sh-8', from: 'perdido', to: 'em_atendimento', changedBy: 'ia', timestamp: '2026-06-01T08:00:00' },
      { id: 'sh-9', from: 'em_atendimento', to: 'qualificado', changedBy: 'ia', timestamp: '2026-06-03T13:58:00' },
    ],
    timeline: [],
  },
  {
    id: 'l-007',
    name: 'Carlos Eduardo',
    phone: '(64) 99788-3344',
    email: '',
    status: 'novo',
    product: 'mentoria_grafica',
    origin: 'instagram',
    aiStatus: 'ativa',
    lastContact: '2026-06-03T13:41:00',
    createdAt: '2026-06-03T13:40:00',
    hotLead: false,
    location: 'Itumbiara, GO',
    score: 20,
    qualification: { nome: false, dor: false, experiencia: false, rebanho: false, disponibilidade: false, budget: false },
    notes: '',
    timeline: [],
  },
  {
    id: 'l-008',
    name: 'Pedro Henrique',
    phone: '(62) 98677-1122',
    email: 'pedro.h@email.com',
    status: 'em_atendimento',
    product: 'mercado_futuro',
    origin: 'rd_station',
    aiStatus: 'ativa',
    lastContact: '2026-06-03T12:15:00',
    createdAt: '2026-03-01T09:00:00',
    hotLead: false,
    coldWindow: 60,
    herdSize: '200 cabeças',
    location: 'Anápolis, GO',
    score: 45,
    qualification: { nome: true, dor: true, experiencia: false, rebanho: true, disponibilidade: false, budget: false },
    notes: 'Reaquecimento 60 dias em andamento.',
    timeline: [],
  },
  {
    id: 'l-009',
    name: 'Silvia Campos',
    phone: '(65) 99221-5566',
    email: 'silvia.campos@email.com',
    status: 'fechado',
    product: 'geti',
    origin: 'whatsapp',
    aiStatus: 'pausada',
    lastContact: '2026-06-03T11:30:00',
    createdAt: '2026-05-10T15:00:00',
    hotLead: false,
    location: 'Campo Grande, MS',
    score: 100,
    qualification: { nome: true, dor: true, experiencia: true, rebanho: false, disponibilidade: true, budget: true },
    notes: 'Cliente GETI — turma jun/2026 confirmada.',
    timeline: [],
  },
  {
    id: 'l-010',
    name: 'Agropecuária Três Irmãos',
    phone: '(64) 99333-7788',
    email: 'tresirmaos@agro.com',
    status: 'em_atendimento',
    product: 'texas_pnm',
    origin: 'whatsapp',
    aiStatus: 'ativa',
    lastContact: '2026-06-03T10:55:00',
    createdAt: '2026-06-03T10:50:00',
    hotLead: false,
    herdSize: '1.200 cabeças',
    location: 'Rio Verde, GO',
    score: 55,
    qualification: { nome: true, dor: true, experiencia: true, rebanho: true, disponibilidade: false, budget: false },
    notes: '',
    timeline: [],
  },
  {
    id: 'l-011',
    name: 'Lucas Ferreira',
    phone: '(62) 98199-0033',
    email: 'lucas.f@email.com',
    status: 'perdido',
    product: 'mentoria_grafica',
    origin: 'instagram',
    aiStatus: 'pausada',
    lastContact: '2026-05-15T09:00:00',
    createdAt: '2026-04-01T11:00:00',
    hotLead: false,
    coldWindow: 90,
    location: 'Catalão, GO',
    score: 30,
    qualification: { nome: true, dor: false, experiencia: false, rebanho: false, disponibilidade: false, budget: false },
    notes: 'Sem resposta após 3 tentativas de reaquecimento.',
    timeline: [],
  },
  {
    id: 'l-012',
    name: 'Hélio Motta',
    phone: '(66) 99444-5566',
    email: 'helio.motta@fazenda.com',
    status: 'novo',
    product: 'mercado_futuro',
    origin: 'formulario',
    aiStatus: 'ativa',
    lastContact: '2026-06-03T09:30:00',
    createdAt: '2026-06-03T09:28:00',
    hotLead: false,
    herdSize: '750 cabeças',
    location: 'Lucas do Rio Verde, MT',
    score: 15,
    qualification: { nome: true, dor: false, experiencia: false, rebanho: true, disponibilidade: false, budget: false },
    notes: '',
    timeline: [],
  },
]

export const mockCampaigns: Campaign[] = [
  {
    id: 'c-1',
    name: 'Reaquecimento 30d — Base RD Station',
    segment: 'Leads frios 30 dias · Mercado Futuro',
    sentAt: '2026-06-02T09:00:00',
    messages: 89,
    openRate: 68.5,
    responseRate: 22.4,
    status: 'concluida',
  },
  {
    id: 'c-2',
    name: 'Lançamento Turma GETI Jul/2026',
    segment: 'Qualificados + Handoff · GETI',
    sentAt: '2026-06-05T08:00:00',
    messages: 45,
    openRate: 0,
    responseRate: 0,
    status: 'agendada',
  },
  {
    id: 'c-3',
    name: 'Live Mercado Boi — Convite VIP',
    segment: 'Grupo VIP + Instagram @pnm.trading',
    sentAt: '2026-05-28T18:00:00',
    messages: 120,
    openRate: 82.1,
    responseRate: 41.7,
    status: 'concluida',
  },
]

export function formatDate(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function formatDateTime(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 60) return `há ${Math.max(minutes, 1)} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `há ${hours} h`
  const days = Math.floor(hours / 24)
  return `há ${days} d`
}

export function getLeadById(id: string): Lead | undefined {
  return mockLeads.find((lead) => lead.id === id)
}

export const reactivationSamples: Record<
  30 | 60 | 90,
  { id: string; name: string; product: ProductTrail; lastContact: string; location?: string }[]
> = {
  30: [
    { id: 'r-30-1', name: 'Fazenda Boa Vista', product: 'texas_pnm', lastContact: '2026-05-04T08:00:00', location: 'Sinop, MT' },
    { id: 'r-30-2', name: 'Agro Nova Era', product: 'mercado_futuro', lastContact: '2026-05-02T14:00:00', location: 'Rio Verde, GO' },
    { id: 'r-30-3', name: 'Márcio Alves', product: 'mentoria_grafica', lastContact: '2026-05-01T10:30:00', location: 'Goiânia, GO' },
    { id: 'r-30-4', name: 'Cooperativa Vale Verde', product: 'geti', lastContact: '2026-04-28T16:00:00', location: 'Dourados, MS' },
  ],
  60: [
    { id: 'r-60-1', name: 'Pedro Henrique', product: 'mercado_futuro', lastContact: '2026-04-04T09:00:00', location: 'Anápolis, GO' },
    { id: 'r-60-2', name: 'Fazenda São José', product: 'texas_pnm', lastContact: '2026-04-01T11:00:00', location: 'Jataí, GO' },
    { id: 'r-60-3', name: 'Renata Souza', product: 'mentoria_grafica', lastContact: '2026-03-28T08:00:00', location: 'Campo Grande, MS' },
  ],
  90: [
    { id: 'r-90-1', name: 'Lucas Ferreira', product: 'mentoria_grafica', lastContact: '2026-03-05T09:00:00', location: 'Catalão, GO' },
    { id: 'r-90-2', name: 'Grupo Agro Sul', product: 'mercado_futuro', lastContact: '2026-03-01T14:00:00', location: 'Lucas do Rio Verde, MT' },
    { id: 'r-90-3', name: 'Eduardo Prado', product: 'geti', lastContact: '2026-02-20T10:00:00', location: 'Cuiabá, MT' },
    { id: 'r-90-4', name: 'Fazenda Esperança', product: 'texas_pnm', lastContact: '2026-02-15T16:30:00', location: 'Itumbiara, GO' },
  ],
}

export function getLeadsByColdWindow(days: 30 | 60 | 90): Lead[] {
  const fromMock = mockLeads.filter((lead) => lead.coldWindow === days)
  const samples = reactivationSamples[days]
  const sampleAsLeads: Lead[] = samples
    .filter((s) => !fromMock.some((l) => l.id === s.id))
    .map((s) => ({
      id: s.id,
      name: s.name,
      phone: '',
      email: '',
      status: 'em_atendimento' as LeadStatus,
      product: s.product,
      origin: 'rd_station' as const,
      aiStatus: 'ativa' as const,
      lastContact: s.lastContact,
      createdAt: s.lastContact,
      hotLead: false,
      coldWindow: days,
      location: s.location ?? 'Base RD Station',
      score: 0,
      qualification: {
        nome: true,
        dor: false,
        experiencia: false,
        rebanho: false,
        disponibilidade: false,
        budget: false,
      },
      notes: '',
      timeline: [],
    }))
  return [...fromMock, ...sampleAsLeads]
}

export function getLeadsByStatus(status: LeadStatus): Lead[] {
  return mockLeads.filter((lead) => lead.status === status)
}
