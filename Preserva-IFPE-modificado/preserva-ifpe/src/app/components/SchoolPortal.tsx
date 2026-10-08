import { useEffect, useMemo, useState } from 'react';
import {
  Bell,
  BookOpen,
  ClipboardList,
  GraduationCap,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Search,
  Sun,
  UserRound,
  Users,
  X,
} from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import { Badge } from './Badge';
import type { Session } from '../lib/schoolDb';
import {
  className,
  deleteAbsence,
  deleteClass,
  deleteGrade,
  deleteGuardian,
  deleteMessage,
  deleteNotice,
  deleteStudent,
  deleteSubject,
  deleteTask,
  deleteTeacher,
  deleteUser,
  getDb,
  guardianName,
  setSession,
  studentName,
  subjectName,
  teacherName,
  upsertAbsence,
  upsertClass,
  upsertGrade,
  upsertGuardian,
  upsertMessage,
  upsertNotice,
  upsertStudent,
  upsertSubject,
  upsertTask,
  upsertTeacher,
  upsertUser,
  visibleStudentIds,
} from '../lib/schoolDb';

type View =
  | 'inicio'
  | 'notas'
  | 'faltas'
  | 'tarefas'
  | 'avisos'
  | 'perfil'
  | 'filhos'
  | 'mensagens'
  | 'alunos'
  | 'responsaveis'
  | 'turmas'
  | 'professores'
  | 'disciplinas'
  | 'usuarios';

const menus: Record<Session['role'], { id: View; label: string }[]> = {
  aluno: [
    { id: 'inicio', label: 'Início' },
    { id: 'notas', label: 'Notas' },
    { id: 'faltas', label: 'Faltas' },
    { id: 'tarefas', label: 'Tarefas' },
    { id: 'avisos', label: 'Avisos' },
    { id: 'perfil', label: 'Perfil' },
  ],
  pais: [
    { id: 'inicio', label: 'Início' },
    { id: 'filhos', label: 'Filhos vinculados' },
    { id: 'notas', label: 'Notas' },
    { id: 'faltas', label: 'Faltas' },
    { id: 'avisos', label: 'Avisos' },
    { id: 'mensagens', label: 'Mensagens da escola' },
  ],
  admin: [
    { id: 'inicio', label: 'Painel' },
    { id: 'alunos', label: 'Alunos' },
    { id: 'responsaveis', label: 'Responsáveis' },
    { id: 'turmas', label: 'Turmas' },
    { id: 'professores', label: 'Professores' },
    { id: 'disciplinas', label: 'Disciplinas' },
    { id: 'avisos', label: 'Avisos' },
    { id: 'usuarios', label: 'Usuários' },
    { id: 'notas', label: 'Notas' },
    { id: 'faltas', label: 'Faltas' },
    { id: 'tarefas', label: 'Tarefas' },
    { id: 'mensagens', label: 'Mensagens' },
  ],
};

