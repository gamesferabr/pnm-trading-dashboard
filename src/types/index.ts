export type LeadStatus =
  | 'novo'
  | 'em_atendimento'
  | 'qualificado'
  | 'handoff'
  | 'fechado'
  | 'perdido'

export type ProductTrail =
  | 'mentoria_grafica'
  | 'texas_pnm'
  | 'mercado_futuro'
  | 'geti'

export type AiStatus = 'ativa' | 'pausada' | 'handoff'

export type LeadOrigin = 'instagram' | 'whatsapp' | 'formulario' | 'indicacao' | 'rd_station'

export interface TimelineEvent {
  id: string
  type: 'ia' | 'lead' | 'humano' | 'sistema' | 'nota'
  message: string
  timestamp: string
  author?: string
}

export interface QualificationChecklist {
  nome: boolean
  dor: boolean
  experiencia: boolean
  rebanho: boolean
  disponibilidade: boolean
  budget: boolean
}

export interface Lead {
  id: string
  name: string
  phone: string
  email: string
  status: LeadStatus
  product: ProductTrail
  origin: LeadOrigin
  aiStatus: AiStatus
  lastContact: string
  createdAt: string
  hotLead: boolean
  coldWindow?: 30 | 60 | 90
  herdSize?: string
  location: string
  score: number
  qualification: QualificationChecklist
  notes: string
  timeline: TimelineEvent[]
}

export interface ActivityItem {
  id: string
  type: 'conversa' | 'handoff' | 'qualificado' | 'fechado' | 'reaquecimento'
  leadName: string
  description: string
  timestamp: string
}

export interface Campaign {
  id: string
  name: string
  segment: string
  sentAt: string
  messages: number
  openRate: number
  responseRate: number
  status: 'concluida' | 'agendada' | 'rascunho'
}
