import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { AuthScreen } from './components/AuthScreen';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Dashboard } from './components/Dashboard';
import { MaterialsScreen } from './components/MaterialsScreen';
import { CamerasScreen } from './components/CamerasScreen';
import { RoomMapScreen } from './components/RoomMapScreen';
import { RewardsScreen } from './components/RewardsScreen';
import { AlertsScreen } from './components/AlertsScreen';
import { CampaignsScreen } from './components/CampaignsScreen';
import { InspectionScreen } from './components/InspectionScreen';
import { ParentalMonitoringScreen } from './components/ParentalMonitoringScreen';
import { LoanFlowScreen } from './components/LoanFlowScreen';
import { LoanApprovalScreen } from './components/LoanApprovalScreen';
import { DonorsScreen } from './components/DonorsScreen';
import { SchoolMaterialsScreen } from './components/SchoolMaterialsScreen';
import { DonationRegisterScreen } from './components/DonationRegisterScreen';
import { DonationsReportScreen } from './components/DonationsReportScreen';
import {
  Home,
  BookOpen,
  Camera,
  MapPin,
  Award,
  Bell,
  Megaphone,
  ClipboardCheck,
  Users,
  PackageSearch,
  UserPlus,
  Package,
  Gift,
  FileText,
  X,
} from 'lucide-react';

type Screen =
  | 'splash'
  | 'auth'
  | 'home'
  | 'materials'
  | 'cameras'
  | 'map'
  | 'rewards'
  | 'alerts'
  | 'campaigns'
  | 'inspection'
  | 'parental'
  | 'loans'
  | 'loan-approval'
  | 'donors'
  | 'school-materials'
  | 'donation-register'
  | 'donations-report';

const navItems: { id: string; label: string; icon: typeof Home; screen: Screen }[] = [
  { id: 'home', label: 'Início', icon: Home, screen: 'home' },
  { id: 'materials', label: 'Meus Materiais', icon: BookOpen, screen: 'materials' },
  { id: 'cameras', label: 'Câmeras', icon: Camera, screen: 'cameras' },
  { id: 'map', label: 'Mapa de Salas', icon: MapPin, screen: 'map' },
  { id: 'rewards', label: 'Prêmios', icon: Award, screen: 'rewards' },
  { id: 'alerts', label: 'Avisos', icon: Bell, screen: 'alerts' },
  { id: 'campaigns', label: 'Campanhas', icon: Megaphone, screen: 'campaigns' },
  { id: 'inspection', label: 'Fiscalização', icon: ClipboardCheck, screen: 'inspection' },
  { id: 'parental', label: 'Monitoria Parental', icon: Users, screen: 'parental' },
  { id: 'loans', label: 'Empréstimos', icon: PackageSearch, screen: 'loans' },
  { id: 'donors', label: 'Doadores', icon: UserPlus, screen: 'donors' },
  { id: 'school-materials', label: 'Estoque de Materiais', icon: Package, screen: 'school-materials' },
  { id: 'donation-register', label: 'Registrar Doação', icon: Gift, screen: 'donation-register' },
  { id: 'donations-report', label: 'Relatório de Doações', icon: FileText, screen: 'donations-report' },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState<'aluno' | 'pais' | 'admin'>('aluno');
  const [childId, setChildId] = useState('joao');
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSplashComplete = () => {
    setCurrentScreen('auth');
  };

  const handleLogin = (session: { name?: string; role?: 'aluno' | 'pais' | 'admin'; email?: string } | string) => {
    if (typeof session === 'string') {
      setUserName(session);
      setRole('aluno');
      setCurrentScreen('home');
      return;
    }
    setUserName(session.name || session.email || 'Usuário');
    const nextRole = session.role || 'aluno';
    setRole(nextRole);
    setCurrentScreen(nextRole === 'pais' ? 'parental' : 'home');
    setActiveTab('home');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case 'home':
        setCurrentScreen('home');
        break;
      case 'materials':
        setCurrentScreen('materials');
        break;
      case 'cameras':
        setCurrentScreen('cameras');
        break;
      case 'rewards':
        setCurrentScreen('rewards');
        break;
      case 'alerts':
        setCurrentScreen('alerts');
        break;
      case 'loans':
        setCurrentScreen('loans');
        break;
    }
  };

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
    setMobileMenuOpen(false);
    const tabMap: Record<string, string> = {
      home: 'home',
      materials: 'materials',
      cameras: 'cameras',
      rewards: 'rewards',
      alerts: 'alerts',
      loans: 'loans',
    };
    if (tabMap[screen]) setActiveTab(tabMap[screen]);
  };

  if (currentScreen === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (currentScreen === 'auth') {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        userName={userName}
        notificationCount={2}
        onMenuClick={() => setMobileMenuOpen(true)}
      />

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-card border-r border-border shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-bold text-primary">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-muted rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-3 space-y-1">
              {navItems.map(({ id, label, icon: Icon, screen }) => (
                <button
                  key={id}
                  onClick={() => navigate(screen)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all
                    ${currentScreen === screen
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="hidden md:block fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border overflow-y-auto">
        <nav className="p-4 space-y-1">
          {navItems.map(({ id, label, icon: Icon, screen }) => (
            <button
              key={id}
              onClick={() => navigate(screen)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all
                ${currentScreen === screen
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      <main className="md:ml-64 pt-0">
        <div className="max-w-[1600px] mx-auto">
          {currentScreen === 'home' && <Dashboard />}
          {currentScreen === 'materials' && <MaterialsScreen />}
          {currentScreen === 'cameras' && <CamerasScreen />}
          {currentScreen === 'map' && <RoomMapScreen />}
          {currentScreen === 'rewards' && <RewardsScreen />}
          {currentScreen === 'alerts' && <AlertsScreen />}
          {currentScreen === 'campaigns' && <CampaignsScreen />}
          {currentScreen === 'inspection' && (
            <InspectionScreen onNavigateToApproval={() => setCurrentScreen('loan-approval')} />
          )}
          {currentScreen === 'parental' && (
            <ParentalMonitoringScreen selectedId={childId} onSelect={setChildId} />
          )}
          {currentScreen === 'loans' && <LoanFlowScreen />}
          {currentScreen === 'loan-approval' && <LoanApprovalScreen />}
          {currentScreen === 'donors' && <DonorsScreen />}
          {currentScreen === 'school-materials' && <SchoolMaterialsScreen />}
          {currentScreen === 'donation-register' && <DonationRegisterScreen />}
          {currentScreen === 'donations-report' && <DonationsReportScreen />}
        </div>
      </main>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