function Field({ label, children }: { label: string; children: import('react').ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}

const control = 'w-full rounded-lg border border-input bg-input-background px-3 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring';

export function SchoolPortal({ session, onLogout }: { session: Session; onLogout: () => void }) {
  const [view, setView] = useState<View>('inicio');
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [tick, setTick] = useState(0);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [query, setQuery] = useState('');
  const [childId, setChildId] = useState('');

  const db = useMemo(() => getDb(), [tick]);
  const allowed = new Set(menus[session.role].map((item) => item.id));
  const mine = visibleStudentIds(session);
  const reload = () => setTick((n) => n + 1);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!allowed.has(view)) setView('inicio');
    setQuery('');
    setBanner(null);
  }, [view, session.role]);

  useEffect(() => {
    if (!childId && mine[0]) setChildId(mine[0]);
  }, [mine, childId]);

  const flash = (type: 'ok' | 'err', text: string) => setBanner({ type, text });
  const go = (next: View) => {
    if (!allowed.has(next)) {
      flash('err', 'Você não tem acesso a esta área.');
      setView('inicio');
      return;
    }
    setView(next);
    setMenuOpen(false);
  };

  const students = db.students.filter((s) => mine.includes(s.id));
  const selectedChild = students.find((s) => s.id === childId) || students[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Ir para o conteúdo
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 hover:bg-muted md:hidden" aria-label="Abrir menu" onClick={() => setMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">P</div>
            <div>
              <p className="text-base font-bold leading-none text-primary">Preserva IFPE</p>
              <p className="text-xs text-muted-foreground">Campus Jaboatão · {session.role === 'aluno' ? 'Aluno' : session.role === 'pais' ? 'Responsável' : 'Administração'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-lg p-2 hover:bg-muted" aria-label={dark ? 'Ativar tema claro' : 'Ativar tema escuro'} onClick={() => { setDark(!dark); document.documentElement.classList.toggle('dark'); }}>
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">{session.name}</p>
              <p className="text-xs text-muted-foreground">{session.email}</p>
            </div>
            <Button variant="ghost" aria-label="Sair" onClick={() => { setSession(null); onLogout(); }}>
              <LogOut className="h-4 w-4" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-border bg-card p-4 md:block">
          <nav aria-label="Menu principal" className="space-y-1">
            {menus[session.role].map((item) => (
              <button key={item.id} onClick={() => go(item.id)} aria-current={view === item.id ? 'page' : undefined} className={`flex w-full items-center rounded-lg px-4 py-3 text-left font-medium ${view === item.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {menuOpen && (
          <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
            <button className="absolute inset-0 bg-black/50" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} />
            <div className="absolute bottom-0 left-0 top-0 w-72 overflow-y-auto bg-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <strong>Menu</strong>
                <button aria-label="Fechar" onClick={() => setMenuOpen(false)} className="rounded-lg p-2 hover:bg-muted"><X className="h-5 w-5" /></button>
              </div>
              <nav aria-label="Menu principal" className="space-y-1">
                {menus[session.role].map((item) => (
                  <button key={item.id} onClick={() => go(item.id)} className={`flex w-full rounded-lg px-4 py-3 text-left font-medium ${view === item.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}>{item.label}</button>
                ))}
              </nav>
            </div>
          </div>
        )}

        <main id="conteudo" className="min-w-0 flex-1 px-4 py-6 pb-24">
          {banner && (
            <div role="status" className={`mb-4 rounded-lg border px-4 py-3 text-sm ${banner.type === 'ok' ? 'border-green-300 bg-green-50 text-green-800' : 'border-red-300 bg-red-50 text-red-800'}`}>
              {banner.text}
            </div>
          )}
          {loading ? (
            <Card><p>Carregando dados...</p></Card>
          ) : (
            <>
              {view === 'inicio' && <HomeView session={session} students={students} db={db} onOpen={go} />}
              {view === 'perfil' && session.role === 'aluno' && <ProfileView session={session} db={db} />}
              {view === 'filhos' && <ChildrenView students={students} selected={selectedChild?.id || ''} onSelect={setChildId} />}
              {session.role === 'pais' && (view === 'notas' || view === 'faltas') && (
                <ChildPicker students={students} selected={selectedChild?.id || ''} onSelect={setChildId} />
              )}
              {view === 'notas' && <GradesView session={session} db={db} studentIds={session.role === 'pais' ? [selectedChild?.id || ''] : mine} canEdit={session.role === 'admin'} query={query} setQuery={setQuery} reload={reload} flash={flash} />}
              {view === 'faltas' && <AbsencesView session={session} db={db} studentIds={session.role === 'pais' ? [selectedChild?.id || ''] : mine} canEdit={session.role === 'admin'} query={query} setQuery={setQuery} reload={reload} flash={flash} />}
              {view === 'tarefas' && <TasksView session={session} db={db} canEdit={session.role === 'admin'} query={query} setQuery={setQuery} reload={reload} flash={flash} />}
              {view === 'avisos' && <NoticesView session={session} db={db} canEdit={session.role === 'admin'} query={query} setQuery={setQuery} reload={reload} flash={flash} />}
              {view === 'mensagens' && <MessagesView session={session} db={db} canEdit={session.role === 'admin'} query={query} setQuery={setQuery} reload={reload} flash={flash} />}
              {view === 'alunos' && <StudentsAdmin db={db} query={query} setQuery={setQuery} reload={reload} flash={flash} />}
              {view === 'responsaveis' && <GuardiansAdmin db={db} query={query} setQuery={setQuery} reload={reload} flash={flash} />}
              {view === 'turmas' && <ClassesAdmin db={db} query={query} setQuery={setQuery} reload={reload} flash={flash} />}
              {view === 'professores' && <TeachersAdmin db={db} query={query} setQuery={setQuery} reload={reload} flash={flash} />}
              {view === 'disciplinas' && <SubjectsAdmin db={db} query={query} setQuery={setQuery} reload={reload} flash={flash} />}
              {view === 'usuarios' && <UsersAdmin db={db} session={session} query={query} setQuery={setQuery} reload={reload} flash={flash} />}
            </>
          )}
        </main>
      </div>
      <footer className="border-t border-border bg-card px-4 py-4 text-center text-sm text-muted-foreground">
        Preserva IFPE · Campus Jaboatão dos Guararapes · Acesso conforme o perfil autenticado
      </footer>
    </div>
  );
}

