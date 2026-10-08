import { useState } from 'react';
import { CheckCircle2, XCircle, Clock, Package, User, Calendar, MessageSquare } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';

interface PendingLoan {
  id: string;
  studentName: string;
  studentId: string;
  materialName: string;
  category: string;
  quantity: number;
  purpose: string;
  requestDate: string;
  requestedDuration: number;
  location: string;
}

export function LoanApprovalScreen() {
  const [selectedLoan, setSelectedLoan] = useState<PendingLoan | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  // Mock data - solicitações pendentes
  const [pendingLoans, setPendingLoans] = useState<PendingLoan[]>([
    {
      id: 'L002',
      studentName: 'Maria Silva Santos',
      studentId: '20231TADS0001',
      materialName: 'Calculadora Científica HP 12C',
      category: 'Equipamento',
      quantity: 1,
      purpose: 'Utilização nas aulas de Matemática Financeira durante o semestre 2026.1',
      requestDate: '2026-04-14',
      requestedDuration: 7,
      location: 'Almoxarifado Central'
    },
    {
      id: 'L006',
      studentName: 'João Pedro Oliveira',
      studentId: '20231TINFO0015',
      materialName: 'Livro: Python para Iniciantes',
      category: 'Livro',
      quantity: 1,
      purpose: 'Estudo para desenvolvimento do projeto integrador da disciplina de Programação I',
      requestDate: '2026-04-15',
      requestedDuration: 14,
      location: 'Biblioteca - Seção Informática'
    },
    {
      id: 'L007',
      studentName: 'Ana Carolina Ferreira',
      studentId: '20231TQUIM0023',
      materialName: 'Kit de Pipetas Volumétricas',
      category: 'Laboratório',
      quantity: 1,
      purpose: 'Realização de experimentos práticos de Química Analítica',
      requestDate: '2026-04-16',
      requestedDuration: 3,
      location: 'Laboratório 203'
    }
  ]);

  const handleApprove = (loan: PendingLoan) => {
    setSelectedLoan(loan);
    setShowApprovalModal(true);
  };

  const handleReject = (loan: PendingLoan) => {
    setSelectedLoan(loan);
    setShowRejectionModal(true);
  };

  const confirmApproval = () => {
    if (selectedLoan) {
      setPendingLoans(pendingLoans.filter(l => l.id !== selectedLoan.id));
      alert(`Empréstimo ${selectedLoan.id} aprovado com sucesso!`);
      setShowApprovalModal(false);
      setSelectedLoan(null);
    }
  };

  const confirmRejection = () => {
    if (selectedLoan && rejectionReason.trim()) {
      setPendingLoans(pendingLoans.filter(l => l.id !== selectedLoan.id));
      alert(`Empréstimo ${selectedLoan.id} rejeitado.`);
      setShowRejectionModal(false);
      setSelectedLoan(null);
      setRejectionReason('');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">Aprovação de Empréstimos</h1>
          <p className="text-primary-foreground/80 mt-2">
            Gerencie solicitações pendentes de empréstimo de materiais
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-4">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold text-foreground mt-1">{pendingLoans.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Aprovados Hoje</p>
                <p className="text-2xl font-bold text-foreground mt-1">5</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-success" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejeitados Hoje</p>
                <p className="text-2xl font-bold text-foreground mt-1">1</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-error" />
              </div>
            </div>
          </Card>
        </div>

        {/* Pending Loans List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Clock className="w-5 h-5 text-warning" />
            Solicitações Pendentes
          </h2>

          {pendingLoans.length === 0 ? (
            <Card className="p-8 text-center">
              <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">Não há solicitações pendentes no momento</p>
            </Card>
          ) : (
            pendingLoans.map((loan) => (
              <Card key={loan.id} className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{loan.materialName}</h3>
                        <Badge variant="warning">
                          <Clock className="w-3 h-3 mr-1" />
                          Pendente
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">ID: {loan.id} • {loan.category}</p>
                    </div>
                  </div>

                  {/* Student Info */}
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Aluno</p>
                          <p className="text-sm font-medium text-foreground">{loan.studentName}</p>
                          <p className="text-xs text-muted-foreground">Matrícula: {loan.studentId}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Solicitação</p>
                          <p className="text-sm font-medium text-foreground">
                            {new Date(loan.requestDate).toLocaleDateString('pt-BR')}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Período: {loan.requestedDuration} dias
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Package className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Quantidade</p>
                        <p className="text-sm text-foreground">{loan.quantity} unidade(s)</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Package className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Localização</p>
                        <p className="text-sm text-foreground">{loan.location}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <MessageSquare className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">Finalidade</p>
                        <p className="text-sm text-foreground">{loan.purpose}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      className="flex-1 border-error text-error hover:bg-error hover:text-white"
                      onClick={() => handleReject(loan)}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Rejeitar
                    </Button>
                    <Button
                      className="flex-1 bg-success hover:bg-success/90"
                      onClick={() => handleApprove(loan)}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Aprovar
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Approval Modal */}
      {showApprovalModal && selectedLoan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Aprovar Empréstimo</h3>
              <p className="text-sm text-muted-foreground">
                Você está prestes a aprovar o empréstimo:
              </p>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mb-6 space-y-2">
              <p className="text-sm">
                <strong>Material:</strong> {selectedLoan.materialName}
              </p>
              <p className="text-sm">
                <strong>Aluno:</strong> {selectedLoan.studentName}
              </p>
              <p className="text-sm">
                <strong>Período:</strong> {selectedLoan.requestedDuration} dias
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowApprovalModal(false);
                  setSelectedLoan(null);
                }}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button onClick={confirmApproval} className="flex-1 bg-success hover:bg-success/90">
                Confirmar Aprovação
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectionModal && selectedLoan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-error" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Rejeitar Empréstimo</h3>
              <p className="text-sm text-muted-foreground">
                Informe o motivo da rejeição para o aluno
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Motivo da Rejeição *
              </label>
              <textarea
                required
                rows={4}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Descreva o motivo da rejeição..."
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowRejectionModal(false);
                  setSelectedLoan(null);
                  setRejectionReason('');
                }}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={confirmRejection}
                disabled={!rejectionReason.trim()}
                className="flex-1 bg-error hover:bg-error/90"
              >
                Confirmar Rejeição
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
