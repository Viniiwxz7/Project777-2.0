import { motion } from 'motion/react';
import { Camera, MapPin, Eye, Lock, Play, Clock } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';

export function CamerasScreen() {
  const cameras = [
    { id: 1, location: 'Sala 101 - Laboratório de Química', status: 'Ativa', hasAccess: true },
    { id: 2, location: 'Sala 205 - Biblioteca', status: 'Ativa', hasAccess: true },
    { id: 3, location: 'Sala 302 - Laboratório de Física', status: 'Ativa', hasAccess: false },
    { id: 4, location: 'Corredor Principal - Bloco A', status: 'Ativa', hasAccess: true },
    { id: 5, location: 'Sala 104 - Auditório', status: 'Manutenção', hasAccess: false },
    { id: 6, location: 'Sala 201 - Lab. de Informática', status: 'Ativa', hasAccess: true }
  ];

  const recentRecordings = [
    { id: 1, location: 'Sala 101', date: '08/04/2026', time: '14:30', duration: '2h 15min' },
    { id: 2, location: 'Biblioteca', date: '07/04/2026', time: '10:15', duration: '1h 45min' },
    { id: 3, location: 'Lab. de Física', date: '05/04/2026', time: '16:00', duration: '3h 00min' }
  ];

  return (
    <div className="pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-secondary p-6 md:p-8 rounded-b-3xl shadow-lg mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold text-2xl md:text-3xl mb-2">
                Sistema de Câmeras
              </h2>
              <p className="text-white/90 text-sm">
                Monitoramento em tempo real das salas
              </p>
            </div>
            <Camera className="w-12 h-12 md:w-16 md:h-16 text-white/30" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 text-center">
              <p className="text-white font-bold text-2xl">6</p>
              <p className="text-white/80 text-xs">Total</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 text-center">
              <p className="text-white font-bold text-2xl">5</p>
              <p className="text-white/80 text-xs">Ativas</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 text-center">
              <p className="text-white font-bold text-2xl">4</p>
              <p className="text-white/80 text-xs">Acesso</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6">
        {/* Camera Grid */}
        <div>
          <h3 className="font-bold text-xl mb-4">Câmeras Disponíveis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cameras.map((camera, index) => (
              <motion.div
                key={camera.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden">
                  {/* Camera Preview */}
                  <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-3 overflow-hidden">
                    {camera.hasAccess && camera.status === 'Ativa' ? (
                      <>
                        {/* Simulated camera view */}
                        <div className="absolute inset-0 bg-gray-700/50 flex items-center justify-center">
                          <Play className="w-12 h-12 text-white/30" />
                        </div>
                        <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-red-500 px-2 py-1 rounded text-white text-xs font-medium">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          AO VIVO
                        </div>
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-mono">
                          {new Date().toLocaleTimeString('pt-BR')}
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Lock className="w-12 h-12 text-white/30" />
                      </div>
                    )}
                  </div>

                  {/* Camera Info */}
                  <div className="flex items-start gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-medium flex-1">{camera.location}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant={camera.status === 'Ativa' ? 'success' : 'warning'}>
                      {camera.status}
                    </Badge>
                    {camera.hasAccess && camera.status === 'Ativa' ? (
                      <Button variant="primary" size="sm">
                        <Eye className="w-4 h-4" />
                        Assistir
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" disabled={camera.status !== 'Ativa'}>
                        <Lock className="w-4 h-4" />
                        Solicitar
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Recordings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-bold text-xl mb-4">Gravações Recentes</h3>
          <div className="space-y-3">
            {recentRecordings.map((recording) => (
              <Card key={recording.id} hoverable>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Camera className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold mb-0.5">{recording.location}</h4>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{recording.date} às {recording.time}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {recording.duration}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Play className="w-4 h-4" />
                    Reproduzir
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Info */}
        <Card className="bg-accent border-primary/20">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Camera className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Sobre o Sistema de Câmeras</h4>
              <p className="text-sm text-muted-foreground">
                As câmeras ajudam a garantir a segurança dos materiais e o cumprimento das regras de preservação.
                O acesso às gravações é concedido apenas em situações específicas relacionadas à preservação.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
