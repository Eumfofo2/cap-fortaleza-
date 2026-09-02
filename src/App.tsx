import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { HomePage, PesquisaPage, BuscaPage, PerfilPage } from '@/pages/public';
import { CadastroPage, ConfigPage, DashboardPage, FeedbackPage, LoginPage, ManagePage, OnboardingPage, ProfessionalCreatePage } from '@/pages/account';
import { DocumentPage } from '@/pages/docs';

function NotFoundPage() {
  return <div className="grid min-h-[100dvh] place-items-center bg-background p-6 text-center"><div><p className="eyebrow text-secondary-foreground">Erro 404</p><h1 className="mt-3 font-serif text-5xl font-extrabold tracking-[-.06em]">Esse caminho não existe.</h1><p className="mx-auto mt-4 max-w-md text-muted-foreground">Volte ao início para encontrar uma nova direção.</p><Link to="/" className="mt-7 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground" data-testid="link-not-found-home">Voltar ao início</Link></div></div>;
}

function App() {
  return <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/pesquisa" element={<PesquisaPage />} />
    <Route path="/busca" element={<BuscaPage />} />
    <Route path="/perfil/:id" element={<PerfilPage />} />
    <Route path="/account/login" element={<LoginPage />} />
    <Route path="/account/cadastro" element={<CadastroPage />} />
    <Route path="/account/comecar-perfil" element={<OnboardingPage />} />
    <Route path="/account/profissional/criar" element={<ProfessionalCreatePage />} />
    <Route path="/account/profissional/gerenciar" element={<ManagePage />} />
    <Route path="/account/config/:secao" element={<ConfigPage />} />
    <Route path="/account/dashboard/:tipo/:secao" element={<DashboardPage />} />
    <Route path="/doc/politicas-de-uso" element={<DocumentPage />} />
    <Route path="/doc/politicas-de-privacidade" element={<DocumentPage privacy />} />
    <Route path="/feedbacks" element={<FeedbackPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes></BrowserRouter>;
}

export default App;