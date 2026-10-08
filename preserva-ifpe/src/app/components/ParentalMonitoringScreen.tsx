import { motion } from 'motion/react';
import { Users, Eye, Clock, CheckCircle, AlertTriangle, BookOpen, Shield } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';

export function ParentalMonitoringScreen() {
  const studentInfo = {
    name: 'João Silva Santos',
    class: '2º Ano - Informática',
    totalMaterials: 3,
    overallStatus: 'Bom'
  };

  const materials = [
    {
      id: 1,
      name: 'Matemática - Vol. 2',
      status: 'Bom',
      borrowDate: '01/04/2026',
      dueDate: '15/04/2026',
      daysLeft: 7,
      lastCheck: '07/04/2026 às 10:30'
    },
    {
      id: 2,
      name: 'Física Moderna',
      status: 'Bom',
      borrowDate: '05/04/2026',
      dueDate: '20/04/2026',
      daysLeft: 12,
      lastCheck: '07/04/2026 às 10:30'
    },
    {
      id: 3,
      name: 'Química Orgânica',
      status: 'Atenção',
      borrowDate: '08/03/2026',
      dueDate: '10/04/2026',
      daysLeft: 2,
      lastCheck: '07/04/2026 às 10:30'
    }
  ];

  const activities = [
    {
      id: 1,
      type: 'borrow',
      message: 'Empréstimo do livro "Física Moderna"',
      date: '05/04/2026',
      time: '14:30'
    },
    {
      id: 2,
      type: 'inspection',
      message: 'Fiscalização mensal realizada - Nota: 10/10',
      date: '08/03/2026',
      time: '15:00'
    },
    {
      id: 3,
      type: 'return',
      message: 'Devolução do livro "História do Brasil"',
      date: '02/04/2026',
      time: '16:45'
    },
    {
      id: 4,
      type: 'warning',
      message: 'Aviso: Devolução próxima em 2 dias',
      date: '08/04/2026',
      time: '09:00'
    }
  ];

  const stats = [
    { label: 'Devoluções no prazo', value: '8/8', icon: CheckCircle, color: 'text-green-500' },
    { label: 'Pontos acumulados', value: '850', icon: Shield, color: 'text-yellow-500' },
    { label: 'Fiscalizações', value: '3/3', icon: Eye, color: 'text-blue-500' }
  ];

  return (
    <div className="pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-secondary p-6 md:p-8 rounded-b-3xl shadow-lg mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white font-bold text-2xl md:text-3xl mb-2">
                Monitoria Parental
              </h2>
              <p className="text-white/90 text-sm">
                Acompanhe o uso de materiais
              </p>
            </div>
            <Users className="w-12 h-12 md:w-16 md:h-16 text-white/30" />
          </div>

          {/* Student Info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-white font-semibold text-lg">{studentInfo.name}</h3>
                <p className="text-white/80 text-sm">{studentInfo.class}</p>
              </div>
              <Badge variant="success" className="bg-white/20 text-white border-0">
                {studentInfo.overallStatus}
              </Badge>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 bg-white/10 rounded-lg p-2 text-center">
                <p className="text-white font-bold text-xl">{studentInfo.totalMaterials}</p>
                <p className="text-white/70 text-xs">Materiais ativos</p>
              </div>
              <div className="flex-1 bg-white/10 rounded-lg p-2 text-center">
                <p className="text-white font-bold text-xl">10/10</p>
                <p className="text-white/70 text-xs">Última nota</p>
              </div>
              <div className="flex-1 bg-white/10 rounded-lg p-2 text-center">
                <p className="text-white font-bold text-xl">850</p>
                <p className="text-white/70 text-xs">Pontos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6">
        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className="flex items-center gap-3">
                  <div className={`p-3 bg-muted rounded-xl ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Active Materials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-bold text-xl mb-4">Materiais em Posse</h3>
          <div className="space-y-3">
            {materials.map((material) => (
              <Card
                key={material.id}
                className={`${
                  material.status === 'Atenção'
                    ? 'border-l-4 border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/10'
                    : 'border-l-4 border-l-green-500'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{material.name}</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Empréstimo: {material.borrowDate}</p>
                      <p>Devolução: {material.dueDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={material.status === 'Bom' ? 'success' : 'warning'}>
                      {material.status}
                    </Badge>
                    <p className={`text-sm mt-1 ${
                      material.daysLeft <= 3 ? 'text-destructive font-semibold' : 'text-muted-foreground'
                    }`}>
                      {material.daysLeft} dias restantes
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Última verificação: {material.lastCheck}</span>
                  </div>
                  {material.daysLeft <= 3 && (
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-bold text-xl mb-4">Histórico de Atividades</h3>
          <Card>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`flex items-start gap-4 ${
                    index !== activities.length - 1 ? 'pb-4 border-b border-border' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                    activity.type === 'borrow' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    activity.type === 'return' ? 'bg-green-100 dark:bg-green-900/30' :
                    'bg-purple-100 dark:bg-purple-900/30'
                  }`}>
                    {activity.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-yellow-600" /> :
                     activity.type === 'borrow' ? <BookOpen className="w-5 h-5 text-blue-600" /> :
                     activity.type === 'return' ? <CheckCircle className="w-5 h-5 text-green-600" /> :
                     <Eye className="w-5 h-5 text-purple-600" />
                    }
                  </div>
                  <div className="flex-1">
                    <p className="font-medium mb-0.5">{activity.message}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{activity.date} às {activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button variant="primary">
            <Eye className="w-4 h-4" />
            Aprovar Fiscalização
          </Button>
          <Button variant="outline">
            <BookOpen className="w-4 h-4" />
            Ver Relatório Completo
          </Button>
        </div>

        {/* Info */}
        <Card className="bg-accent border-primary/20">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Sobre a Monitoria</h4>
              <p className="text-sm text-muted-foreground">
                Pais e responsáveis podem acompanhar em tempo real todos os materiais em posse do aluno,
                histórico de atividades e participar ativamente do processo de preservação.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
