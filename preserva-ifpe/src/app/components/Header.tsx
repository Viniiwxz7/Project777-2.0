import { Bell, Moon, Sun, Menu } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  userName: string;
  notificationCount?: number;
  onMenuClick?: () => void;
}

export function Header({ userName, notificationCount = 0, onMenuClick }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-card border-b border-border shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Logo e Nome */}
        <div className="flex items-center gap-3">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">P</span>
            </div>
            <div>
              <h1 className="font-bold text-primary leading-none text-base md:text-lg">
                Preserva IFPE
              </h1>
              <p className="text-xs text-muted-foreground">Campus Jaboatão</p>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Notificações */}
          <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-muted-foreground" />
            )}
          </button>

          {/* Avatar */}
          <div className="flex items-center gap-2 pl-2 md:pl-3 border-l border-border">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium leading-none">{userName}</p>
              <p className="text-xs text-muted-foreground">Aluno</p>
            </div>
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
