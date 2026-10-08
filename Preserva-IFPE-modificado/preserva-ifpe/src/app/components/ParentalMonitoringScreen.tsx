import { useState } from 'react';
import { Users, Eye, Clock, CheckCircle, AlertTriangle, BookOpen, Shield } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';

export interface ChildRecord {
  id: string;
  name: string;
  className: string;
  overallStatus: 'Bom' | 'Atenção';
  materials: { id: string; name: string; status: 'Bom' | 'Atenção'; borrowDate: string; dueDate: string; daysLeft: number; lastCheck: string }[];
  activities: { id: string; type: string; message: string; date: string; time: string }[];
  stats: { label: string; value: string }[];
}

export const parentChildren: ChildRecord[] = [
  {
    id: 'joao',
    name: 'João Silva Santos',
    className: '2º Ano - Informática',
    overallStatus: 'Bom',
    materials: [
      { id: 'j1', name: 'Matemática - Vol. 2', status: 'Bom', borrowDate: '01/04/2026', dueDate: '15/04/2026', daysLeft: 7, lastCheck: '07/04/2026 às 10:30' },
      { id: 'j2', name: 'Física Moderna', status: 'Bom', borrowDate: '05/04/2026', dueDate: '20/04/2026', daysLeft: 12, lastCheck: '07/04/2026 às 10:30' },
      { id: 'j3', name: 'Química Orgânica', status: 'Atenção', borrowDate: '08/03/2026', dueDate: '10/04/2026', daysLeft: 2, lastCheck: '07/04/2026 às 10:30' },
    ],
    activities: [
      { id: 'a1', type: 'borrow', message: 'Empréstimo do livro "Física Moderna"', date: '05/04/2026', time: '14:30' },
      { id: 'a2', type: 'inspection', message: 'Fiscalização mensal realizada - Nota: 10/10', date: '08/03/2026', time: '15:00' },
      { id: 'a3', type: 'warning', message: 'Aviso: devolução de Química Orgânica em 2 dias', date: '08/04/2026', time: '09:00' },
    ],
    stats: [
      { label: 'Devoluções no prazo', value: '8/8' },
      { label: 'Pontos acumulados', value: '850' },
      { label: 'Fiscalizações', value: '3/3' },
    ],
  },
  {
    id: 'ana',
    name: 'Ana Silva Santos',
    className: '1º Ano - Informática',
    overallStatus: 'Atenção',
    materials: [
      { id: 'n1', name: 'Português - Vol. 1', status: 'Bom', borrowDate: '02/04/2026', dueDate: '22/04/2026', daysLeft: 14, lastCheck: '06/04/2026 às 09:10' },
      { id: 'n2', name: 'Biologia', status: 'Atenção', borrowDate: '12/03/2026', dueDate: '09/04/2026', daysLeft: 1, lastCheck: '06/04/2026 às 09:10' },
    ],
    activities: [
      { id: 'b1', type: 'borrow', message: 'Empréstimo do livro "Português - Vol. 1"', date: '02/04/2026', time: '11:20' },
      { id: 'b2', type: 'warning', message: 'Biologia vence amanhã', date: '08/04/2026', time: '08:15' },
    ],
    stats: [
      { label: 'Devoluções no prazo', value: '5/6' },
      { label: 'Pontos acumulados', value: '420' },
      { label: 'Fiscalizações', value: '2/3' },
    ],
  },
];

export function ParentalMonitoringScreen({
  selectedId,
  onSelect,
}: {
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  const [localId, setLocalId] = useState(selectedId || parentChildren[0].id);
  const activeId = selectedId || localId;
  const child = parentChildren.find((item) => item.id === activeId) || parentChildren[0];
  const [notice, setNotice] = useState('');

  const choose = (id: string) => {
    const next = parentChildren.find((item) => item.id === id);
    if (!next) {
      setNotice('Não foi possível selecionar este filho. Escolha um cadastro vinculado.');
      return;
    }
    setLocalId(id);
    onSelect?.(id);
    setNotice(`Filho selecionado: ${next.name}. Materiais e atividades foram atualizados.`);
  };

  return (
    <div className="pb-20 md:pb-6">
      <div className="bg-gradient-to-br from-primary to-secondary p-6 md:p-8 rounded-b-3xl shadow-lg mb-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-white font-bold text-2xl md:text-3xl mb-2">Monitoria parental</h2>
          <p className="text-white/90">Acompanhe apenas os filhos vinculados à sua conta.</p>
        </div>
      </div>

      <div className="px-4 md:px-6 max-w-7xl mx-auto space-y-6">
        <Card>
          <label htmlFor="filho" className="block text-sm font-medium mb-1.5">Selecionar filho</label>
          <div className="flex flex-col gap-3 md:flex-row">
            <select
              id="filho"
              value={child.id}
              onChange={(event) => choose(event.target.value)}
              className="w-full rounded-lg border border-input bg-input-background px-3 py-2.5"
            >
              {parentChildren.map((item) => (
                <option key={item.id} value={item.id}>{item.name} — {item.className}</option>
              ))}
            </select>
            <Button type="button" onClick={() => choose(child.id)}>Atualizar dados</Button>
          </div>
          {notice && <p role="status" className="mt-3 text-sm text-green-700">{notice}</p>}
        </Card>

        <div className="grid gap-3 md:grid-cols-2">
          {parentChildren.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => choose(item.id)}
              className={`rounded-xl border p-4 text-left ${item.id === child.id ? 'border-primary bg-blue-50' : 'border-border bg-card'}`}
              aria-pressed={item.id === child.id}
            >
              <span className="font-semibold">{item.name}</span>
              <span className="mt-1 block text-sm text-muted-foreground">{item.className}</span>
              <span className="mt-2 block text-sm">{item.id === child.id ? 'Selecionado' : 'Selecionar'}</span>
            </button>
          ))}
        </div>

        <Card>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold">{child.name}</h3>
              <p className="text-sm text-muted-foreground">{child.className} · {child.materials.length} materiais</p>
            </div>
            <Badge variant={child.overallStatus === 'Bom' ? 'success' : 'warning'}>{child.overallStatus}</Badge>
          </div>
        </Card>

        <div className="grid gap-3 md:grid-cols-3">
          {child.stats.map((stat) => (
            <Card key={stat.label}>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </Card>
          ))}
        </div>

        <div>
          <h3 className="mb-3 text-lg font-bold">Materiais de {child.name.split(' ')[0]}</h3>
          <div className="grid gap-3">
            {child.materials.map((material) => (
              <Card key={material.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold">{material.name}</h4>
                    <p className="text-sm text-muted-foreground">Retirada {material.borrowDate} · Devolução {material.dueDate}</p>
                    <p className="text-sm">{material.daysLeft} dia(s) restante(s) · Última checagem {material.lastCheck}</p>
                  </div>
                  <Badge variant={material.status === 'Bom' ? 'success' : 'warning'}>{material.status}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-bold">Atividades de {child.name.split(' ')[0]}</h3>
          {child.activities.map((activity) => (
            <Card key={activity.id} className="mb-3">
              <p className="font-medium">{activity.message}</p>
              <p className="text-sm text-muted-foreground">{activity.date} às {activity.time}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

void Users; void Eye; void Clock; void CheckCircle; void AlertTriangle; void BookOpen; void Shield;
