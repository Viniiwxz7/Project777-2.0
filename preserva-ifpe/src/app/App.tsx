import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { AuthScreen } from './components/AuthScreen';
import { SchoolPortal } from './components/SchoolPortal';
import { getSession, setSession, type Session } from './lib/schoolDb';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'auth' | 'app'>(() => (getSession() ? 'app' : 'splash'));
  const [session, setUserSession] = useState<Session | null>(() => getSession());

  if (currentScreen === 'splash') {
    return <SplashScreen onComplete={() => setCurrentScreen(session ? 'app' : 'auth')} />;
  }

  if (!session || currentScreen === 'auth') {
    return (
      <AuthScreen
        onLogin={(next) => {
          setUserSession(next);
          setCurrentScreen('app');
        }}
      />
    );
  }

  return (
    <SchoolPortal
      session={session}
      onLogout={() => {
        setSession(null);
        setUserSession(null);
        setCurrentScreen('auth');
      }}
    />
  );
}
