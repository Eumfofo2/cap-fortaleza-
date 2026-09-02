export type Area = 'psicologia' | 'advocacia' | 'medicina' | 'outro';
export type Modalidade = 'online' | 'presencial' | 'ambos';
export type DiaSemana = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo';
export type AtendimentoStatus = 'disponivel' | 'reservado' | 'concluido' | 'cancelado';

export interface HorarioDisponivel {
  id: string;
  diaSemana: DiaSemana;
  horaInicio: string;
  horaFim: string;
  vagas: number;
}

export interface Organizacao {
  id: string;
  nome: string;
  area: Area;
  modalidade: Modalidade;
  descricao: string;
  contatoWhatsApp: string;
  gratuito: boolean;
  regiao: string;
  cidade: string;
  atendimento: string;
  horariosDisponiveis: HorarioDisponivel[];
  destaque?: boolean;
  iniciais: string;
  cor: string;
  tags: string[];
}

export interface Atendimento {
  id: string;
  organizacaoId: string;
  usuarioId?: string;
  data: string;
  horario: string;
  status: AtendimentoStatus;
  modalidade: Exclude<Modalidade, 'ambos'>;
  nomePessoa?: string;
}

export interface Usuario {
  id: string;
  nome?: string;
  contato?: string;
  email?: string;
  tipo: 'cliente' | 'profissional';
}

export interface FiltrosBusca {
  area?: Area;
  modalidade?: Exclude<Modalidade, 'ambos'>;
  regiao?: string;
  gratuito?: boolean;
}

export type OrganizacaoInput = Pick<Organizacao, 'nome' | 'area' | 'modalidade' | 'descricao' | 'regiao'>;
export type OrganizacaoUpdate = Partial<OrganizacaoInput>;

export interface AtendimentoFiltros {
  organizacaoId?: string;
  usuarioId?: string;
  status?: AtendimentoStatus;
}

export type AtendimentoInput = Omit<Atendimento, 'id' | 'status'>;
export type AtendimentoUpdate = Partial<Pick<Atendimento, 'status' | 'data' | 'horario' | 'modalidade'>>;

export interface DashboardDados {
  agendaSemana: Atendimento[];
  proximosAtendimentos: Atendimento[];
  historico: Atendimento[];
}

export interface FeedbackInput {
  mensagem: string;
  nota?: number;
}

export interface Documento {
  titulo: string;
  atualizadoEm: string;
  secoes: Array<{ titulo: string; texto: string }>;
}