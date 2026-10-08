import { motion } from 'motion/react';
import { Megaphone, Shield, Target, TrendingUp, Users, Calendar } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';

export function CampaignsScreen() {
  const activeCampaigns = [
    {
      id: 1,
      title: 'Cuidado Exemplar',
      description: 'Mantenha todos os materiais em perfeito estado durante 30 dias consecutivos',
      reward: 200,
      participants: 28,
      endDate: '30/04/2026',
      daysLeft: 22,
      progress: 45,
      icon: Shield,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 2,
      title: 'Guardião Pontual',
      description: 'Devolva 5 materiais antes do prazo estabelecido',
      reward: 150,
      participants: 35,
      endDate: '25/04/2026',
      daysLeft: 17,
      progress: 60,
      icon: Target,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 3,
      title: 'Preservação Total',
      description: 'Complete 3 fiscalizações mensais com nota máxima',
      reward: 300,
      participants: 15,
      endDate: '15/05/2026',
      daysLeft: 37,
      progress: 33,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const rules = [
    {
      id: 1,
      title: 'Devoluções no Prazo',
      description: 'Todos os materiais devem ser devolvidos na data estipulada',
      penalty: 'Perda de 20 pontos por dia de atraso',
      icon: Calendar
    },
    {
      id: 2,
      title: 'Preservação dos Materiais',
      description: 'Materiais devem estar em perfeito estado de conservação',
      penalty: 'Compensação financeira + perda de até 100 pontos',
      icon: Shield
    },
    {
      id: 3,
      title: 'Participação nas Fiscalizações',
      description: 'Presença obrigatória nas inspeções mensais agendadas',
      penalty: 'Suspensão temporária + perda de 50 pontos',
      icon: Users
    }
  ];

  return (
    <div className="pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-secondary p-6 md:p-8 rounded-b-3xl shadow-lg mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold text-2xl md:text-3xl mb-2">
                Campanhas e Regras
              </h2>
              <p className="text-white/90 text-sm">
                Participe e ganhe prêmios
              </p>
            </div>
            <Megaphone className="w-12 h-12 md:w-16 md:h-16 text-white/30" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6">
        {/* Active Campaigns */}
        <div>
          <h3 className="font-bold text-xl mb-4">Campanhas Ativas</h3>
          <div className="space-y-4">
            {activeCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${campaign.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <campaign.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-bold text-lg">{campaign.title}</h4>
                        <Badge variant="info">{campaign.reward} pts</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {campaign.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {campaign.participants} participantes
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          Termina em {campaign.daysLeft} dias
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className="font-semibold">{campaign.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${campaign.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                        className={`h-full bg-gradient-to-r ${campaign.color}`}
                      />
                    </div>
                  </div>

                  <Button variant="primary" size="sm" fullWidth>
                    Ver Detalhes
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Rules Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-bold text-xl mb-4 text-red-600 dark:text-red-400">
            Leis do Preserva IFPE
          </h3>
          <div className="space-y-3">
            {rules.map((rule) => (
              <Card key={rule.id} className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/10">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <rule.icon className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold mb-1 text-red-900 dark:text-red-200">
                      {rule.title}
                    </h4>
                    <p className="text-sm text-red-800 dark:text-red-300 mb-2">
                      {rule.description}
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-200 dark:bg-red-900/40 rounded-full">
                      <span className="text-xs font-semibold text-red-900 dark:text-red-200">
                        ⚠️ Penalidade: {rule.penalty}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Info Banner */}
        <Card className="bg-gradient-to-r from-primary to-secondary text-white">
          <div className="flex items-center gap-4">
            <Shield className="w-12 h-12 text-white/30 flex-shrink-0" />
            <div>
              <h4 className="font-bold mb-1">Comprometimento com a Preservação</h4>
              <p className="text-sm text-white/90">
                O Preserva IFPE é um programa sério de preservação do patrimônio escolar.
                Cumpra as regras, cuide dos materiais e seja recompensado!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