function SearchBox({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative mb-4 max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input aria-label="Buscar" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Buscar..." className={`${control} pl-10`} />
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <Card><p className="text-center text-muted-foreground">{text}</p></Card>;
}

function HomeView({ session, students, db, onOpen }: any) {
  const cards = session.role === 'admin'
    ? [
        ['Alunos', db.students.length, 'alunos'],
        ['Responsáveis', db.guardians.length, 'responsaveis'],
        ['Turmas', db.classes.length, 'turmas'],
        ['Avisos', db.notices.length, 'avisos'],
      ]
    : session.role === 'pais'
      ? [
          ['Filhos', students.length, 'filhos'],
          ['Mensagens', db.messages.filter((m: any) => m.guardianId === session.guardianId).length, 'mensagens'],
          ['Avisos', db.notices.filter((n: any) => n.audience !== 'alunos').length, 'avisos'],
        ]
      : [
          ['Notas', db.grades.filter((g: any) => g.studentId === session.studentId).length, 'notas'],
          ['Tarefas', db.tasks.filter((t: any) => students.some((s: any) => s.classId === t.classId)).length, 'tarefas'],
          ['Avisos', db.notices.filter((n: any) => n.audience !== 'pais').length, 'avisos'],
        ];
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-gradient-to-br from-primary to-secondary p-6 text-white">
        <h1 className="text-2xl font-bold">Olá, {session.name.split(' ')[0]}</h1>
        <p className="mt-1 text-white/90">Você está na área de {session.role === 'admin' ? 'administração' : session.role === 'pais' ? 'responsável' : 'aluno'}.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(([label, value, target]: any) => (
          <Card key={label}>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-3xl font-bold">{value}</p>
            <Button className="mt-3" variant="outline" onClick={() => onOpen(target)}>Abrir</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ProfileView({ session, db }: any) {
  const student = db.students.find((s: any) => s.id === session.studentId);
  if (!student) return <Empty text="Perfil do aluno não encontrado." />;
  return (
    <Card>
      <h1 className="mb-4 text-2xl font-bold">Meu perfil</h1>
      <dl className="grid gap-3 sm:grid-cols-2">
        <div><dt className="text-sm text-muted-foreground">Nome</dt><dd className="font-medium">{student.name}</dd></div>
        <div><dt className="text-sm text-muted-foreground">E-mail</dt><dd className="font-medium">{student.email}</dd></div>
        <div><dt className="text-sm text-muted-foreground">Matrícula</dt><dd className="font-medium">{student.enrollment}</dd></div>
        <div><dt className="text-sm text-muted-foreground">Turma</dt><dd className="font-medium">{className(student.classId)}</dd></div>
        <div><dt className="text-sm text-muted-foreground">Responsável</dt><dd className="font-medium">{guardianName(student.guardianId)}</dd></div>
      </dl>
    </Card>
  );
}

function ChildPicker({ students, selected, onSelect }: any) {
  if (!students.length) return <Empty text="Nenhum filho vinculado a esta conta." />;
  return (
    <Field label="Filho">
      <select className={`${control} mb-4`} value={selected} onChange={(e) => onSelect(e.target.value)} aria-label="Selecionar filho">
        {students.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
    </Field>
  );
}

function ChildrenView({ students, selected, onSelect }: any) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Filhos vinculados</h1>
      {!students.length && <Empty text="Nenhum filho vinculado. A coordenação precisa cadastrar o vínculo." />}
      <div className="grid gap-4 md:grid-cols-2">
        {students.map((s: any) => (
          <Card key={s.id} className={selected === s.id ? 'border-primary' : ''}>
            <h2 className="font-semibold">{s.name}</h2>
            <p className="text-sm text-muted-foreground">{className(s.classId)} · {s.enrollment}</p>
            <Button className="mt-3" variant={selected === s.id ? 'primary' : 'outline'} onClick={() => onSelect(s.id)}>Selecionar</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function GradesView({ session, db, studentIds, canEdit, query, setQuery, reload, flash }: any) {
  const [form, setForm] = useState<any>(null);
  const rows = db.grades.filter((g: any) => studentIds.includes(g.studentId) && `${studentName(g.studentId)} ${subjectName(g.subjectId)} ${g.term}`.toLowerCase().includes(query.toLowerCase()));
  const save = () => {
    const result = upsertGrade({ ...form, value: Number(form.value) });
    if (!result.ok) return flash('err', result.error);
    setForm(null); reload(); flash('ok', 'Nota salva.');
  };
  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Notas</h1>
        {canEdit && <Button onClick={() => setForm({ studentId: db.students[0]?.id || '', subjectId: db.subjects[0]?.id || '', term: '2ª unidade', value: 0, date: '2026-05-10' })}>Nova nota</Button>}
      </div>
      <SearchBox value={query} onChange={setQuery} />
      {form && canEdit && (
        <Card className="mb-4 grid gap-3 md:grid-cols-2">
          <Field label="Aluno"><select className={control} value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })}>{db.students.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></Field>
          <Field label="Disciplina"><select className={control} value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })}>{db.subjects.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></Field>
          <Field label="Unidade"><input className={control} value={form.term} onChange={(e) => setForm({ ...form, term: e.target.value })} /></Field>
          <Field label="Nota"><input className={control} type="number" min="0" max="10" step="0.1" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} /></Field>
          <Field label="Data"><input className={control} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></Field>
          <div className="flex items-end gap-2"><Button onClick={save}>Salvar</Button><Button variant="outline" onClick={() => setForm(null)}>Cancelar</Button></div>
        </Card>
      )}
      {!rows.length ? <Empty text="Nenhuma nota encontrada." /> : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Notas do aluno</caption>
            <thead className="bg-muted"><tr><th className="p-3">Aluno</th><th className="p-3">Disciplina</th><th className="p-3">Unidade</th><th className="p-3">Nota</th><th className="p-3">Data</th>{canEdit && <th className="p-3">Ações</th>}</tr></thead>
            <tbody>
              {rows.map((g: any) => (
                <tr key={g.id} className="border-t border-border">
                  <td className="p-3">{studentName(g.studentId)}</td>
                  <td className="p-3">{subjectName(g.subjectId)}</td>
                  <td className="p-3">{g.term}</td>
                  <td className="p-3 font-semibold">{g.value.toFixed(1)}</td>
                  <td className="p-3">{new Date(`${g.date}T12:00:00`).toLocaleDateString('pt-BR')}</td>
                  {canEdit && <td className="p-3"><Button size="sm" variant="outline" onClick={() => setForm(g)}>Editar</Button> <Button size="sm" variant="danger" onClick={() => { if (confirm('Excluir esta nota?')) { deleteGrade(g.id); reload(); flash('ok', 'Nota excluída.'); } }}>Excluir</Button></td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {session.role === 'aluno' && <p className="mt-3 text-sm text-muted-foreground">Você visualiza apenas as próprias notas.</p>}
    </section>
  );
}

function AbsencesView({ session, db, studentIds, canEdit, query, setQuery, reload, flash }: any) {
  const [form, setForm] = useState<any>(null);
  const rows = db.absences.filter((a: any) => studentIds.includes(a.studentId) && `${studentName(a.studentId)} ${subjectName(a.subjectId)} ${a.note}`.toLowerCase().includes(query.toLowerCase()));
  const save = () => {
    const result = upsertAbsence({ ...form, justified: form.justified === true || form.justified === 'true' });
    if (!result.ok) return flash('err', result.error);
    setForm(null); reload(); flash('ok', 'Falta salva.');
  };
  return (
    <section>
      <div className="mb-4 flex items-center justify-between"><h1 className="text-2xl font-bold">Faltas</h1>{canEdit && <Button onClick={() => setForm({ studentId: db.students[0]?.id || '', subjectId: db.subjects[0]?.id || '', date: '2026-05-02', justified: false, note: '' })}>Nova falta</Button>}</div>
      <SearchBox value={query} onChange={setQuery} />
      {form && canEdit && (
        <Card className="mb-4 grid gap-3 md:grid-cols-2">
          <Field label="Aluno"><select className={control} value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })}>{db.students.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></Field>
          <Field label="Disciplina"><select className={control} value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })}>{db.subjects.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></Field>
          <Field label="Data"><input className={control} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></Field>
          <Field label="Justificada"><select className={control} value={String(form.justified)} onChange={(e) => setForm({ ...form, justified: e.target.value === 'true' })}><option value="false">Não</option><option value="true">Sim</option></select></Field>
          <Field label="Observação"><input className={control} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></Field>
          <div className="flex items-end gap-2"><Button onClick={save}>Salvar</Button><Button variant="outline" onClick={() => setForm(null)}>Cancelar</Button></div>
        </Card>
      )}
      {!rows.length ? <Empty text="Nenhuma falta encontrada." /> : rows.map((a: any) => (
        <Card key={a.id} className="mb-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-semibold">{studentName(a.studentId)} · {subjectName(a.subjectId)}</h2>
              <p className="text-sm text-muted-foreground">{new Date(`${a.date}T12:00:00`).toLocaleDateString('pt-BR')} {a.note && `· ${a.note}`}</p>
              <Badge variant={a.justified ? 'success' : 'warning'}>{a.justified ? 'Justificada' : 'Não justificada'}</Badge>
            </div>
            {canEdit && <div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => setForm(a)}>Editar</Button><Button size="sm" variant="danger" onClick={() => { if (confirm('Excluir esta falta?')) { deleteAbsence(a.id); reload(); flash('ok', 'Falta excluída.'); } }}>Excluir</Button></div>}
          </div>
        </Card>
      ))}
      {session.role !== 'admin' && <p className="text-sm text-muted-foreground">A lista respeita o vínculo da conta autenticada.</p>}
    </section>
  );
}

function TasksView({ session, db, canEdit, query, setQuery, reload, flash }: any) {
  const [form, setForm] = useState<any>(null);
  const classIds = session.role === 'aluno'
    ? db.students.filter((s: any) => s.id === session.studentId).map((s: any) => s.classId)
    : session.role === 'pais'
      ? db.students.filter((s: any) => s.guardianId === session.guardianId).map((s: any) => s.classId)
      : db.classes.map((c: any) => c.id);
  const rows = db.tasks.filter((t: any) => classIds.includes(t.classId) && `${t.title} ${t.description}`.toLowerCase().includes(query.toLowerCase()));
  const save = () => {
    const result = upsertTask(form);
    if (!result.ok) return flash('err', result.error);
    setForm(null); reload(); flash('ok', 'Tarefa salva.');
  };
  return (
    <section>
      <div className="mb-4 flex items-center justify-between"><h1 className="text-2xl font-bold">Tarefas</h1>{canEdit && <Button onClick={() => setForm({ title: '', classId: db.classes[0]?.id || '', subjectId: db.subjects[0]?.id || '', dueDate: '2026-05-15', description: '' })}>Nova tarefa</Button>}</div>
      <SearchBox value={query} onChange={setQuery} />
      {form && canEdit && (
        <Card className="mb-4 grid gap-3">
          <Field label="Título"><input className={control} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Turma"><select className={control} value={form.classId} onChange={(e) => setForm({ ...form, classId: e.target.value })}>{db.classes.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
            <Field label="Disciplina"><select className={control} value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })}>{db.subjects.map((s: any) => <option key={s.id} value={s.id}>{s.name} · {className(s.classId)}</option>)}</select></Field>
          </div>
          <Field label="Entrega"><input className={control} type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} /></Field>
          <Field label="Descrição"><textarea className={control} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Field>
          <div className="flex gap-2"><Button onClick={save}>Salvar</Button><Button variant="outline" onClick={() => setForm(null)}>Cancelar</Button></div>
        </Card>
      )}
      {!rows.length ? <Empty text="Nenhuma tarefa encontrada." /> : <div className="grid gap-3 md:grid-cols-2">{rows.map((t: any) => (
        <Card key={t.id}>
          <h2 className="font-semibold">{t.title}</h2>
          <p className="text-sm text-muted-foreground">{subjectName(t.subjectId)} · {className(t.classId)}</p>
          <p className="mt-2 text-sm">{t.description}</p>
          <p className="mt-2 text-sm font-medium">Entrega: {new Date(`${t.dueDate}T12:00:00`).toLocaleDateString('pt-BR')}</p>
          {canEdit && <div className="mt-3 flex gap-2"><Button size="sm" variant="outline" onClick={() => setForm(t)}>Editar</Button><Button size="sm" variant="danger" onClick={() => { if (confirm('Excluir esta tarefa?')) { deleteTask(t.id); reload(); flash('ok', 'Tarefa excluída.'); } }}>Excluir</Button></div>}
        </Card>
      ))}</div>}
    </section>
  );
}

