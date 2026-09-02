import { useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, HeartHandshake, Menu, X } from 'lucide-react';
import logo from '@assets/VgZcFtp8_200x200_1788380520593.jpg';

interface LayoutProps { children: ReactNode; minimal?: boolean; }

export function Layout({ children, minimal = false }: LayoutProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const links = [
    { to: '/pesquisa', label: 'Explorar cuidados' },
    { to: '/feedbacks', label: 'Sua opinião' },
  ];
  return (
    <div className="min-h-[100dvh] bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
        <div className="shell flex h-[72px] items-center justify-between">
          <Link to="/" className="flex items-center gap-3" data-testid="link-logo">
            <span className="grid size-10 place-items-center rounded-xl bg-primary text-accent"><HeartHandshake size={22} strokeWidth={2.5} /></span>
            <span className="leading-none"><strong className="block font-serif text-lg tracking-[-.04em]">fortclinic</strong><small className="font-mono text-[9px] uppercase tracking-[.16em] text-muted-foreground">cuidar é coletivo</small></span>
          </Link>
          {!minimal && <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
            {links.map((link) => <NavLink key={link.to} to={link.to} className={({ isActive }) => `text-sm font-semibold transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`} data-testid={`link-nav-${link.label}`}>{link.label}</NavLink>)}
            <Link to="/account/login" className="rounded-full border border-primary/20 px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-secondary" data-testid="link-login">Entrar</Link>
          </nav>}
          {!minimal && <button type="button" className="rounded-lg p-2 text-primary md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} data-testid="button-menu">{open ? <X /> : <Menu />}</button>}
        </div>
        {open && !minimal && <nav className="shell flex flex-col gap-1 border-t border-border py-3 md:hidden" aria-label="Menu móvel">
          {links.map((link) => <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className={`rounded-lg px-3 py-3 text-sm font-semibold ${location.pathname === link.to ? 'bg-secondary text-primary' : 'text-foreground'}`} data-testid={`link-mobile-${link.label}`}>{link.label}</Link>)}
          <Link to="/account/login" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-primary" data-testid="link-mobile-login">Entrar na conta</Link>
        </nav>}
      </header>
      <main>{children}</main>
      {!minimal && <footer className="mt-20 border-t border-border bg-primary text-primary-foreground">
        <div className="shell grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div><div className="mb-3 flex items-center gap-2"><HeartHandshake className="text-accent" size={20} /><strong className="font-serif text-xl">fortclinic</strong></div><p className="max-w-xs text-sm leading-6 text-primary-foreground/70">Uma rede de cuidado feita em Fortaleza, para quem vive aqui.</p></div>
          <div><p className="eyebrow text-accent">Acesso rápido</p><div className="mt-4 grid gap-3 text-sm text-primary-foreground/75"><Link to="/busca" data-testid="link-footer-busca">Buscar atendimento</Link><Link to="/account/cadastro" data-testid="link-footer-cadastro">Oferecer atendimento</Link><Link to="/feedbacks" data-testid="link-footer-feedback">Enviar feedback</Link></div></div>
          <div><p className="eyebrow text-accent">Transparência</p><div className="mt-4 grid gap-3 text-sm text-primary-foreground/75"><Link to="/doc/politicas-de-uso" data-testid="link-footer-termos">Termos de uso</Link><Link to="/doc/politicas-de-privacidade" data-testid="link-footer-privacidade">Privacidade</Link></div></div>
        </div>
        <div className="shell flex flex-col gap-2 border-t border-primary-foreground/10 py-5 text-xs text-primary-foreground/50 sm:flex-row sm:justify-between"><span>Fortaleza, Ceará · 2025</span><span>Feito para aproximar cuidado e comunidade.</span></div>
      </footer>}
    </div>
  );
}

export function PageIntro({ eyebrow, title, description, children }: { eyebrow: string; title: string; description?: string; children?: ReactNode }) {
  return <section className="shell pt-12 md:pt-20"><p className="eyebrow text-secondary-foreground">{eyebrow}</p><h1 className="mt-3 max-w-3xl font-serif text-4xl font-extrabold leading-[1.06] tracking-[-.055em] md:text-6xl">{title}</h1>{description && <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">{description}</p>}{children}</section>;
}

export function ButtonLink({ to, children, secondary = false }: { to: string; children: ReactNode; secondary?: boolean }) {
  return <Link to={to} className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 ${secondary ? 'border border-primary/20 bg-card text-primary hover:bg-secondary' : 'bg-primary text-primary-foreground hover:shadow-lg'}`} data-testid={`link-cta-${to.replaceAll('/', '-').replaceAll('?', '')}`}><span>{children}</span><ArrowRight size={16} /></Link>;
}

export function StatusMessage({ title, detail, action }: { title: string; detail: string; action?: ReactNode }) {
  return <div className="rounded-2xl border border-border bg-card p-8 text-center"><div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-secondary text-secondary-foreground"><HeartHandshake size={22} /></div><h2 className="font-serif text-xl font-bold">{title}</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">{detail}</p>{action && <div className="mt-5">{action}</div>}</div>;
}