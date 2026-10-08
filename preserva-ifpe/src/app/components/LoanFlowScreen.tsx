import { useState } from 'react';
import { ArrowLeft, Package, Calendar, Clock, CheckCircle2, XCircle, AlertCircle, Filter, Search } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';

type LoanStatus = 'pending' | 'approved' | 'in_use' | 'returned' | 'rejected' | 'overdue';

interface Loan {
  id: string;
  materialName: string;
  category: string;
  requestDate: string;
  approvalDate?: string;
  dueDate?: string;
  returnDate?: string;
  status: LoanStatus;
  quantity: number;
  location: string;
  approver?: string;
  rejectionReason?: string;
}

type ViewMode = 'list' | 'request' | 'details';

export function LoanFlowScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [filterStatus, setFilterStatus] = useState<LoanStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const [loans] = useState<Loan[]>([
    {
      id: 'L001',
      materialName: 'Livro: Algoritmos e Estruturas de Dados',
      category: 'Livro',
      requestDate: '2026-04-10',
      approvalDate: '2026-04-11',
      dueDate: '2026-04-25',
      status: 'in_use',
      quantity: 1,
      location: 'Biblioteca - Prateleira A3',
      approver: 'Prof. Carlos Silva'
    },
    {
      id: 'L002',
      materialName: 'Calculadora Científica HP 12C',
      category: 'Equipamento',
      requestDate: '2026-04-14',
      status: 'pending',
      quantity: 1,
      location: 'Almoxarifado Central'
    },
    {
      id: 'L003',
      materialName: 'Kit de Química - Vidrarias',
      category: 'Laboratório',
      requestDate: '2026-04-08',
      approvalDate: '2026-04-08',
      dueDate: '2026-04-15',
      status: 'overdue',
      quantity: 1,
      location: 'Laboratório 203',
      approver: 'Prof. Ana Maria'
    },
    {
      id: 'L004',
      materialName: 'Apostila de Programação em Python',
      category: 'Apostila',
      requestDate: '2026-03-20',
      approvalDate: '2026-03-21',
      dueDate: '2026-04-05',
      returnDate: '2026-04-04',
      status: 'returned',
      quantity: 1,
      location: 'Coordenação de Informática',
      approver: 'Coord. Roberto Lima'
    },
    {
      id: 'L005',
      materialName: 'Projetor Multimídia Epson',
      category: 'Equipamento',
      requestDate: '2026-04-12',
      approvalDate: '2026-04-13',
      status: 'rejected',
      quantity: 1,
      location: 'Sala de Recursos',
      approver: 'Admin. Paula Santos',
      rejectionReason: 'Equipamento já reservado para outro evento no período solicitado.'
    }
  ]);

  const getStatusConfig = (status: LoanStatus) => {
    const configs = {
      pending: { label: 'Pendente', variant: 'warning' as const, icon: Clock },
      approved: { label: 'Aprovado', variant: 'info' as const, icon: CheckCircle2 },
      in_use: { label: 'Em Uso', variant: 'success' as const, icon: Package },
      returned: { label: 'Devolvido', variant: 'default' as const, icon: CheckCircle2 },
      rejected: { label: 'Rejeitado', variant: 'error' as const, icon: XCircle },
      overdue: { label: 'Atrasado', variant: 'error' as const, icon: AlertCircle }
    };
    return configs[status];
  };

  const filteredLoans = loans.filter(loan => {
    const matchesStatus = filterStatus === 'all' || loan.status === filterStatus;
    const matchesSearch = loan.materialName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const activeLoanCount = loans.filter(l => l.status === 'in_use').length;
  const pendingLoanCount = loans.filter(l => l.status === 'pending').length;
  const overdueLoanCount = loans.filter(l => l.status === 'overdue').length;

  // Request Form Component
  const RequestForm = () => {
    const [formData, setFormData] = useState({
      materialType: '',
      materialName: '',
      quantity: 1,
      purpose: '',
      duration: '7'
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Aqui seria enviado para o backend
      alert('Solicitação enviada com sucesso! Aguarde aprovação.');
      setViewMode('list');
    };

    return (
      <div className="min-h-screen bg-background pb-20 md:pb-8">
        <div className="bg-primary text-primary-foreground p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setViewMode('list')}
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Voltar</span>
            </button>
            <h1 className="text-2xl md:text-3xl font-bold">Nova Solicitação de Empréstimo</h1>
            <p className="text-primary-foreground/80 mt-2">Preencha os dados para solicitar um material</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 -mt-4">
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tipo de Material *
                </label>
                <select
                  required
                  value={formData.materialType}
                  onChange={(e) => setFormData({ ...formData, materialType: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                >
                  <option value="">Selecione...</option>
                  <option value="livro">Livro</option>
                  <option value="apostila">Apostila</option>
                  <option value="equipamento">Equipamento Eletrônico</option>
                  <option value="laboratorio">Material de Laboratório</option>
                  <option value="ferramenta">Ferramenta</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome do Material *
                </label>
                <input
                  type="text"
                  required
                  value={formData.materialName}
                  onChange={(e) => setFormData({ ...formData, materialName: e.target.value })}
                  placeholder="Ex: Calculadora HP 12C, Livro de Física Vol. 2..."
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Quantidade *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="10"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Finalidade do Empréstimo *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  placeholder="Descreva para qual finalidade você precisa do material..."
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Período de Empréstimo *
                </label>
                <select
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                >
                  <option value="3">3 dias</option>
                  <option value="7">7 dias</option>
                  <option value="14">14 dias</option>
                  <option value="30">30 dias</option>
                </select>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h3 className="font-semibold text-sm text-foreground mb-2">⚠️ Termos de Responsabilidade</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Você é responsável pelo material durante todo o período de empréstimo</li>
                  <li>• Danos ou perda podem resultar em penalidades e cobrança de reposição</li>
                  <li>• O atraso na devolução impacta sua pontuação no sistema de gamificação</li>
                  <li>• Empréstimos atrasados podem bloquear novas solicitações</li>
                </ul>
                <label className="flex items-center gap-2 mt-3">
                  <input
                    type="checkbox"
                    required
                    className="w-4 h-4 text-primary rounded border-border focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">Li e aceito os termos de responsabilidade</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setViewMode('list')}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  Enviar Solicitação
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    );
  };

  // Loan Details Component
  const LoanDetails = ({ loan }: { loan: Loan }) => {
    const statusConfig = getStatusConfig(loan.status);
    const StatusIcon = statusConfig.icon;

    return (
      <div className="min-h-screen bg-background pb-20 md:pb-8">
        <div className="bg-primary text-primary-foreground p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setViewMode('list')}
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Voltar</span>
            </button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Detalhes do Empréstimo</h1>
                <p className="text-primary-foreground/80 mt-2">ID: {loan.id}</p>
              </div>
              <Badge variant={statusConfig.variant}>
                <StatusIcon className="w-4 h-4 mr-1" />
                {statusConfig.label}
              </Badge>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 -mt-4 space-y-4">
          {/* Material Info */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Informações do Material</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Material</span>
                <span className="text-sm font-medium text-foreground text-right">{loan.materialName}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Categoria</span>
                <span className="text-sm font-medium text-foreground">{loan.category}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Quantidade</span>
                <span className="text-sm font-medium text-foreground">{loan.quantity}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Localização</span>
                <span className="text-sm font-medium text-foreground text-right">{loan.location}</span>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Linha do Tempo</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  {(loan.approvalDate || loan.status !== 'pending') && <div className="w-0.5 h-full bg-border mt-2" />}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-medium text-foreground">Solicitação Enviada</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(loan.requestDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              {loan.approvalDate && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    </div>
                    {loan.returnDate && <div className="w-0.5 h-full bg-border mt-2" />}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-medium text-foreground">Aprovado por {loan.approver}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(loan.approvalDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              )}

              {loan.dueDate && loan.status === 'in_use' && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-warning" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Prazo de Devolução</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(loan.dueDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              )}

              {loan.returnDate && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Material Devolvido</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(loan.returnDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              )}

              {loan.status === 'rejected' && loan.rejectionReason && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-error/10 flex items-center justify-center">
                      <XCircle className="w-4 h-4 text-error" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Solicitação Rejeitada</p>
                    <p className="text-xs text-muted-foreground mt-1">{loan.rejectionReason}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Actions */}
          {loan.status === 'in_use' && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Ações Disponíveis</h2>
              <Button variant="outline" className="w-full">
                <Package className="w-4 h-4 mr-2" />
                Solicitar Renovação
              </Button>
            </Card>
          )}

          {loan.status === 'overdue' && (
            <Card className="p-6 bg-error/5 border-error">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-error mb-2">Material em Atraso</h3>
                  <p className="text-sm text-foreground/80 mb-4">
                    Este material está em atraso. Providencie a devolução o quanto antes para evitar penalidades.
                  </p>
                  <Button variant="default" className="w-full">
                    Contatar Coordenação
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    );
  };

  // Main List View
  if (viewMode === 'request') {
    return <RequestForm />;
  }

  if (viewMode === 'details' && selectedLoan) {
    return <LoanDetails loan={selectedLoan} />;
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">Sistema de Empréstimos</h1>
          <p className="text-primary-foreground/80 mt-2">Gerencie seus empréstimos de materiais</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Em Uso</p>
                <p className="text-2xl font-bold text-foreground mt-1">{activeLoanCount}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-success" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold text-foreground mt-1">{pendingLoanCount}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Atrasados</p>
                <p className="text-2xl font-bold text-foreground mt-1">{overdueLoanCount}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-error" />
              </div>
            </div>
          </Card>
        </div>

        {/* New Request Button */}
        <div className="mb-6">
          <Button onClick={() => setViewMode('request')} className="w-full md:w-auto">
            <Package className="w-4 h-4 mr-2" />
            Nova Solicitação de Empréstimo
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-4 mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar material..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as LoanStatus | 'all')}
                className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                <option value="all">Todos</option>
                <option value="pending">Pendentes</option>
                <option value="approved">Aprovados</option>
                <option value="in_use">Em Uso</option>
                <option value="overdue">Atrasados</option>
                <option value="returned">Devolvidos</option>
                <option value="rejected">Rejeitados</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Loans List */}
        <div className="space-y-4">
          {filteredLoans.length === 0 ? (
            <Card className="p-8 text-center">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">Nenhum empréstimo encontrado</p>
            </Card>
          ) : (
            filteredLoans.map((loan) => {
              const statusConfig = getStatusConfig(loan.status);
              const StatusIcon = statusConfig.icon;
              const daysUntilDue = loan.dueDate 
                ? Math.ceil((new Date(loan.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                : null;

              return (
                <Card
                  key={loan.id}
                  className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedLoan(loan);
                    setViewMode('details');
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Package className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground mb-1 truncate">{loan.materialName}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{loan.category} • ID: {loan.id}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant={statusConfig.variant}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusConfig.label}
                            </Badge>
                            {daysUntilDue !== null && loan.status === 'in_use' && (
                              <Badge variant={daysUntilDue <= 3 ? 'warning' : 'default'}>
                                <Calendar className="w-3 h-3 mr-1" />
                                {daysUntilDue > 0 ? `${daysUntilDue} dias restantes` : 'Vence hoje'}
                              </Badge>
                            )}
                          </div>

                          <div className="text-xs text-muted-foreground space-y-1">
                            <p>📅 Solicitado em {new Date(loan.requestDate).toLocaleDateString('pt-BR')}</p>
                            {loan.approver && <p>✅ Aprovado por {loan.approver}</p>}
                            {loan.dueDate && loan.status === 'in_use' && (
                              <p>🔔 Devolução até {new Date(loan.dueDate).toLocaleDateString('pt-BR')}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