function NoticesView({ session, db, canEdit, query, setQuery, reload, flash }: any) {
  const [form, setForm] = useState<any>(null);
  const rows = db.notices.filter((n: any) => {
    const audienceOk = session.role === 'admin' || n.audience === 'todos' || (session.role === 'aluno' && n.audience === 'alunos') || (session.role === 'pais' && n.audience === 'pais');
    return audienceOk && `${n.title} ${n.body}`.toLowerCase().includes(query.toLowerCase());
  });
  const save = () => {
    const result = upsertNotice(form);
    if (!result.ok) return flash('err', result.error);
    setForm(null); reload(); flash('ok', 'Aviso salvo.');
  };
  return (
    <section>
      <div className="mb-4 flex items-center justify-between"><h1 className="text-2xl font-bold">Avisos</h1>{canEdit && <Button onClick={() => setForm({ title: '', body: '', audience: 'todos', date: '2026-05-01' })}>Novo aviso</Button>}</div>
      <SearchBox value={query} onChange={setQuery} />
      {form && canEdit && (
        <Card className="mb-4 grid gap-3">
          <Field label="Título"><input className={control} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
          <Field label="Texto"><textarea className={control} rows={3} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} /></Field>
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Público"><select className={control} value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })}><option value="todos">Todos</option><option value="alunos">Alunos</option><option value="pais">Responsáveis</option></select></Field>
            <Field label="Data"><input className={control} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></Field>
          </div>
          <div className="flex gap-2"><Button onClick={save}>Salvar</Button><Button variant="outline" onClick={() => setForm(null)}>Cancelar</Button></div>
        </Card>
      )}
      {!rows.length ? <Empty text="Nenhum aviso encontrado." /> : rows.map((n: any) => (
        <Card key={n.id} className="mb-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-semibold">{n.title}</h2>
              <p className="text-sm text-muted-foreground">{new Date(`${n.date}T12:00:00`).toLocaleDateString('pt-BR')} · {n.audience}</p>
              <p className="mt-2 text-sm">{n.body}</p>
            </div>
            {canEdit && <div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => setForm(n)}>Editar</Button><Button size="sm" variant="danger" onClick={() => { if (confirm('Excluir este aviso?')) { deleteNotice(n.id); reload(); flash('ok', 'Aviso excluído.'); } }}>Excluir</Button></div>}
          </div>
        </Card>
      ))}
    </section>
  );
}

