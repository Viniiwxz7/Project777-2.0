import { motion } from 'motion/react';
import { MapPin, Camera, Users, Lock } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';

export function RoomMapScreen() {
  const rooms = [
    { id: 1, name: 'Sala 101', floor: 1, type: 'Laboratório', hasCamera: true, occupied: true, materials: 3 },
    { id: 2, name: 'Sala 102', floor: 1, type: 'Sala de Aula', hasCamera: false, occupied: false, materials: 0 },
    { id: 3, name: 'Sala 103', floor: 1, type: 'Sala de Aula', hasCamera: false, occupied: true, materials: 5 },
    { id: 4, name: 'Sala 104', floor: 1, type: 'Auditório', hasCamera: true, occupied: false, materials: 0 },
    { id: 5, name: 'Sala 201', floor: 2, type: 'Lab. Informática', hasCamera: true, occupied: true, materials: 8 },
    { id: 6, name: 'Sala 202', floor: 2, type: 'Sala de Aula', hasCamera: false, occupied: false, materials: 0 },
    { id: 7, name: 'Sala 203', floor: 2, type: 'Sala de Aula', hasCamera: false, occupied: true, materials: 4 },
    { id: 8, name: 'Sala 204', floor: 2, type: 'Sala de Reunião', hasCamera: true, occupied: false, materials: 0 },
    { id: 9, name: 'Sala 205', floor: 2, type: 'Biblioteca', hasCamera: true, occupied: true, materials: 12 },
    { id: 10, name: 'Sala 301', floor: 3, type: 'Laboratório', hasCamera: true, occupied: false, materials: 0 },
    { id: 11, name: 'Sala 302', floor: 3, type: 'Lab. Física', hasCamera: true, occupied: true, materials: 6 },
    { id: 12, name: 'Sala 303', floor: 3, type: 'Sala de Aula', hasCamera: false, occupied: false, materials: 0 }
  ];

  const floors = [1, 2, 3];

  return (
    <div className="pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-secondary p-6 md:p-8 rounded-b-3xl shadow-lg mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold text-2xl md:text-3xl mb-2">
                Mapa de Salas
              </h2>
              <p className="text-white/90 text-sm">
                Campus Jaboatão dos Guararapes
              </p>
            </div>
            <MapPin className="w-12 h-12 md:w-16 md:h-16 text-white/30" />
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6">
            {[
              { label: 'Ocupada', color: 'bg-green-500' },
              { label: 'Disponível', color: 'bg-gray-400' },
              { label: 'Com Câmera', icon: Camera },
              { label: 'Materiais', icon: Users }
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-white text-xs">
                {item.color ? (
                  <div className={`w-3 h-3 ${item.color} rounded-full`} />
                ) : item.icon && (
                  <item.icon className="w-4 h-4" />
                )}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Floor Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {floors.map((floor) => (
            <button
              key={floor}
              className="flex-shrink-0 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium shadow-sm hover:bg-[#0047AB] transition-colors"
            >
              {floor}º Andar
            </button>
          ))}
        </div>

        {/* Room Grid by Floor */}
        {floors.map((floor) => (
          <div key={floor} className="mb-8">
            <h3 className="font-bold text-lg mb-4">{floor}º Andar</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {rooms
                .filter((room) => room.floor === floor)
                .map((room, index) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      hoverable
                      className={`relative overflow-hidden ${
                        room.occupied
                          ? 'border-l-4 border-l-green-500'
                          : 'border-l-4 border-l-gray-400'
                      }`}
                    >
                      {/* Room Visual */}
                      <div className={`h-24 rounded-lg mb-3 flex items-center justify-center relative ${
                        room.occupied
                          ? 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20'
                          : 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/20 dark:to-gray-700/20'
                      }`}>
                        {room.hasCamera && (
                          <div className="absolute top-2 right-2">
                            <Camera className="w-4 h-4 text-primary" />
                          </div>
                        )}
                        <div className="text-center">
                          <p className={`font-bold text-2xl ${
                            room.occupied ? 'text-green-600 dark:text-green-400' : 'text-gray-400'
                          }`}>
                            {room.name.split(' ')[1]}
                          </p>
                        </div>
                      </div>

                      {/* Room Info */}
                      <div className="space-y-2">
                        <div>
                          <h4 className="font-semibold">{room.name}</h4>
                          <p className="text-sm text-muted-foreground">{room.type}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge variant={room.occupied ? 'success' : 'default'}>
                            {room.occupied ? 'Ocupada' : 'Disponível'}
                          </Badge>
                          {room.materials > 0 && (
                            <Badge variant="info">
                              {room.materials} materiais
                            </Badge>
                          )}
                        </div>

                        <div className="flex gap-2 pt-2">
                          {room.hasCamera && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Camera className="w-3.5 h-3.5" />
                              <span>Câmera</span>
                            </div>
                          )}
                          {room.occupied && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Users className="w-3.5 h-3.5" />
                              <span>Em uso</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}

        {/* Info Card */}
        <Card className="bg-accent border-primary/20">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Sobre o Mapa</h4>
              <p className="text-sm text-muted-foreground">
                O mapa mostra todas as salas do campus, indicando quais possuem câmeras de segurança,
                seu status de ocupação e a quantidade de materiais sendo utilizados em cada local.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
