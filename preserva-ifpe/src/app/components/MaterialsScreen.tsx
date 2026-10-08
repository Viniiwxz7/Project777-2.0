import { motion } from 'motion/react';
import { BookOpen, Calendar, AlertCircle, CheckCircle, QrCode, Package, Plus, Trash2, X, BookMarked } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { useState } from 'react';

interface Book {
  id: number;
  title: string;
  code: string;
  status: 'Bom' | 'Atenção' | 'Crítico';
  borrowDate: string;
  dueDate: string;
  daysLeft: number;
}

interface Subject {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export function MaterialsScreen() {
  const subjects: Subject[] = [
    { id: 1, name: 'Matemática', icon: '📐', color: 'from-blue-500 to-blue-600' },
    { id: 2, name: 'Física', icon: '⚛️', color: 'from-purple-500 to-purple-600' },
    { id: 3, name: 'Química', icon: '🧪', color: 'from-green-500 to-green-600' },
    { id: 4, name: 'Biologia', icon: '🧬', color: 'from-emerald-500 to-emerald-600' },
    { id: 5, name: 'História', icon: '📜', color: 'from-amber-500 to-amber-600' },
    { id: 6, name: 'Geografia', icon: '🌍', color: 'from-teal-500 to-teal-600' },
    { id: 7, name: 'Português', icon: '📚', color: 'from-red-500 to-red-600' },
    { id: 8, name: 'Inglês', icon: '🌐', color: 'from-indigo-500 to-indigo-600' },
    { id: 9, name: 'Informática', icon: '💻', color: 'from-cyan-500 to-cyan-600' },
    { id: 10, name: 'Filosofia', icon: '🤔', color: 'from-pink-500 to-pink-600' },
  ];

  const [books, setBooks] = useState<Record<number, Book[]>>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [newBook, setNewBook] = useState({
    title: '',
    borrowDate: '',
    dueDate: '',
  });

  const getTotalBooks = () => {
    return Object.values(books).reduce((sum, subjectBooks) => sum + subjectBooks.length, 0);
  };

