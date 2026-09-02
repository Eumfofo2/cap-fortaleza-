import { type ChangeEvent } from 'react';
import { Check, ChevronDown, Clock3, MapPin, MessageCircle, Monitor, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Organizacao } from '@/types';
import { horarioLabel } from '@/services/organizacoesService';

export function Field({ label, hint, ...props }: { label: string; hint?: string; name?: string; type?: string; placeholder?: string; value?: string; onChange?: (event: ChangeEvent<HTMLInputElement>) => void }) {
  return <label className="grid gap-2 text-sm font-bold text-foreground">{label}<input {...props} data-testid={`input-${props.name ?? 'field'}`} className="h-12 rounded-xl border border-input bg-card px-4 font-normal outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring focus:ring-4 focus:ring-ring/10" />{hint && <span className="-mt-1 text-xs font-normal text-muted-foreground">{hint}</span>}</label>;
}

export function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Array<{ value: string; label: string }> }) {
  return <label className="relative grid gap-2 text-sm font-bold">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="h-12 appearance-none rounded-xl border border-input bg-card px-4 pr-10 font-normal outline-none focus:border-ring focus:ring-4 focus:ring-ring/10" data-testid={`select-${label.toLowerCase().replaceAll(' ', '-')}`}><option value="">Todos</option>{options.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select><ChevronDown size={16} className="pointer-events-none absolute bottom-4 right-4 text-muted-foreground" /></label>;
}

export function OrganizationCard({ item, compact = false }: { item: Organizacao; compact?: boolean }) {
  return <article className={`lift group rounded-2xl border border-border bg-card p-5 ${compact ? '' : 'md:p-6'}`} data-testid={`card-organizacao-${item.id}`}>
    <div className="flex items-start gap-4"><div className="grid size-12 shrink-0 place-items-center rounded-2xl text-sm font-extrabold text-white" style={{ backgroundColor: item.cor }}>{item.iniciais}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><Link to={`/perfil/${item.id}`} className="font-serif text-lg font-extrabold tracking-[-.03em] group-hover:text-secondary-foreground" data-testid={`link-profile-${item.id}`}>{item.nome}</Link>{item.gratuito && <span className="rounded-full bg-accent px-2 py-1 text-[10px] font-bold text-accent-foreground">Gratuito</span>}</div><p className="mt-1 text-xs font-semibold capitalize text-muted-foreground">{item.area} · {item.modalidade === 'ambos' ? 'online e presencial' : item.modalidade}</p></div></div>
    <p className="mt-5 line-clamp-2 text-sm leading-6 text-muted-foreground">{item.descricao}</p>
    <div className="mt-5 flex flex-wrap gap-2">{item.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">{tag}</span>)}</div>
    <div className="mt-5 grid gap-2 border-t border-border pt-4 text-xs font-semibold text-muted-foreground sm:grid-cols-2"><span className="flex items-center gap-2"><MapPin size={14} className="text-secondary-foreground" />{item.regiao}</span><span className="flex items-center gap-2"><Clock3 size={14} className="text-secondary-foreground" />Próximo horário disponível</span></div>
  </article>;
}

export function ModalidadeIcon({ type }: { type: string }) { return type === 'online' ? <Monitor size={16} /> : type === 'presencial' ? <MapPin size={16} /> : <UsersRound size={16} />; }
export function WhatsAppButton({ phone, label = 'Conversar pelo WhatsApp' }: { phone: string; label?: string }) {
  return <a href={`https://wa.me/${phone}?text=${encodeURIComponent('Olá! Encontrei seu perfil no FortClinic e gostaria de saber mais sobre o atendimento.')}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#238a6f] px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg" data-testid="link-whatsapp"><MessageCircle size={17} />{label}</a>;
}
export function Slot({ day, start, end, available, onClick }: { day: string; start: string; end: string; available: number; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="flex min-w-[145px] flex-col gap-1 rounded-xl border border-border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-secondary-foreground hover:shadow-md" data-testid={`button-slot-${day}-${start}`}><span className="text-xs font-bold text-secondary-foreground">{horarioLabel[day as keyof typeof horarioLabel]}</span><span className="font-mono text-sm font-bold">{start} — {end}</span><span className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground"><Check size={12} />{available} vagas</span></button>;
}