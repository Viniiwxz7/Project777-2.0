import { Home, BookOpen, Camera, Award, PackageSearch } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'materials', label: 'Materiais', icon: BookOpen },
    { id: 'cameras', label: 'Câmeras', icon: Camera },
    { id: 'rewards', label: 'Prêmios', icon: Award },
    { id: 'loans', label: 'Empréstimos', icon: PackageSearch }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50 md:hidden">
      <div className="flex items-center justify-around h-16">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`
              flex flex-col items-center justify-center gap-1 px-3 py-2 flex-1
              transition-all duration-200
              ${activeTab === id
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
              }
            `}
          >
            <Icon className={`w-5 h-5 ${activeTab === id ? 'scale-110' : ''} transition-transform`} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}