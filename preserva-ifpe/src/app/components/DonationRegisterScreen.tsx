import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Gift, Plus, Trash2, Package } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { Input } from './Input';
import { Badge } from './Badge';
import {
  getDonors,
  getMaterials,
  saveDonation,
  type Donor,
  type SchoolMaterial,
  type DonationItem,
} from '../lib/storage';

export function DonationRegisterScreen() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [materials, setMaterials] = useState<SchoolMaterial[]>([]);
  const [donorId, setDonorId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [items, setItems] = useState<DonationItem[]>([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setDonors(getDonors());
    setMaterials(getMaterials());
  }, []);

  const addItem = () => {
    if (!selectedMaterialId || !quantity) {
      alert('Selecione o material e informe a quantidade');
      return;
    }
    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      alert('Quantidade inválida');
      return;
    }
    const material = materials.find((m) => m.id === selectedMaterialId);
    if (!material) return;

    const existing = items.find((i) => i.materialId === selectedMaterialId);
    if (existing) {
      setItems(
        items.map((i) =>
          i.materialId === selectedMaterialId
            ? { ...i, quantity: i.quantity + qty }
            : i
        )
      );
    } else {
      setItems([
        ...items,
        {
          materialId: material.id,
          materialName: material.name,
          quantity: qty,
        },
      ]);
    }
    setSelectedMaterialId('');
    setQuantity('1');
  };

  const removeItem = (materialId: string) => {
    setItems(items.filter((i) => i.materialId !== materialId));
  };

  const handleSubmit = () => {
    if (!donorId) {
      alert('Selecione um doador');
      return;
    }
    if (items.length === 0) {
      alert('Adicione ao menos um material');
      return;
    }
    if (!date) {
      alert('Informe a data da doação');
      return;
    }
    const donor = donors.find((d) => d.id === donorId);
    if (!donor) return;

    saveDonation({
      donorId: donor.id,
      donorName: donor.name,
      items: [...items],
      date,
    });

    setDonorId('');
    setItems([]);
    setDate(new Date().toISOString().slice(0, 10));
    setMaterials(getMaterials());
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="pb-20 md:pb-6">
      <div className="bg-gradient-to-br from-primary to-secondary p-6 md:p-8 rounded-b-3xl shadow-lg mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold text-2xl md:text-3xl mb-2">
                Registrar Doação
              </h2>
              <p className="text-white/90 text-sm">
                Registre doações e atualize o estoque automaticamente
              </p>
            </div>
            <Gift className="w-12 h-12 md:w-16 md:h-16 text-white/30" />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-6 space-y-6">
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <p className="text-green-700 dark:text-green-400 font-medium text-center">
                Doação registrada com sucesso! Estoque atualizado.
              </p>
            </Card>
          </motion.div>
        )}

        <Card>
          <h3 className="font-semibold text-lg mb-4">Dados da Doação</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Doador *
              </label>
              <select
                value={donorId}
                onChange={(e) => setDonorId(e.target.value)}
                className="w-full px-4 py-2.5 bg-input-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Selecione o doador...</option>
                {donors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} — {d.school}
                  </option>
                ))}
              </select>
              {donors.length === 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Cadastre doadores antes de registrar doações
                </p>
              )}
            </div>

            <Input
              label="Data da doação *"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-lg mb-4">Materiais Doados</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_100px_auto] gap-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Material
                </label>
                <select
                  value={selectedMaterialId}
                  onChange={(e) => setSelectedMaterialId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-input-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Selecione...</option>
                  {materials.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} (estoque: {m.quantity})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Qtd
                </label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-2.5 bg-input-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="flex items-end">
                <Button variant="secondary" onClick={addItem} className="w-full sm:w-auto">
                  <Plus className="w-4 h-4" />
                  Adicionar
                </Button>
              </div>
            </div>

            {materials.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Cadastre materiais escolares antes de registrar doações
              </p>
            )}

            {items.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-border">
                {items.map((item) => (
                  <div
                    key={item.materialId}
                    className="flex items-center justify-between bg-muted/50 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Package className="w-4 h-4 text-primary shrink-0" />
                      <span className="font-medium truncate">{item.materialName}</span>
                      <Badge variant="info">{item.quantity} un.</Badge>
                    </div>
                    <button
                      onClick={() => removeItem(item.materialId)}
                      className="p-1.5 hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        <Button
          variant="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={donors.length === 0 || materials.length === 0}
        >
          <Gift className="w-4 h-4" />
          Registrar Doação
        </Button>
      </div>
    </div>
  );
}
