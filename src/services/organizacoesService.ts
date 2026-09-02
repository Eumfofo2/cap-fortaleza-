import type {
  DashboardDados,
  FiltrosBusca,
  HorarioDisponivel,
  Organizacao,
  OrganizacaoInput,
  OrganizacaoUpdate,
} from '@/types';
import { apiRequest, isMockMode } from '@/services/httpClient';

const organizacoes: Organizacao[] = [
  {
    id: 'ponte-escuta', nome: 'Ponte de Escuta', area: 'psicologia', modalidade: 'online',
    descricao: 'Acolhimento psicológico com escuta cuidadosa e acessível para jovens e adultos. Você não precisa atravessar um momento difícil sozinho.',
    contatoWhatsApp: '5585998112233', gratuito: true, regiao: 'Aldeota', cidade: 'Fortaleza, CE',
    atendimento: 'Atendimento por videochamada', iniciais: 'PE', cor: '#df7460', destaque: true, tags: ['Ansiedade', 'Luto', 'Jovens'],
    horariosDisponiveis: [{ id: 'p1', diaSemana: 'segunda', horaInicio: '18:00', horaFim: '20:00', vagas: 3 }, { id: 'p2', diaSemana: 'quarta', horaInicio: '09:00', horaFim: '12:00', vagas: 2 }],
  },
  {
    id: 'defesa-cidadania', nome: 'Defesa & Cidadania', area: 'advocacia', modalidade: 'presencial',
    descricao: 'Orientação jurídica gratuita para direitos de família, moradia, trabalho e acesso a serviços públicos.',
    contatoWhatsApp: '5585998445566', gratuito: true, regiao: 'Centro', cidade: 'Fortaleza, CE',
    atendimento: 'Rua Barão do Rio Branco, 1180', iniciais: 'DC', cor: '#2e817b', destaque: true, tags: ['Família', 'Moradia', 'Trabalho'],
    horariosDisponiveis: [{ id: 'd1', diaSemana: 'terca', horaInicio: '13:00', horaFim: '17:00', vagas: 5 }, { id: 'd2', diaSemana: 'quinta', horaInicio: '09:00', horaFim: '12:00', vagas: 4 }],
  },
  {
    id: 'clinica-bem-viver', nome: 'Clínica Bem Viver', area: 'medicina', modalidade: 'ambos',
    descricao: 'Cuidado integral em clínica geral, com profissionais que entendem o cotidiano e a saúde da nossa comunidade.',
    contatoWhatsApp: '5585998776655', gratuito: false, regiao: 'Messejana', cidade: 'Fortaleza, CE',
    atendimento: 'Online ou Av. Frei Cirilo, 4100', iniciais: 'BV', cor: '#d29b2f', tags: ['Clínica geral', 'Família', 'Prevenção'],
    horariosDisponiveis: [{ id: 'v1', diaSemana: 'segunda', horaInicio: '08:00', horaFim: '11:00', vagas: 4 }, { id: 'v2', diaSemana: 'sexta', horaInicio: '14:00', horaFim: '18:00', vagas: 3 }],
  },
  {
    id: 'ciranda-mulher', nome: 'Ciranda Mulher', area: 'psicologia', modalidade: 'presencial',
    descricao: 'Rede de apoio para mulheres de Fortaleza, com rodas de conversa e atendimento psicológico humanizado.',
    contatoWhatsApp: '5585988667744', gratuito: true, regiao: 'Bom Jardim', cidade: 'Fortaleza, CE',
    atendimento: 'Rua Edson Queiroz, 72', iniciais: 'CM', cor: '#b97684', tags: ['Mulheres', 'Roda de conversa', 'Apoio'],
    horariosDisponiveis: [{ id: 'c1', diaSemana: 'sabado', horaInicio: '09:00', horaFim: '12:00', vagas: 6 }],
  },
  {
    id: 'nucleo-direitos', nome: 'Núcleo Direitos em Rede', area: 'advocacia', modalidade: 'online',
    descricao: 'Consultas e encaminhamentos jurídicos por chamada de vídeo, com linguagem simples e respeito à sua história.',
    contatoWhatsApp: '5585998119900', gratuito: true, regiao: 'Parangaba', cidade: 'Fortaleza, CE',
    atendimento: 'Atendimento por videochamada', iniciais: 'DR', cor: '#6076a8', tags: ['Consumidor', 'Família', 'Orientação'],
    horariosDisponiveis: [{ id: 'n1', diaSemana: 'quarta', horaInicio: '14:00', horaFim: '17:00', vagas: 3 }],
  },
];

