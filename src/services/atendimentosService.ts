import type { Atendimento } from '@/types';

let atendimentos: Atendimento[] = [
  { id: 'a1', organizacaoId: 'ponte-escuta', data: '2025-06-18', horario: '18:00', status: 'reservado', modalidade: 'online', nomePessoa: 'Marina S.' },
  { id: 'a2', organizacaoId: 'defesa-cidadania', data: '2025-06-19', horario: '14:00', status: 'reservado', modalidade: 'presencial', nomePessoa: 'Rafael M.' },
  { id: 'a3', organizacaoId: 'clinica-bem-viver', data: '2025-06-20', horario: '08:30', status: 'concluido', modalidade: 'presencial', nomePessoa: 'Joana A.' },
];

export const atendimentosService = {
  async listar(): Promise<Atendimento[]> {
    await new Promise((resolve) => setTimeout(resolve, 180));
    return [...atendimentos];
  },
  async agendar(dados: Omit<Atendimento, 'id' | 'status'>): Promise<Atendimento> {
    // O agendamento ficará pronto para POST /api/atendimentos quando o backend existir.
    const novo: Atendimento = { ...dados, id: `at-${Date.now()}`, status: 'reservado' };
    atendimentos = [novo, ...atendimentos];
    return novo;
  },
  async atualizarStatus(id: string, status: Atendimento['status']): Promise<void> {
    atendimentos = atendimentos.map((item) => item.id === id ? { ...item, status } : item);
  },
};