function MessagesView({ session, db, canEdit, query, setQuery, reload, flash }: any) {
  const [form, setForm] = useState<any>(null);
  const rows = db.messages.filter((m: any) => (session.role === 'admin' || m.guardianId === session.guardianId) && `${m.title} ${m.body} ${studentName(m.studentId)}`.toLowerCase().includes(query.toLowerCase()));
  const save = () => {
    const result = upsertMessage(form);
    if (!result.ok) return flash('err', result.error);
    setForm(null); reload(); flash('ok', 'Mensagem salva.');
  };
  return (
    <section>
      <div className="mb-4 flex items-center justify-between"><h1 className="text-2xl font-bold">Mensagens da escola</h1>{canEdit && <Button onClick={() => setForm({ guardianId: db.guardians[0]?.id || '', studentId: db.students[0]?.id || '', title: '', body: '', date: '2026-05-01', from: 'Coordenação' })}>Nova mensagem</Button>}</div>
      <SearchBox value={query} onChange={setQuery} />
      {form && canEdit && (
        <Card className="mb-4 grid gap-3">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Responsável"><select className={control} value={form.guardianId} onChange={(e) => setForm({ ...form, guardianId: e.target.value })}>{db.guardians.map((g: any) => <option key={g.id} value={g.id}>{g.name}</option>)}</select></Field>
            <Field label="Aluno"><select className={control} value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })}>{db.students.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></Field>
          </div>
          <Field label="Título"><input className={control} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
          <Field label="Mensagem"><textarea className={control} rows={3} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} /></Field>
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="De"><input className={control} value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} /></Field>
            <Field label="Data"><input className={control} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></Field>
          </div>
          <div className="flex gap-2"><Button onClick={save}>Salvar</Button><Button variant="outline" onClick={() => setForm(null)}>Cancelar</Button></div>
        </Card>
      )}
      {!rows.length ? <Empty text="Nenhuma mensagem encontrada." /> : rows.map((m: any) => (
        <Card key={m.id} className="mb-3">
          <h2 className="font-semibold">{m.title}</h2>
          <p className="text-sm text-muted-foreground">{m.from} · {studentName(m.studentId)} · {new Date(`${m.date}T12:00:00`).toLocaleDateString('pt-BR')}</p>
          <p className="mt-2 text-sm">{m.body}</p>
          {canEdit && <div className="mt-3 flex gap-2"><Button size="sm" variant="outline" onClick={() => setForm(m)}>Editar</Button><Button size="sm" variant="danger" onClick={() => { if (confirm('Excluir esta mensagem?')) { deleteMessage(m.id); reload(); flash('ok', 'Mensagem excluída.'); } }}>Excluir</Button></div>}
        </Card>
      ))}
    </section>
  );
}

