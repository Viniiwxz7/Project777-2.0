import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Plus, Pencil, Trash2, X, School, User } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { Input } from './Input';
import {
  getDonors,
  saveDonor,
  deleteDonor,
  type Donor,
} from '../lib/storage';

const emptyForm = {
  name: '',
  school: '',
  grade: '',
  responsible: '',
};

export function DonorsScreen() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Donor | null>(null);
  const [form, setForm] = useState(emptyForm);

  const load = () => setDonors(getDonors());

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (donor: Donor) => {
    setEditing(donor);
    setForm({
      name: donor.name,
      school: donor.school,
      grade: donor.grade,
      responsible: donor.responsible,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.school.trim() || !form.grade.trim() || !form.responsible.trim()) {
      alert('Preencha todos os campos');
      return;
    }
    saveDonor({
      id: editing?.id,
      name: form.name.trim(),
      school: form.school.trim(),
      grade: form.grade.trim(),
      responsible: form.responsible.trim(),
    });
    setShowModal(false);
    setEditing(null);
    setForm(emptyForm);
    load();
  };

  const handleDelete = (id: string) => {
    if (confirm('Excluir este doador?')) {
      deleteDonor(id);
      load();
    }
  };

  return (
    <div className="pb-20 md:pb-6">
      <div className="bg-gradient-to-br from-primary to-secondary p-6 md:p-8 rounded-b-3xl shadow-lg mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold text-2xl md:text-3xl mb-2">
                Cadastro de Doadores
              </h2>
              <p className="text-white/90 text-sm">
                {donors.length === 0
                  ? 'Nenhum doador cadastrado'
                  : `${donors.length} ${donors.length === 1 ? 'doador' : 'doadores'} cadastrados`}
              </p>
            </div>
            <Users className="w-12 h-12 md:w-16 md:h-16 text-white/30" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-4">
        <div className="flex justify-end">
          <Button variant="primary" onClick={openCreate}>
            <Plus className="w-4 h-4" />
            Novo Doador
          </Button>
        </div>

        {donors.length === 0 ? (
          <Card className="p-8 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">Nenhum doador cadastrado ainda</p>
          </Card>
        ) : (
          donors.map((donor, index) => (
            <motion.div
              key={donor.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shrink-0">
                      {donor.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-lg truncate">{donor.name}</h3>
                      <div className="space-y-1 mt-1 text-sm text-muted-foreground">
                        <p className="flex items-center gap-1.5">
                          <School className="w-3.5 h-3.5" />
                          {donor.school} · {donor.grade}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          Responsável: {donor.responsible}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => openEdit(donor)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      aria-label="Editar"
                    >
                      <Pencil className="w-4 h-4 text-primary" />
                    </button>
                    <button
                      onClick={() => handleDelete(donor.id)}
                      className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                      aria-label="Excluir"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-gradient-to-br from-primary to-secondary p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-xl">
                  {editing ? 'Editar Doador' : 'Novo Doador'}
                </h3>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditing(null);
                    setForm(emptyForm);
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <Input
                label="Nome"
                placeholder="Nome completo"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                label="Escola"
                placeholder="Nome da escola"
                value={form.school}
                onChange={(e) => setForm({ ...form, school: e.target.value })}
              />
              <Input
                label="Série"
                placeholder="Ex: 2º Ano"
                value={form.grade}
                onChange={(e) => setForm({ ...form, grade: e.target.value })}
              />
              <Input
                label="Responsável"
                placeholder="Nome do responsável"
                value={form.responsible}
                onChange={(e) => setForm({ ...form, responsible: e.target.value })}
              />
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowModal(false);
                    setEditing(null);
                    setForm(emptyForm);
                  }}
                >
                  Cancelar
                </Button>
                <Button variant="primary" className="flex-1" onClick={handleSave}>
                  Salvar
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