  const handleAddBook = () => {
    if (!selectedSubject || !newBook.title || !newBook.borrowDate || !newBook.dueDate) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const borrowDate = new Date(newBook.borrowDate);
    const dueDate = new Date(newBook.dueDate);
    const today = new Date();
    const daysLeft = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    const book: Book = {
      id: Date.now(),
      title: newBook.title,
      code: `${selectedSubject.name.substring(0, 3).toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      status: daysLeft <= 3 ? 'Crítico' : daysLeft <= 7 ? 'Atenção' : 'Bom',
      borrowDate: borrowDate.toLocaleDateString('pt-BR'),
      dueDate: dueDate.toLocaleDateString('pt-BR'),
      daysLeft: daysLeft,
    };

    setBooks(prev => ({
      ...prev,
      [selectedSubject.id]: [...(prev[selectedSubject.id] || []), book]
    }));

    setNewBook({ title: '', borrowDate: '', dueDate: '' });
    setShowAddModal(false);
    setSelectedSubject(null);
  };

  const handleRemoveBook = (subjectId: number, bookId: number) => {
    if (confirm('Tem certeza que deseja remover este livro?')) {
      setBooks(prev => ({
        ...prev,
        [subjectId]: prev[subjectId].filter(book => book.id !== bookId)
      }));
    }
  };

  const openAddModal = (subject: Subject) => {
    setSelectedSubject(subject);
    setShowAddModal(true);
  };

  return (
    <div className="pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-secondary p-6 md:p-8 rounded-b-3xl shadow-lg mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold text-2xl md:text-3xl mb-2">
                Meus Materiais
              </h2>
              <p className="text-white/90 text-sm">
                {getTotalBooks() === 0 ? 'Nenhum material ativo' : `Você possui ${getTotalBooks()} ${getTotalBooks() === 1 ? 'material ativo' : 'materiais ativos'}`}
              </p>
            </div>
            <Package className="w-12 h-12 md:w-16 md:h-16 text-white/30" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6">
        {/* Subjects List */}
        {subjects.map((subject, index) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${subject.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                  {subject.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{subject.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {books[subject.id]?.length || 0} {books[subject.id]?.length === 1 ? 'livro' : 'livros'}
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => openAddModal(subject)}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar
                </Button>
              </div>

              {/* Books in this subject */}
              {books[subject.id] && books[subject.id].length > 0 && (
                <div className="space-y-3 mt-4 pt-4 border-t border-border">
                  {books[subject.id].map((book) => (
                    <div
                      key={book.id}
                      className="bg-accent/50 dark:bg-accent/20 rounded-lg p-4"
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                            <BookMarked className="w-7 h-7 text-primary" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold mb-1 truncate">{book.title}</h4>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <QrCode className="w-3 h-3" />
                                {book.code}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 ml-2">
                              <Badge
                                variant={
                                  book.status === 'Bom' ? 'success' :
                                  book.status === 'Atenção' ? 'warning' : 'destructive'
                                }
                              >
                                {book.status}
                              </Badge>
                              <button
                                onClick={() => handleRemoveBook(subject.id, book.id)}
                                className="p-1.5 hover:bg-destructive/10 rounded-lg transition-colors"
                                aria-label="Remover livro"
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </button>
                            </div>
                          </div>

                          <div className="space-y-1 mb-2">
                            <div className="flex items-center gap-2 text-xs">
                              <Calendar className="w-3 h-3 text-muted-foreground" />
                              <span className="text-muted-foreground">Empréstimo:</span>
                              <span className="font-medium">{book.borrowDate}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <Calendar className="w-3 h-3 text-muted-foreground" />
                              <span className="text-muted-foreground">Devolução:</span>
                              <span className={`font-medium ${
                                book.daysLeft <= 3 ? 'text-destructive' : ''
                              }`}>
                                {book.dueDate}
                              </span>
                            </div>
                          </div>

                          <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                            book.daysLeft <= 0
                              ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                              : book.daysLeft <= 3
                              ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                          }`}>
                            {book.daysLeft <= 0 ? (
                              <>
                                <AlertCircle className="w-3 h-3" />
                                <span>Atrasado!</span>
                              </>
                            ) : book.daysLeft <= 3 ? (
                              <>
                                <AlertCircle className="w-3 h-3" />
                                <span>Apenas {book.daysLeft} {book.daysLeft === 1 ? 'dia' : 'dias'}</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-3 h-3" />
                                <span>{book.daysLeft} dias</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>
        ))}

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-accent border-primary/20">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Dica de Preservação</h4>
                <p className="text-sm text-muted-foreground">
                  Mantenha os livros em local seco e arejado. Evite dobrar páginas e use marcadores de página adequados.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Add Book Modal */}
      {showAddModal && selectedSubject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className={`bg-gradient-to-br ${selectedSubject.color} p-6 rounded-t-2xl`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                    {selectedSubject.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">Adicionar Livro</h3>
                    <p className="text-white/90 text-sm">{selectedSubject.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedSubject(null);
                    setNewBook({ title: '', borrowDate: '', dueDate: '' });
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Título do Livro
                </label>
                <input
                  type="text"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  placeholder="Ex: Cálculo Volume 1"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Data de Empréstimo
                </label>
                <input
                  type="date"
                  value={newBook.borrowDate}
                  onChange={(e) => setNewBook({ ...newBook, borrowDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Data de Devolução
                </label>
                <input
                  type="date"
                  value={newBook.dueDate}
                  onChange={(e) => setNewBook({ ...newBook, dueDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="bg-accent/50 dark:bg-accent/20 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">
                  <strong>Importante:</strong> Certifique-se de devolver o livro na data estipulada para evitar perda de pontos e penalidades.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedSubject(null);
                    setNewBook({ title: '', borrowDate: '', dueDate: '' });
                  }}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  onClick={handleAddBook}
                  className="flex-1"
                >
                  Adicionar Livro
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}