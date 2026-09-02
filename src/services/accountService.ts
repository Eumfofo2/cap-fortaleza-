import type { Usuario } from '@/types';

const chaveUsuario = 'fortclinic.usuario';
export const accountService = {
  getUsuario(): Usuario | null {
    const salvo = localStorage.getItem(chaveUsuario);
    if (!salvo) return null;
    try { return JSON.parse(salvo) as Usuario; } catch { return null; }
  },
  async login(email: string): Promise<Usuario> {
    const usuario: Usuario = { id: 'u-demo', nome: 'Marina Souza', email, tipo: 'cliente' };
    localStorage.setItem(chaveUsuario, JSON.stringify(usuario));
    return usuario;
  },
  async cadastro(nome: string, email: string, tipo: Usuario['tipo']): Promise<Usuario> {
    const usuario: Usuario = { id: `u-${Date.now()}`, nome, email, tipo };
    localStorage.setItem(chaveUsuario, JSON.stringify(usuario));
    return usuario;
  },
  logout(): void { localStorage.removeItem(chaveUsuario); },
};