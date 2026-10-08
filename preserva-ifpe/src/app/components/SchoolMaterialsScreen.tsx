import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Package, Plus, Pencil, Trash2, X } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { Input } from './Input';
import { Badge } from './Badge';
import {
  getMaterials,
  saveMaterial,
  deleteMaterial,
  type SchoolMaterial,
} from '../lib/storage';

const CATEGORIES = [
  'Livro',
  'Caderno',
  'Material de Escrita',
  'Equipamento',
  'Laboratório',
  'Uniforme',
  'Outro',
];

const CONDITIONS = ['Novo', 'Bom', 'Regular', 'Usado'];

const emptyForm = {
  name: '',
  quantity: '',
  category: '',
  condition: 'Bom',
};

export function SchoolMaterialsScreen() {
  const [materials, setMaterials] = useState<SchoolMaterial[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<SchoolMaterial | null>(null);
  const [form, setForm] = useState(emptyForm);

  const load = () => setMaterials(getMaterials());

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (material: SchoolMaterial) => {
    setEditing(material);
    setForm({
      name: material.name,
      quantity: String(material.quantity),
      category: material.category,
      condition: material.condition,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (
      !form.name.trim() ||
      form.quantity === '' ||
      !form.category ||
      !form.condition
    ) {
      alert('Preencha todos os campos');
      return;
    }
    const qty = parseInt(form.quantity, 10);
    if (isNaN(qty) || qty < 0) {
      alert('Quantidade inválida');
      return;
    }
    saveMaterial({
      id: editing?.id,
      name: form.name.trim(),
      quantity: qty,
      category: form.category,
      condition: form.condition,
    });
    setShowModal(false);
    setEditing(null);
    setForm(emptyForm);
    load();
  };

  const handleDelete = (id: string) => {
    if (confirm('Excluir este material?')) {
      deleteMaterial(id);
      load();
    }
  };

  const totalStock = materials.reduce((sum, m) => sum + m.quantity, 0);

  return (
    <div className="pb-20 md:pb-6">
      <div className="bg-gradient-to-br from-primary to-secondary p-6 md:p-8 rounded-b-3xl shadow-lg mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold text-2xl md:text-3xl mb-2">
                Materiais Escolares
              </h2>
              <p className="text-white/90 text-sm">
                {materials.length === 0
                  ? 'Nenhum material no estoque'
                  : `${materials.length} tipos · ${totalStock} unidades em estoque`}
              </p>
            </div>
            <Package className="w-12 h-12 md:w-16 md:h-16 text-white/30" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-4">
        <div className="flex justify-end">
          <Button variant="primary" onClick={openCreate}>
            <Plus className="w-4 h-4" />
            Novo Material
          </Button>
        </div>

        {materials.length === 0 ? (
          <Card className="p-8 text-center">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">Nenhum material cadastrado ainda</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {materials.map((material, index) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Package className="w-6 h-6 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold truncate">{material.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="info">{material.category}</Badge>
                          <Badge
                            variant={
                              material.condition === 'Novo' || material.condition === 'Bom'
                                ? 'success'
                                : 'warning'
                            }
                          >
                            {material.condition}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Estoque:{' '}
                          <span className="font-semibold text-foreground">
                            {material.quantity}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => openEdit(material)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        aria-label="Editar"
                      >
                        <Pencil className="w-4 h-4 text-primary" />
                      </button>
                      <button
                        onClick={() => handleDelete(material.id)}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                        aria-label="Excluir"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
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
                  {editing ? 'Editar Material' : 'Novo Material'}
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
                label="Nome do material"
                placeholder="Ex: Caderno universitário"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                label="Quantidade"
                type="number"
                min={0}
                placeholder="0"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Categoria
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-input-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Selecione...</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Estado do material
                </label>
                <select
                  value={form.condition}
                  onChange={(e) => setForm({ ...form, condition: e.target.value })}
                  className="w-full px-4 py-2.5 bg-input-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {CONDITIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
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