function StudentsAdmin({ db, query, setQuery, reload, flash }: any) {
  const [form, setForm] = useState<any>(null);
  const rows = db.students.filter((s: any) => `${s.name} ${s.email} ${s.enrollment}`.toLowerCase().includes(query.toLowerCase()));
  const save = () => {
    const result = upsertStudent(form);
    if (!result.ok) return flash('err', result.error);
    setForm(null); reload(); flash('ok', 'Aluno salvo. A lista foi atualizada.');
  };
  return (
    <section>
      <div className="mb-4 flex items-center justify-between"><h1 className="text-2xl font-bold">Alunos</h1><Button onClick={() => setForm({ name: '', email: '', enrollment: '', classId: db.classes[0]?.id || '', guardianId: db.guardians[0]?.id || '' })}>Novo aluno</Button></div>
      <SearchBox value={query} onChange={setQuery} />
      {form && <Card className="mb-4 grid gap-3 md:grid-cols-2">
        <Field label="Nome"><input className={control} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
        <Field label="E-mail"><input className={control} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
        <Field label="Matrícula"><input className={control} value={form.enrollment} onChange={(e) => setForm({ ...form, enrollment: e.target.value })} /></Field>
        <Field label="Turma"><select className={control} value={form.classId} onChange={(e) => setForm({ ...form, classId: e.target.value })}>{db.classes.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
        <Field label="Responsável"><select className={control} value={form.guardianId} onChange={(e) => setForm({ ...form, guardianId: e.target.value })}>{db.guardians.map((g: any) => <option key={g.id} value={g.id}>{g.name}</option>)}</select></Field>
        <div className="flex items-end gap-2"><Button onClick={save}>Salvar</Button><Button variant="outline" onClick={() => setForm(null)}>Cancelar</Button></div>
      </Card>}
      {!rows.length ? <Empty text="Nenhum aluno encontrado." /> : <div className="overflow-x-auto rounded-lg border"><table className="w-full text-left text-sm"><caption className="sr-only">Alunos cadastrados</caption><thead className="bg-muted"><tr><th className="p-3">Nome</th><th className="p-3">Matrícula</th><th className="p-3">Turma</th><th className="p-3">Responsável</th><th className="p-3">Ações</th></tr></thead><tbody>{rows.map((s: any) => <tr key={s.id} className="border-t"><td className="p-3">{s.name}<div className="text-xs text-muted-foreground">{s.email}</div></td><td className="p-3">{s.enrollment}</td><td className="p-3">{className(s.classId)}</td><td className="p-3">{guardianName(s.guardianId)}</td><td className="p-3"><Button size="sm" variant="outline" onClick={() => setForm(s)}>Editar</Button> <Button size="sm" variant="danger" onClick={() => { if (confirm('Excluir este aluno? Vínculos de nota e falta impedem a exclusão.')) { const r = deleteStudent(s.id); if (!r.ok) flash('err', r.error); else { reload(); flash('ok', 'Aluno excluído.'); } } }}>Excluir</Button></td></tr>)}</tbody></table></div>}
    </section>
  );
}

function GuardiansAdmin({ db, query, setQuery, reload, flash }: any) {
  const [form, setForm] = useState<any>(null);
  const rows = db.guardians.filter((g: any) => `${g.name} ${g.email} ${g.phone}`.toLowerCase().includes(query.toLowerCase()));
  const save = () => {
    const result = upsertGuardian(form);
    if (!result.ok) return flash('err', result.error);
    setForm(null); reload(); flash('ok', 'Responsável salvo.');
  };
  return (
    <section>
      <div className="mb-4 flex items-center justify-between"><h1 className="text-2xl font-bold">Responsáveis</h1><Button onClick={() => setForm({ name: '', email: '', phone: '' })}>Novo responsável</Button></div>
      <SearchBox value={query} onChange={setQuery} />
      {form && <Card className="mb-4 grid gap-3 md:grid-cols-2">
        <Field label="Nome"><input className={control} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
        <Field label="E-mail"><input className={control} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
        <Field label="Telefone"><input className={control} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
        <div className="flex items-end gap-2"><Button onClick={save}>Salvar</Button><Button variant="outline" onClick={() => setForm(null)}>Cancelar</Button></div>
      </Card>}
      {!rows.length ? <Empty text="Nenhum responsável encontrado." /> : rows.map((g: any) => (
        <Card key={g.id} className="mb-3">
          <div className="flex items-start justify-between gap-3">
            <div><h2 className="font-semibold">{g.name}</h2><p className="text-sm text-muted-foreground">{g.email} · {g.phone || 'sem telefone'}</p><p className="text-sm">Filhos: {g.studentIds.map(studentName).join(', ') || 'nenhum'}</p></div>
            <div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => setForm(g)}>Editar</Button><Button size="sm" variant="danger" onClick={() => { if (confirm('Excluir este responsável? A exclusão é bloqueada se houver aluno vinculado.')) { const r = deleteGuardian(g.id); if (!r.ok) flash('err', r.error); else { reload(); flash('ok', 'Responsável excluído.'); } } }}>Excluir</Button></div>
          </div>
        </Card>
      ))}
    </section>
  );
}

