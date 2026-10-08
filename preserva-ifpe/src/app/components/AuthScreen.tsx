import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { login, registerAccount, type Role, type Session } from '../lib/schoolDb';

interface AuthScreenProps {
  onLogin: (session: Session) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>('aluno');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');
    if (isLogin) {
      const result = login(email, password);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      onLogin(result.session);
      return;
    }
    const result = registerAccount({ name, email, password, role });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onLogin(result.session);
  };

  const fill = (nextEmail: string) => {
    setIsLogin(true);
    setEmail(nextEmail);
    setPassword('123456');
    setError('');
    setInfo('Conta de demonstração preenchida. Senha: 123456');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-[#0047AB] to-secondary flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <div className="bg-white dark:bg-card rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-center">
            <div className="w-16 h-16 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center" aria-hidden="true">
              <span className="text-primary font-bold text-3xl">P</span>
            </div>
            <h1 className="text-white font-bold text-2xl mb-1">Preserva IFPE</h1>
            <p className="text-white/90 text-sm">Acesso por perfil: aluno, responsável ou administração</p>
          </div>

          <div className="p-8">
            <div className="flex mb-6 bg-muted rounded-lg p-1" role="tablist" aria-label="Tipo de acesso">
              <button type="button" onClick={() => { setIsLogin(true); setError(''); }} className={`flex-1 py-2 rounded-md font-medium ${isLogin ? 'bg-white dark:bg-card text-primary shadow-sm' : 'text-muted-foreground'}`}>Entrar</button>
              <button type="button" onClick={() => { setIsLogin(false); setError(''); }} className={`flex-1 py-2 rounded-md font-medium ${!isLogin ? 'bg-white dark:bg-card text-primary shadow-sm' : 'text-muted-foreground'}`}>Cadastrar</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
              {info && <p role="status" className="rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-800">{info}</p>}

              {!isLogin && (
                <>
                  <label className="block text-sm font-medium">Nome completo
                    <input required value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 w-full rounded-lg border border-input bg-input-background px-4 py-2.5" />
                  </label>
                  <label className="block text-sm font-medium">Perfil
                    <select value={role} onChange={(e) => setRole(e.target.value as Role)} className="mt-1.5 w-full rounded-lg border border-input bg-input-background px-4 py-2.5">
                      <option value="aluno">Aluno</option>
                      <option value="pais">Responsável</option>
                    </select>
                  </label>
                </>
              )}

              <label className="block text-sm font-medium">E-mail
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  <input required type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nome@ifpe.edu.br" className="w-full rounded-lg border border-input bg-input-background py-2.5 pl-10 pr-4" />
                </div>
              </label>

              <label className="block text-sm font-medium">Senha
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  <input required type={showPassword ? 'text' : 'password'} autoComplete={isLogin ? 'current-password' : 'new-password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-input bg-input-background py-2.5 pl-10 pr-12" />
                  <button type="button" aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'} onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </label>

              {isLogin && (
                <div className="text-right">
                  <button type="button" className="text-sm font-medium text-primary" onClick={() => setInfo('Para a demonstração, use a senha 123456 nas contas abaixo.')}>Esqueci minha senha</button>
                </div>
              )}

              <Button type="submit" variant="primary" size="lg" fullWidth>
                {isLogin ? 'Entrar' : 'Criar conta'}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </form>

            <div className="mt-6 space-y-2">
              <p className="text-sm font-medium">Acesso rápido por perfil</p>
              <div className="grid grid-cols-1 gap-2">
                <Button type="button" variant="outline" onClick={() => fill('aluno@ifpe.edu.br')}>Entrar como aluno</Button>
                <Button type="button" variant="outline" onClick={() => fill('pais@ifpe.edu.br')}>Entrar como responsável</Button>
                <Button type="button" variant="outline" onClick={() => fill('admin@ifpe.edu.br')}>Entrar como admin</Button>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-white/80">IFPE Campus Jaboatão dos Guararapes</p>
      </motion.div>
    </div>
  );
}
