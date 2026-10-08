import { motion } from 'motion/react';
import {
  BookOpen,
  Camera,
  Shield,
  AlertCircle,
  Calendar,
  TrendingUp,
  Award,
  Clock,
  PackageSearch
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';
import { Badge } from './Badge';

export function Dashboard() {
  const stats = [
    { label: 'Materiais em posse', value: '3', icon: BookOpen, color: 'text-blue-500' },
    { label: 'Status geral', value: 'Bom', icon: Shield, color: 'text-green-500' },
    { label: 'Pontos acumulados', value: '850', icon: Award, color: 'text-yellow-500' },
    { label: 'Próxima fiscalização', value: '5 dias', icon: Calendar, color: 'text-purple-500' }
  ];

  const materials = [
    { id: 1, name: 'Matemática - Vol. 2', status: 'Bom', dueDate: '15/04/2026', days: 7 },
    { id: 2, name: 'Física Moderna', status: 'Bom', dueDate: '20/04/2026', days: 12 },
    { id: 3, name: 'Química Orgânica', status: 'Atenção', dueDate: '10/04/2026', days: 2 }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Devolução próxima',
      message: 'Química Orgânica deve ser devolvido em 2 dias',
      time: '2h atrás'
    },
    {
      id: 2,
      type: 'info',
      title: 'Fiscalização agendada',
      message: 'Inspeção mensal será realizada na próxima semana',
      time: '5h atrás'
    },
    {
      id: 3,
      type: 'success',
      title: 'Parabéns!',
      message: 'Você ganhou 50 pontos por cuidado exemplar',
      time: '1 dia atrás'
    }
  ];

  return (
    <div className="pb-20 md:pb-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary via-[#0047AB] to-secondary p-6 md:p-8 rounded-b-3xl shadow-lg mb-6"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-white font-bold text-2xl md:text-3xl mb-2">
            Bem-vindo de volta!
          </h2>
          <p className="text-white/90 text-sm md:text-base">
            Seus materiais estão em ótimo estado. Continue assim!
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              >
                <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
                <p className="text-white/80 text-xs mb-1">{stat.label}</p>
                <p className="text-white font-bold text-xl">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6">
        {/* Materiais em Posse */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Meus Materiais
            </h3>
            <button className="text-primary hover:text-secondary font-medium text-sm transition-colors">
              Ver todos
            </button>
          </div>

          <div className="space-y-3">
            {materials.map((material) => (
              <Card key={material.id} hoverable>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{material.name}</h4>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Devolução: {material.dueDate}
                      </span>
                      <Badge variant={material.status === 'Bom' ? 'success' : 'warning'}>
                        {material.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${
                      material.days <= 3 ? 'text-destructive' : 'text-muted-foreground'
                    }`}>
                      {material.days}
                    </div>
                    <p className="text-xs text-muted-foreground">dias</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-bold text-xl mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {[
              { label: 'Empréstimos', icon: PackageSearch, color: 'from-indigo-500 to-indigo-600' },
              { label: 'Ver Câmeras', icon: Camera, color: 'from-blue-500 to-blue-600' },
              { label: 'Fiscalização', icon: Calendar, color: 'from-purple-500 to-purple-600' },
              { label: 'Meus Prêmios', icon: Award, color: 'from-yellow-500 to-yellow-600' },
              { label: 'Campanhas', icon: TrendingUp, color: 'from-green-500 to-green-600' }
            ].map((action) => (
              <Card key={action.label} hoverable className="!p-0 overflow-hidden">
                <div className={`bg-gradient-to-br ${action.color} p-4 text-center`}>
                  <action.icon className="w-8 h-8 text-white mx-auto mb-2" />
                  <p className="text-white font-medium text-sm">{action.label}</p>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Avisos e Alertas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-bold text-xl flex items-center gap-2 mb-4">
            <AlertCircle className="w-6 h-6 text-primary" />
            Avisos Importantes
          </h3>

          <div className="space-y-3">
            {alerts.map((alert) => (
              <Card key={alert.id} className="border-l-4 border-l-primary">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    alert.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                    alert.type === 'success' ? 'bg-green-100 dark:bg-green-900/30' :
                    'bg-blue-100 dark:bg-blue-900/30'
                  }`}>
                    <AlertCircle className={`w-5 h-5 ${
                      alert.type === 'warning' ? 'text-yellow-600' :
                      alert.type === 'success' ? 'text-green-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-0.5">{alert.title}</h4>
                    <p className="text-sm text-muted-foreground mb-1">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Campaign Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-xl mb-2">Campanha: Cuidado Exemplar</h3>
              <p className="text-white/90 text-sm mb-3">
                Mantenha seus materiais em perfeito estado e ganhe prêmios!
              </p>
              <Badge variant="default" className="bg-white/20 text-white border-0">
                Termina em 15 dias
              </Badge>
            </div>
            <Shield className="w-16 h-16 text-white/30" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}