function ClassesAdmin({ db, query, setQuery, reload, flash }: any) {
  const [form, setForm] = useState<any>(null);
  const rows = db.classes.filter((c: any) => `${c.name} ${c.year} ${c.shift}`.toLowerCase().includes(query.toLowerCase()));
  const save = () => { const r = upsertClass(form); if (!r.ok) return flash('err', r.error); setForm(null); reload(); flash('ok', 'Turma salva.'); };
  return (
    <section>
      <div className="mb-4 flex items-center justify-between"><h1 className="text-2xl font-bold">Turmas</h1><Button onClick={() => setForm({ name: '', year: '2026', shift: 'Manhã' })}>Nova turma</Button></div>
      <SearchBox value={query} onChange={setQuery} />
      {form && <Card className="mb-4 grid gap-3 md:grid-cols-3"><Field label="Nome"><input className={control} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field><Field label="Ano"><input className={control} value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} /></Field><Field label="Turno"><input className={control} value={form.shift} onChange={(e) => setForm({ ...form, shift: e.target.value })} /></Field><div className="flex gap-2 md:col-span-3"><Button onClick={save}>Salvar</Button><Button variant="outline" onClick={() => setForm(null)}>Cancelar</Button></div></Card>}
      <div className="grid gap-3 md:grid-cols-2">{rows.map((c: any) => <Card key={c.id}><h2 className="font-semibold">{c.name}</h2><p className="text-sm text-muted-foreground">{c.year} · {c.shift}</p><div className="mt-3 flex gap-2"><Button size="sm" variant="outline" onClick={() => setForm(c)}>Editar</Button><Button size="sm" variant="danger" onClick={() => { if (confirm('Excluir esta turma?')) { const r = deleteClass(c.id); if (!r.ok) flash('err', r.error); else { reload(); flash('ok', 'Turma excluída.'); } } }}>Excluir</Button></div></Card>)}</div>
      {!rows.length && <Empty text="Nenhuma turma encontrada." />}
    </section>
  );
}

function TeachersAdmin({ db, query, setQuery, reload, flash }: any) {
  const [form, setForm] = useState<any>(null);
  const rows = db.teachers.filter((t: any) => `${t.name} ${t.email} ${t.area}`.toLowerCase().includes(query.toLowerCase()));
  const save = () => { const r = upsertTeacher(form); if (!r.ok) return flash('err', r.error); setForm(null); reload(); flash('ok', 'Professor salvo.'); };
  return (
    <section>
      <div className="mb-4 flex items-center justify-between"><h1 className="text-2xl font-bold">Professores</h1><Button onClick={() => setForm({ name: '', email: '', area: '' })}>Novo professor</Button></div>
      <SearchBox value={query} onChange={setQuery} />
      {form && <Card className="mb-4 grid gap-3 md:grid-cols-3"><Field label="Nome"><input className={control} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field><Field label="E-mail"><input className={control} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field><Field label="Área"><input className={control} value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} /></Field><div className="flex gap-2 md:col-span-3"><Button onClick={save}>Salvar</Button><Button variant="outline" onClick={() => setForm(null)}>Cancelar</Button></div></Card>}
      {!rows.length ? <Empty text="Nenhum professor encontrado." /> : rows.map((t: any) => <Card key={t.id} className="mb-3"><div className="flex justify-between gap-3"><div><h2 className="font-semibold">{t.name}</h2><p className="text-sm text-muted-foreground">{t.area} · {t.email}</p></div><div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => setForm(t)}>Editar</Button><Button size="sm" variant="danger" onClick={() => { if (confirm('Excluir este professor?')) { const r = deleteTeacher(t.id); if (!r.ok) flash('err', r.error); else { reload(); flash('ok', 'Professor excluído.'); } } }}>Excluir</Button></div></div></Card>)}
    </section>
  );
}

