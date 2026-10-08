import { motion } from 'motion/react';
import { Bell, AlertTriangle, Info, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';

export function AlertsScreen() {
  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'ATENÇÃO: Devolução Urgente',
      message: 'O livro "Química Orgânica" deve ser devolvido em 2 dias. Atraso resultará em penalidade e perda de pontos.',
      time: '2h atrás',
      read: false,
      icon: AlertTriangle
    },
    {
      id: 2,
      type: 'warning',
      title: 'Fiscalização Programada',
      message: 'A fiscalização mensal dos materiais será realizada em 5 dias. Certifique-se de que todos estão em bom estado.',
      time: '5h atrás',
      read: false,
      icon: Clock
    },
    {
      id: 3,
      type: 'success',
      title: 'Material Devolvido com Sucesso',
      message: 'O livro "Matemática Vol. 1" foi devolvido em perfeito estado. Você ganhou 50 pontos!',
      time: '1 dia atrás',
      read: true,
      icon: CheckCircle
    },
    {
      id: 4,
      type: 'info',
      title: 'Nova Campanha Disponível',
      message: 'Participe da campanha "Cuidado Exemplar" e ganhe até 200 pontos extras. Válido até 30/04/2026.',
      time: '1 dia atrás',
      read: true,
      icon: Info
    },
    {
      id: 5,
      type: 'critical',
      title: 'Penalidade Aplicada',
      message: 'Você perdeu 20 pontos por atraso na devolução do material "Física Quântica". Evite novos atrasos.',
      time: '2 dias atrás',
      read: true,
      icon: XCircle
    },
    {
      id: 6,
      type: 'info',
      title: 'Lembrete de Cuidados',
      message: 'Mantenha os materiais longe de umidade e luz solar direta. Confira as dicas de preservação no app.',
      time: '3 dias atrás',
      read: true,
      icon: Info
    }
  ];

  const unreadCount = alerts.filter(a => !a.read).length;

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          border: 'border-l-4 border-l-red-500',
          bg: 'bg-red-50 dark:bg-red-900/10',
          icon: 'text-red-600 dark:text-red-400'
        };
      case 'warning':
        return {
          border: 'border-l-4 border-l-yellow-500',
          bg: 'bg-yellow-50 dark:bg-yellow-900/10',
          icon: 'text-yellow-600 dark:text-yellow-400'
        };
      case 'success':
        return {
          border: 'border-l-4 border-l-green-500',
          bg: 'bg-green-50 dark:bg-green-900/10',
          icon: 'text-green-600 dark:text-green-400'
        };
      case 'info':
        return {
          border: 'border-l-4 border-l-blue-500',
          bg: 'bg-blue-50 dark:bg-blue-900/10',
          icon: 'text-blue-600 dark:text-blue-400'
        };
      default:
        return {
          border: '',
          bg: '',
          icon: 'text-muted-foreground'
        };
    }
  };

  return (
    <div className="pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-secondary p-6 md:p-8 rounded-b-3xl shadow-lg mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold text-2xl md:text-3xl mb-2">
                Avisos e Notificações
              </h2>
              <p className="text-white/90 text-sm">
                {unreadCount > 0
                  ? `Você tem ${unreadCount} ${unreadCount === 1 ? 'aviso não lido' : 'avisos não lidos'}`
                  : 'Todos os avisos foram lidos'
                }
              </p>
            </div>
            <div className="relative">
              <Bell className="w-12 h-12 md:w-16 md:h-16 text-white/30" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {unreadCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { label: 'Todos', count: alerts.length },
            { label: 'Não lidos', count: unreadCount },
            { label: 'Críticos', count: alerts.filter(a => a.type === 'critical').length }
          ].map((tab) => (
            <button
              key={tab.label}
              className="flex-shrink-0 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm shadow-sm hover:bg-[#0047AB] transition-colors"
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map((alert, index) => {
            const styles = getAlertStyles(alert.type);
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`${styles.border} ${styles.bg} ${!alert.read ? 'shadow-md' : ''}`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 bg-white dark:bg-card rounded-xl ${styles.icon} flex-shrink-0`}>
                      <alert.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold flex items-center gap-2">
                          {alert.title}
                          {!alert.read && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </h3>
                        <Badge
                          variant={
                            alert.type === 'critical' ? 'danger' :
                            alert.type === 'warning' ? 'warning' :
                            alert.type === 'success' ? 'success' :
                            'info'
                          }
                        >
                          {alert.type === 'critical' ? 'Urgente' :
                           alert.type === 'warning' ? 'Atenção' :
                           alert.type === 'success' ? 'Sucesso' :
                           'Info'}
                        </Badge>
                      </div>
                      <p className="text-sm mb-2">
                        {alert.message}
                      </p>
                      <div className="flex items-center gap-4">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {alert.time}
                        </p>
                        {!alert.read && (
                          <button className="text-xs text-primary hover:text-secondary font-medium transition-colors">
                            Marcar como lido
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <Card className="bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-red-900 dark:text-red-200 mb-1">
                  Regras do Preserva IFPE
                </h4>
                <ul className="space-y-1 text-sm text-red-800 dark:text-red-300">
                  <li>• Atrasos na devolução resultam em perda de pontos e suspensão temporária</li>
                  <li>• Danos aos materiais podem resultar em compensação financeira</li>
                  <li>• Fiscalizações periódicas são obrigatórias e não podem ser ignoradas</li>
                  <li>• Três penalidades consecutivas levam ao bloqueio permanente</li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
