import { Link } from 'react-router-dom';

export default function NotFound() {
  return <div className="grid min-h-[100dvh] place-items-center bg-background p-6 text-center"><div><p className="eyebrow text-secondary-foreground">Erro 404</p><h1 className="mt-3 font-serif text-5xl font-extrabold tracking-[-.06em]">Esse caminho não existe.</h1><Link to="/" className="mt-7 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground" data-testid="link-page-not-found-home">Voltar ao início</Link></div></div>;
}