function SubjectsAdmin({ db, query, setQuery, reload, flash }: any) {
  const [form, setForm] = useState<any>(null);
  const rows = db.subjects.filter((s: any) => `${s.name} ${className(s.classId)} ${teacherName(s.teacherId)}`.toLowerCase().includes(query.toLowerCase()));
  const save = () => { const r = upsertSubject(form); if (!r.ok) return flash('err', r.error); setForm(null); reload(); flash('ok', 'Disciplina salva.'); };
  return (
    <section>
      <div className="mb-4 flex items-center justify-between"><h1 className="text-2xl font-bold">Disciplinas</h1><Button onClick={() => setForm({ name: '', classId: db.classes[0]?.id || '', teacherId: db.teachers[0]?.id || '' })}>Nova disciplina</Button></div>
      <SearchBox value={query} onChange={setQuery} />
      {form && <Card className="mb-4 grid gap-3 md:grid-cols-3"><Field label="Nome"><input className={control} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field><Field label="Turma"><select className={control} value={form.classId} onChange={(e) => setForm({ ...form, classId: e.target.value })}>{db.classes.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field><Field label="Professor"><select className={control} value={form.teacherId} onChange={(e) => setForm({ ...form, teacherId: e.target.value })}>{db.teachers.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}</select></Field><div className="flex gap-2 md:col-span-3"><Button onClick={save}>Salvar</Button><Button variant="outline" onClick={() => setForm(null)}>Cancelar</Button></div></Card>}
      {!rows.length ? <Empty text="Nenhuma disciplina encontrada." /> : <div className="grid gap-3 md:grid-cols-2">{rows.map((s: any) => <Card key={s.id}><h2 className="font-semibold">{s.name}</h2><p className="text-sm text-muted-foreground">{className(s.classId)} · {teacherName(s.teacherId)}</p><div className="mt-3 flex gap-2"><Button size="sm" variant="outline" onClick={() => setForm(s)}>Editar</Button><Button size="sm" variant="danger" onClick={() => { if (confirm('Excluir esta disciplina?')) { const r = deleteSubject(s.id); if (!r.ok) flash('err', r.error); else { reload(); flash('ok', 'Disciplina excluída.'); } } }}>Excluir</Button></div></Card>)}</div>}
    </section>
  );
}

function UsersAdmin({ db, session, query, setQuery, reload, flash }: any) {
  const [form, setForm] = useState<any>(null);
  const rows = db.users.filter((u: any) => `${u.name} ${u.email} ${u.role}`.toLowerCase().includes(query.toLowerCase()));
  const save = () => { const r = upsertUser(form); if (!r.ok) return flash('err', r.error); setForm(null); reload(); flash('ok', 'Usuário salvo.'); };
  return (
    <section>
      <div className="mb-4 flex items-center justify-between"><h1 className="text-2xl font-bold">Usuários</h1><Button onClick={() => setForm({ name: '', email: '', password: '123456', role: 'aluno', studentId: db.students[0]?.id || '', guardianId: '', active: true })}>Novo usuário</Button></div>
      <SearchBox value={query} onChange={setQuery} />
      {form && <Card className="mb-4 grid gap-3 md:grid-cols-2">
        <Field label="Nome"><input className={control} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
        <Field label="E-mail"><input className={control} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
        <Field label="Senha"><input className={control} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></Field>
        <Field label="Perfil"><select className={control} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option value="aluno">Aluno</option><option value="pais">Responsável</option><option value="admin">Admin</option></select></Field>
        {form.role === 'aluno' && <Field label="Aluno vinculado"><select className={control} value={form.studentId || ''} onChange={(e) => setForm({ ...form, studentId: e.target.value })}>{db.students.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></Field>}
        {form.role === 'pais' && <Field label="Responsável vinculado"><select className={control} value={form.guardianId || ''} onChange={(e) => setForm({ ...form, guardianId: e.target.value })}>{db.guardians.map((g: any) => <option key={g.id} value={g.id}>{g.name}</option>)}</select></Field>}
        <Field label="Ativo"><select className={control} value={String(form.active)} onChange={(e) => setForm({ ...form, active: e.target.value === 'true' })}><option value="true">Sim</option><option value="false">Não</option></select></Field>
        <div className="flex items-end gap-2"><Button onClick={save}>Salvar</Button><Button variant="outline" onClick={() => setForm(null)}>Cancelar</Button></div>
      </Card>}
      {!rows.length ? <Empty text="Nenhum usuário encontrado." /> : rows.map((u: any) => <Card key={u.id} className="mb-3"><div className="flex justify-between gap-3"><div><h2 className="font-semibold">{u.name}</h2><p className="text-sm text-muted-foreground">{u.email} · {u.role} · {u.active ? 'ativo' : 'inativo'}</p></div><div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => setForm(u)}>Editar</Button><Button size="sm" variant="danger" onClick={() => { if (confirm('Excluir este usuário?')) { const r = deleteUser(u.id, session.userId); if (!r.ok) flash('err', r.error); else { reload(); flash('ok', 'Usuário excluído.'); } } }}>Excluir</Button></div></div></Card>)}
    </section>
  );
}

void Home; void Users; void GraduationCap; void BookOpen; void ClipboardList; void Bell; void MessageSquare; void UserRound;
