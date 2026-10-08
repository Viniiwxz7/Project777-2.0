import { motion } from 'motion/react';
import { Trophy, Target, TrendingUp, Award, Star, Crown, Medal, Zap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';

export function RewardsScreen() {
  const userPoints = 850;
  const userRank = 3;
  const totalUsers = 45;

  const achievements = [
    {
      id: 1,
      name: 'Guardião Iniciante',
      description: 'Devolveu 5 materiais em perfeito estado',
      points: 50,
      unlocked: true,
      icon: Medal,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      name: 'Cuidado Exemplar',
      description: 'Manteve todos os materiais sem danos por 30 dias',
      points: 100,
      unlocked: true,
      icon: Star,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 3,
      name: 'Pontual',
      description: 'Devolveu 10 materiais antes do prazo',
      points: 75,
      unlocked: true,
      icon: Zap,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 4,
      name: 'Guardião Master',
      description: 'Acumulou 1000 pontos',
      points: 200,
      unlocked: false,
      icon: Crown,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Maria Silva', points: 1250, avatar: 'M', color: 'from-yellow-400 to-yellow-500' },
    { rank: 2, name: 'João Santos', points: 980, avatar: 'J', color: 'from-gray-300 to-gray-400' },
    { rank: 3, name: 'Você', points: 850, avatar: 'V', color: 'from-orange-400 to-orange-500', isUser: true },
    { rank: 4, name: 'Ana Costa', points: 720, avatar: 'A', color: 'from-blue-400 to-blue-500' },
    { rank: 5, name: 'Pedro Lima', points: 680, avatar: 'P', color: 'from-green-400 to-green-500' }
  ];

  const rewards = [
    { id: 1, name: 'Isenção de Taxa', cost: 500, available: true },
    { id: 2, name: 'Prioridade na Fila', cost: 300, available: true },
    { id: 3, name: 'Certificado Digital', cost: 1000, available: false },
    { id: 4, name: 'Prazo Extra (+7 dias)', cost: 400, available: true }
  ];

  return (
    <div className="pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-yellow-500 via-yellow-600 to-orange-500 p-6 md:p-8 rounded-b-3xl shadow-lg mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-white font-bold text-2xl md:text-3xl mb-2">
                Prêmios e Conquistas
              </h2>
              <p className="text-white/90 text-sm">
                Continue cuidando bem dos materiais!
              </p>
            </div>
            <Trophy className="w-12 h-12 md:w-16 md:h-16 text-white/30" />
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
              <p className="text-white font-bold text-3xl">{userPoints}</p>
              <p className="text-white/80 text-xs mt-1">Pontos</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
              <p className="text-white font-bold text-3xl">#{userRank}</p>
              <p className="text-white/80 text-xs mt-1">Ranking</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
              <p className="text-white font-bold text-3xl">3</p>
              <p className="text-white/80 text-xs mt-1">Conquistas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6">
        {/* Achievements */}
        <div>
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            Conquistas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`relative overflow-hidden ${
                  achievement.unlocked ? 'border-l-4 border-l-green-500' : 'opacity-60'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <achievement.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold">{achievement.name}</h4>
                        {achievement.unlocked && (
                          <Badge variant="success">Desbloqueado</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {achievement.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold text-sm">{achievement.points} pontos</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            Ranking Geral
          </h3>
          <Card>
            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                    user.isUser
                      ? 'bg-primary/5 border border-primary/20'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 text-center">
                      <span className={`font-bold text-lg ${
                        user.rank <= 3 ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                        #{user.rank}
                      </span>
                    </div>
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-white font-semibold shadow-md`}>
                      {user.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.rank === 1 ? '1º lugar' :
                         user.rank === 2 ? '2º lugar' :
                         user.rank === 3 ? '3º lugar' : `${user.rank}º lugar`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{user.points}</p>
                    <p className="text-xs text-muted-foreground">pontos</p>
                  </div>
                  {user.rank === 1 && (
                    <Crown className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border text-center text-sm text-muted-foreground">
              Você está entre os top {Math.round((userRank / totalUsers) * 100)}% dos {totalUsers} participantes
            </div>
          </Card>
        </motion.div>

        {/* Rewards Store */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Loja de Prêmios
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewards.map((reward) => (
              <Card key={reward.id} className="relative">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{reward.name}</h4>
                  <Badge variant={reward.available ? 'success' : 'default'}>
                    {reward.cost} pts
                  </Badge>
                </div>
                <Button
                  variant={reward.available ? 'primary' : 'outline'}
                  size="sm"
                  fullWidth
                  disabled={!reward.available}
                >
                  {reward.available ? 'Resgatar' : 'Insuficiente'}
                </Button>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