function mockListar(filtros: FiltrosBusca): Organizacao[] {
  return organizacoes.filter((item) => {
    const matchesArea = !filtros.area || item.area === filtros.area;
    const matchesModalidade = !filtros.modalidade || item.modalidade === filtros.modalidade || item.modalidade === 'ambos';
    const matchesRegiao = !filtros.regiao || item.regiao === filtros.regiao;
    const matchesGratis = filtros.gratuito === undefined || item.gratuito === filtros.gratuito;
    return matchesArea && matchesModalidade && matchesRegiao && matchesGratis;
  });
}

function queryString(filtros: FiltrosBusca): string {
  const query = new URLSearchParams();
  if (filtros.area) query.set('area', filtros.area);
  if (filtros.modalidade) query.set('modalidade', filtros.modalidade);
  if (filtros.regiao) query.set('regiao', filtros.regiao);
  if (filtros.gratuito !== undefined) query.set('gratuito', String(filtros.gratuito));
  const value = query.toString();
  return value ? `?${value}` : '';
}

export const organizacoesService = {
  async listar(filtros: FiltrosBusca = {}): Promise<Organizacao[]> {
    if (isMockMode) {
      await new Promise((resolve) => setTimeout(resolve, 220));
      return mockListar(filtros);
    }
    return apiRequest<Organizacao[]>(`/organizacoes${queryString(filtros)}`);
  },

  async buscarPorId(id: string): Promise<Organizacao> {
    if (isMockMode) {
      await new Promise((resolve) => setTimeout(resolve, 180));
      const organizacao = organizacoes.find((item) => item.id === id);
      if (!organizacao) throw new Error('Organização não encontrada.');
      return organizacao;
    }
    return apiRequest<Organizacao>(`/organizacoes/${encodeURIComponent(id)}`);
  },

  async listarHorarios(id: string): Promise<HorarioDisponivel[]> {
    if (isMockMode) return (await this.buscarPorId(id)).horariosDisponiveis;
    return apiRequest<HorarioDisponivel[]>(`/organizacoes/${encodeURIComponent(id)}/horarios`);
  },

  async criar(dados: OrganizacaoInput): Promise<Organizacao> {
    if (!isMockMode) return apiRequest<Organizacao>('/organizacoes', { method: 'POST', body: dados });
    const nova: Organizacao = {
      ...dados, id: `perfil-${Date.now()}`, contatoWhatsApp: '5585990000000', gratuito: false,
      cidade: 'Fortaleza, CE', atendimento: 'A definir', iniciais: dados.nome.slice(0, 2).toUpperCase(),
      cor: '#2e817b', tags: [], horariosDisponiveis: [],
    };
    organizacoes.push(nova);
    return nova;
  },

  async atualizar(id: string, dados: OrganizacaoUpdate): Promise<Organizacao> {
    if (!isMockMode) return apiRequest<Organizacao>(`/organizacoes/${encodeURIComponent(id)}`, { method: 'PUT', body: dados });
    const index = organizacoes.findIndex((item) => item.id === id);
    if (index < 0) throw new Error('Organização não encontrada.');
    organizacoes[index] = { ...organizacoes[index], ...dados };
    return organizacoes[index];
  },

  async remover(id: string): Promise<void> {
    if (!isMockMode) {
      await apiRequest<void>(`/organizacoes/${encodeURIComponent(id)}`, { method: 'DELETE' });
      return;
    }
    const index = organizacoes.findIndex((item) => item.id === id);
    if (index < 0) throw new Error('Organização não encontrada.');
    organizacoes.splice(index, 1);
  },

  async dashboard(id: string, tipo = '', secao = ''): Promise<DashboardDados> {
    if (isMockMode) {
      const items = await import('@/services/atendimentosService').then(({ atendimentosService: service }) => service.listar({ organizacaoId: id }));
      return {
        agendaSemana: items,
        proximosAtendimentos: items.filter((item) => item.status === 'reservado'),
        historico: items.filter((item) => item.status === 'concluido'),
      };
    }
    const query = new URLSearchParams();
    if (tipo) query.set('tipo', tipo);
    if (secao) query.set('secao', secao);
    const suffix = query.toString() ? `?${query.toString()}` : '';
    return apiRequest<DashboardDados>(`/organizacoes/${encodeURIComponent(id)}/dashboard${suffix}`);
  },
};

export const horarioLabel: Record<HorarioDisponivel['diaSemana'], string> = {
  segunda: 'Segunda', terca: 'Terça', quarta: 'Quarta', quinta: 'Quinta',
  sexta: 'Sexta', sabado: 'Sábado', domingo: 'Domingo',
};

export function proximoHorarioLabel(horarios: HorarioDisponivel[]): string {
  const disponivel = horarios.find((horario) => horario.vagas > 0);
  return disponivel ? `${horarioLabel[disponivel.diaSemana]} · ${disponivel.horaInicio}` : 'Sem horário disponível';
}