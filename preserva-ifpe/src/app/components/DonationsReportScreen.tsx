import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { FileText, Search, Calendar, User, Package } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';
import { getDonations, getDonors, type Donation } from '../lib/storage';

export function DonationsReportScreen() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [donorFilter, setDonorFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setDonations(getDonations());
  }, []);

  const donors = useMemo(() => getDonors(), [donations]);

  const filtered = useMemo(() => {
    return donations.filter((d) => {
      if (donorFilter !== 'all' && d.donorId !== donorFilter) return false;
      if (dateFrom && d.date < dateFrom) return false;
      if (dateTo && d.date > dateTo) return false;
      if (search) {
        const q = search.toLowerCase();
        const matchDonor = d.donorName.toLowerCase().includes(q);
        const matchMaterial = d.items.some((i) =>
          i.materialName.toLowerCase().includes(q)
        );
        if (!matchDonor && !matchMaterial) return false;
      }
      return true;
    });
  }, [donations, donorFilter, dateFrom, dateTo, search]);

  const totalItems = filtered.reduce(
    (sum, d) => sum + d.items.reduce((s, i) => s + i.quantity, 0),
    0
  );

  const handleExport = () => {
    const lines = [
      'Relatório de Doações - Preserva IFPE',
      `Gerado em: ${new Date().toLocaleString('pt-BR')}`,
      `Total de doações: ${filtered.length}`,
      `Total de itens: ${totalItems}`,
      '',
      'Data | Doador | Materiais | Quantidade total',
      ...filtered.map((d) => {
        const mats = d.items
          .map((i) => `${i.materialName} (${i.quantity})`)
          .join('; ');
        const qty = d.items.reduce((s, i) => s + i.quantity, 0);
        return `${new Date(d.date + 'T12:00:00').toLocaleDateString('pt-BR')} | ${d.donorName} | ${mats} | ${qty}`;
      }),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-doacoes-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pb-20 md:pb-6">
      <div className="bg-gradient-to-br from-primary to-secondary p-6 md:p-8 rounded-b-3xl shadow-lg mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold text-2xl md:text-3xl mb-2">
                Relatório de Doações
              </h2>
              <p className="text-white/90 text-sm">
                {filtered.length} {filtered.length === 1 ? 'doação' : 'doações'} ·{' '}
                {totalItems} itens
              </p>
            </div>
            <FileText className="w-12 h-12 md:w-16 md:h-16 text-white/30" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6">
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Doador ou material..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-input-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Doador
              </label>
              <select
                value={donorFilter}
                onChange={(e) => setDonorFilter(e.target.value)}
                className="w-full px-4 py-2.5 bg-input-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">Todos</option>
                {donors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                De
              </label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full px-4 py-2.5 bg-input-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Até
              </label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full px-4 py-2.5 bg-input-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" onClick={handleExport} disabled={filtered.length === 0}>
              <FileText className="w-4 h-4" />
              Exportar TXT
            </Button>
          </div>
        </Card>

        {filtered.length === 0 ? (
          <Card className="p-8 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">
              {donations.length === 0
                ? 'Nenhuma doação registrada ainda'
                : 'Nenhuma doação encontrada com os filtros aplicados'}
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filtered.map((donation, index) => (
              <motion.div
                key={donation.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold">{donation.donorName}</h3>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(donation.date + 'T12:00:00').toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                    <Badge variant="success">
                      {donation.items.reduce((s, i) => s + i.quantity, 0)} itens
                    </Badge>
                  </div>
                  <div className="space-y-2 pt-3 border-t border-border">
                    {donation.items.map((item) => (
                      <div
                        key={item.materialId}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="flex items-center gap-2 text-muted-foreground">
                          <Package className="w-3.5 h-3.5" />
                          {item.materialName}
                        </span>
                        <span className="font-medium">{item.quantity} un.</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
