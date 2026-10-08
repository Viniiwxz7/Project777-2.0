import { motion } from 'motion/react';
import { Calendar, ClipboardCheck, CheckCircle, AlertCircle, FileText, Clock, PackageSearch } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';

interface InspectionScreenProps {
  onNavigateToApproval?: () => void;
}

export function InspectionScreen({ onNavigateToApproval }: InspectionScreenProps = {}) {
  const nextInspection = {
    date: '13/04/2026',
    daysLeft: 5,
    location: 'Sala 102 - Bloco A',
    time: '14:00'
  };

  const inspectionHistory = [
    {
      id: 1,
      date: '08/03/2026',
      score: 10,
      status: 'Aprovado',
      materials: 3,
      notes: 'Todos os materiais em perfeito estado',
      inspector: 'Prof. Carlos Silva'
    },
    {
      id: 2,
      date: '08/02/2026',
      score: 9.5,
      status: 'Aprovado',
      materials: 2,
      notes: 'Pequeno desgaste na capa de um livro',
      inspector: 'Prof. Ana Santos'
    },
    {
      id: 3,
      date: '08/01/2026',
      score: 10,
      status: 'Aprovado',
      materials: 4,
      notes: 'Excelente estado de conservação',
      inspector: 'Prof. Carlos Silva'
    }
  ];

  const checklist = [
    { id: 1, item: 'Capas sem rasgos ou dobras', checked: true },
    { id: 2, item: 'Páginas sem manchas ou anotações', checked: true },
    { id: 3, item: 'Lombada intacta', checked: true },
    { id: 4, item: 'Código de barras legível', checked: false },
    { id: 5, item: 'Sem sinais de umidade', checked: true }
  ];

  return (
    <div className="pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-secondary p-6 md:p-8 rounded-b-3xl shadow-lg mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold text-2xl md:text-3xl mb-2">
                Fiscalização Mensal
              </h2>
              <p className="text-white/90 text-sm">
                Inspeção de materiais
              </p>
            </div>
            <ClipboardCheck className="w-12 h-12 md:w-16 md:h-16 text-white/30" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6">
        {/* Admin Quick Access */}
        {onNavigateToApproval && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/10 dark:to-blue-900/10 border-indigo-300 dark:border-indigo-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-500 rounded-xl shadow-lg">
                    <PackageSearch className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Área Administrativa</h3>
                    <p className="text-sm text-muted-foreground">
                      Gerencie solicitações de empréstimos pendentes
                    </p>
                  </div>
                </div>
                <Button onClick={onNavigateToApproval} className="bg-indigo-500 hover:bg-indigo-600">
                  Acessar Aprovações
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Next Inspection Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border-yellow-300 dark:border-yellow-700">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-yellow-500 rounded-xl shadow-lg">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Próxima Fiscalização</h3>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{nextInspection.date} às {nextInspection.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ClipboardCheck className="w-4 h-4 text-muted-foreground" />
                    <span>{nextInspection.location}</span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-200 dark:bg-yellow-900/40 rounded-full">
                  <Clock className="w-4 h-4 text-yellow-700 dark:text-yellow-300" />
                  <span className="text-sm font-semibold text-yellow-900 dark:text-yellow-200">
                    Em {nextInspection.daysLeft} dias
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Inspection Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="font-bold text-xl mb-4">Checklist de Inspeção</h3>
          <Card>
            <p className="text-sm text-muted-foreground mb-4">
              Use este checklist para preparar seus materiais antes da fiscalização oficial.
            </p>
            <div className="space-y-3">
              {checklist.map((item) => (
                <label
                  key={item.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    readOnly
                    className="mt-0.5 w-5 h-5 rounded border-2 border-primary text-primary focus:ring-2 focus:ring-primary cursor-pointer"
                  />
                  <span className={`flex-1 ${item.checked ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {item.item}
                  </span>
                  {item.checked ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  )}
                </label>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progresso</span>
                <span className="text-sm font-bold">{Math.round((checklist.filter(i => i.checked).length / checklist.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                  style={{ width: `${(checklist.filter(i => i.checked).length / checklist.length) * 100}%` }}
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Inspection History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-bold text-xl mb-4">Histórico de Fiscalizações</h3>
          <div className="space-y-3">
            {inspectionHistory.map((inspection) => (
              <Card key={inspection.id} className="border-l-4 border-l-green-500">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{inspection.date}</h4>
                      <Badge variant="success">{inspection.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Inspetor: {inspection.inspector}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {inspection.score}
                    </div>
                    <p className="text-xs text-muted-foreground">nota</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Materiais inspecionados:</span>
                    <span className="font-medium">{inspection.materials}</span>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm italic">"{inspection.notes}"</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Info */}
        <Card className="bg-accent border-primary/20">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ClipboardCheck className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Sobre as Fiscalizações</h4>
              <p className="text-sm text-muted-foreground">
                As fiscalizações mensais são obrigatórias e avaliam o estado de conservação dos materiais.
                Notas altas garantem pontos extras e melhor posição no ranking. A ausência resulta em penalidades.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}