export type Role = 'aluno' | 'pais' | 'admin';

export interface Session {
  userId: string;
  name: string;
  email: string;
  role: Role;
  studentId?: string;
  guardianId?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  studentId?: string;
  guardianId?: string;
  active: boolean;
}

export interface SchoolClass {
  id: string;
  name: string;
  year: string;
  shift: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  area: string;
}

export interface Subject {
  id: string;
  name: string;
  classId: string;
  teacherId: string;
}

export interface Guardian {
  id: string;
  name: string;
  email: string;
  phone: string;
  studentIds: string[];
}

export interface Student {
  id: string;
  name: string;
  email: string;
  enrollment: string;
  classId: string;
  guardianId: string;
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  term: string;
  value: number;
  date: string;
}

export interface Absence {
  id: string;
  studentId: string;
  subjectId: string;
  date: string;
  justified: boolean;
  note: string;
}

export interface Task {
  id: string;
  classId: string;
  subjectId: string;
  title: string;
  dueDate: string;
  description: string;
}

export interface Notice {
  id: string;
  title: string;
  body: string;
  audience: 'todos' | 'alunos' | 'pais';
  date: string;
}

export interface SchoolMessage {
  id: string;
  guardianId: string;
  studentId: string;
  title: string;
  body: string;
  date: string;
  from: string;
}

interface Db {
  users: UserAccount[];
  classes: SchoolClass[];
  teachers: Teacher[];
  subjects: Subject[];
  guardians: Guardian[];
  students: Student[];
  grades: Grade[];
  absences: Absence[];
  tasks: Task[];
  notices: Notice[];
  messages: SchoolMessage[];
}

const KEY = 'preserva_school_db_v1';
const SESSION_KEY = 'preserva_session_v1';

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function seed(): Db {
  const classA = 'c-info2';
  const classB = 'c-info1';
  const t1 = 't-ana';
  const t2 = 't-carlos';
  const g1 = 'g-maria';
  const g2 = 'g-paulo';
  const s1 = 's-joao';
  const s2 = 's-ana';
  const s3 = 's-lucas';
  const sub1 = 'sub-mat';
  const sub2 = 'sub-prog';
  const sub3 = 'sub-fis';

  return {
    classes: [
      { id: classA, name: '2º Ano — Informática', year: '2026', shift: 'Manhã' },
      { id: classB, name: '1º Ano — Informática', year: '2026', shift: 'Tarde' },
    ],
    teachers: [
      { id: t1, name: 'Ana Maria Souza', email: 'ana.souza@ifpe.edu.br', area: 'Matemática' },
      { id: t2, name: 'Carlos Lima', email: 'carlos.lima@ifpe.edu.br', area: 'Programação' },
    ],
    subjects: [
      { id: sub1, name: 'Matemática', classId: classA, teacherId: t1 },
      { id: sub2, name: 'Programação I', classId: classA, teacherId: t2 },
      { id: sub3, name: 'Física', classId: classB, teacherId: t1 },
    ],
    guardians: [
      { id: g1, name: 'Maria Silva Santos', email: 'pais@ifpe.edu.br', phone: '(81) 98888-1001', studentIds: [s1, s2] },
      { id: g2, name: 'Paulo Ferreira', email: 'paulo.ferreira@email.com', phone: '(81) 98888-1002', studentIds: [s3] },
    ],
    students: [
      { id: s1, name: 'João Silva Santos', email: 'aluno@ifpe.edu.br', enrollment: '20241TINFO0001', classId: classA, guardianId: g1 },
      { id: s2, name: 'Ana Silva Santos', email: 'ana.silva@ifpe.edu.br', enrollment: '20251TINFO0014', classId: classB, guardianId: g1 },
      { id: s3, name: 'Lucas Ferreira', email: 'lucas.ferreira@ifpe.edu.br', enrollment: '20241TINFO0008', classId: classA, guardianId: g2 },
    ],
    grades: [
      { id: uid(), studentId: s1, subjectId: sub1, term: '1ª unidade', value: 8.5, date: '2026-04-10' },
      { id: uid(), studentId: s1, subjectId: sub2, term: '1ª unidade', value: 9.0, date: '2026-04-12' },
      { id: uid(), studentId: s2, subjectId: sub3, term: '1ª unidade', value: 7.4, date: '2026-04-11' },
      { id: uid(), studentId: s3, subjectId: sub1, term: '1ª unidade', value: 6.8, date: '2026-04-10' },
    ],
    absences: [
      { id: uid(), studentId: s1, subjectId: sub1, date: '2026-03-18', justified: true, note: 'Atestado médico' },
      { id: uid(), studentId: s2, subjectId: sub3, date: '2026-03-20', justified: false, note: '' },
    ],
    tasks: [
      { id: uid(), classId: classA, subjectId: sub2, title: 'Lista de algoritmos', dueDate: '2026-04-28', description: 'Entregar os exercícios 1 a 8.' },
      { id: uid(), classId: classB, subjectId: sub3, title: 'Relatório de experimento', dueDate: '2026-04-30', description: 'Descrever o experimento de movimento.' },
    ],
    notices: [
      { id: uid(), title: 'Reunião de responsáveis', body: 'Reunião no auditório às 19h do dia 22/04.', audience: 'pais', date: '2026-04-15' },
      { id: uid(), title: 'Semana de provas', body: 'A 2ª unidade começa em 05/05. Tragam o material didático.', audience: 'alunos', date: '2026-04-16' },
      { id: uid(), title: 'Manutenção da biblioteca', body: 'A biblioteca fecha sexta à tarde.', audience: 'todos', date: '2026-04-17' },
    ],
    messages: [
      { id: uid(), guardianId: g1, studentId: s1, title: 'Falta justificada', body: 'O atestado de João foi registrado.', date: '2026-03-19', from: 'Coordenação de Informática' },
      { id: uid(), guardianId: g1, studentId: s2, title: 'Desempenho em Física', body: 'Ana pode reforçar os exercícios da unidade.', date: '2026-04-12', from: 'Prof. Ana Maria Souza' },
    ],
    users: [
      { id: 'u-admin', name: 'Coordenação IFPE', email: 'admin@ifpe.edu.br', password: '123456', role: 'admin', active: true },
      { id: 'u-aluno', name: 'João Silva Santos', email: 'aluno@ifpe.edu.br', password: '123456', role: 'aluno', studentId: s1, active: true },
      { id: 'u-pais', name: 'Maria Silva Santos', email: 'pais@ifpe.edu.br', password: '123456', role: 'pais', guardianId: g1, active: true },
    ],
  };
}

function load(): Db {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const data = seed();
      localStorage.setItem(KEY, JSON.stringify(data));
      return data;
    }
    const parsed = JSON.parse(raw) as Db;
    if (!parsed.users || !parsed.students) {
      const data = seed();
      localStorage.setItem(KEY, JSON.stringify(data));
      return data;
    }
    return parsed;
  } catch {
    const data = seed();
    localStorage.setItem(KEY, JSON.stringify(data));
    return data;
  }
}

function save(db: Db) {
  localStorage.setItem(KEY, JSON.stringify(db));
}

export function getDb() {
  return load();
}

export function resetSchoolDemo() {
  const data = seed();
  save(data);
  return data;
}

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function setSession(session: Session | null) {
  if (!session) localStorage.removeItem(SESSION_KEY);
  else localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function login(email: string, password: string): { ok: true; session: Session } | { ok: false; error: string } {
  const account = load().users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  if (!account || account.password !== password) return { ok: false, error: 'E-mail ou senha inválidos.' };
  if (!account.active) return { ok: false, error: 'Usuário inativo. Procure a coordenação.' };
  const session: Session = {
    userId: account.id,
    name: account.name,
    email: account.email,
    role: account.role,
    studentId: account.studentId,
    guardianId: account.guardianId,
  };
  setSession(session);
  return { ok: true, session };
}

export function registerAccount(input: { name: string; email: string; password: string; role: Role }): { ok: true; session: Session } | { ok: false; error: string } {
  const emailError = validateEmail(input.email);
  if (!input.name.trim()) return { ok: false, error: 'Informe o nome.' };
  if (emailError) return { ok: false, error: emailError };
  if (input.password.length < 6) return { ok: false, error: 'A senha precisa ter pelo menos 6 caracteres.' };
  if (input.role === 'admin') return { ok: false, error: 'Conta de administrador só pode ser criada pela coordenação.' };
  const db = load();
  if (db.users.some((u) => u.email.toLowerCase() === input.email.trim().toLowerCase())) {
    return { ok: false, error: 'Já existe uma conta com este e-mail.' };
  }
  const id = uid();
  let studentId: string | undefined;
  let guardianId: string | undefined;
  if (input.role === 'aluno') {
    studentId = uid();
    const classId = db.classes[0]?.id;
    if (!classId) return { ok: false, error: 'Não há turma cadastrada para vincular o aluno.' };
    const guardianIdNew = db.guardians[0]?.id || uid();
    db.students.push({
      id: studentId,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      enrollment: `2026${Math.floor(1000 + Math.random() * 9000)}`,
      classId,
      guardianId: guardianIdNew,
    });
  }
  if (input.role === 'pais') {
    guardianId = uid();
    db.guardians.push({
      id: guardianId,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: '',
      studentIds: [],
    });
  }
  db.users.push({
    id,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    password: input.password,
    role: input.role,
    studentId,
    guardianId,
    active: true,
  });
  save(db);
  const session: Session = { userId: id, name: input.name.trim(), email: input.email.trim().toLowerCase(), role: input.role, studentId, guardianId };
  setSession(session);
  return { ok: true, session };
}

export function validateEmail(email: string) {
  if (!email.trim()) return 'Informe o e-mail.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'E-mail inválido.';
  return '';
}

export function validateDate(value: string) {
  if (!value) return 'Informe a data.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'Data inválida.';
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return 'Data inválida.';
  return '';
}

export function className(id: string) {
  return load().classes.find((c) => c.id === id)?.name || 'Turma não encontrada';
}

export function subjectName(id: string) {
  return load().subjects.find((s) => s.id === id)?.name || 'Disciplina não encontrada';
}

export function teacherName(id: string) {
  return load().teachers.find((t) => t.id === id)?.name || 'Professor não encontrado';
}

export function guardianName(id: string) {
  return load().guardians.find((g) => g.id === id)?.name || 'Responsável não encontrado';
}

export function studentName(id: string) {
  return load().students.find((s) => s.id === id)?.name || 'Aluno não encontrado';
}

export function visibleStudentIds(session: Session) {
  const db = load();
  if (session.role === 'admin') return db.students.map((s) => s.id);
  if (session.role === 'aluno') return session.studentId ? [session.studentId] : [];
  const guardian = db.guardians.find((g) => g.id === session.guardianId);
  return guardian?.studentIds || [];
}

export function upsertClass(data: Omit<SchoolClass, 'id'> & { id?: string }) {
  if (!data.name.trim() || !data.year.trim() || !data.shift.trim()) return { ok: false as const, error: 'Preencha nome, ano e turno.' };
  const db = load();
  if (data.id) {
    db.classes = db.classes.map((c) => (c.id === data.id ? { ...c, ...data, id: c.id } : c));
  } else {
    db.classes.push({ id: uid(), name: data.name.trim(), year: data.year.trim(), shift: data.shift.trim() });
  }
  save(db);
  return { ok: true as const };
}

export function deleteClass(id: string) {
  const db = load();
  if (db.students.some((s) => s.classId === id) || db.subjects.some((s) => s.classId === id)) {
    return { ok: false as const, error: 'Não é possível excluir: há alunos ou disciplinas vinculados a esta turma.' };
  }
  db.classes = db.classes.filter((c) => c.id !== id);
  save(db);
  return { ok: true as const };
}

export function upsertTeacher(data: Omit<Teacher, 'id'> & { id?: string }) {
  const emailError = validateEmail(data.email);
  if (!data.name.trim() || !data.area.trim()) return { ok: false as const, error: 'Preencha nome e área.' };
  if (emailError) return { ok: false as const, error: emailError };
  const db = load();
  if (data.id) db.teachers = db.teachers.map((t) => (t.id === data.id ? { ...t, ...data, id: t.id, email: data.email.trim().toLowerCase() } : t));
  else db.teachers.push({ id: uid(), name: data.name.trim(), email: data.email.trim().toLowerCase(), area: data.area.trim() });
  save(db);
  return { ok: true as const };
}

export function deleteTeacher(id: string) {
  const db = load();
  if (db.subjects.some((s) => s.teacherId === id)) return { ok: false as const, error: 'Não é possível excluir: há disciplinas vinculadas a este professor.' };
  db.teachers = db.teachers.filter((t) => t.id !== id);
  save(db);
  return { ok: true as const };
}

export function upsertSubject(data: Omit<Subject, 'id'> & { id?: string }) {
  if (!data.name.trim() || !data.classId || !data.teacherId) return { ok: false as const, error: 'Preencha disciplina, turma e professor.' };
  const db = load();
  if (data.id) db.subjects = db.subjects.map((s) => (s.id === data.id ? { ...s, ...data, id: s.id } : s));
  else db.subjects.push({ id: uid(), name: data.name.trim(), classId: data.classId, teacherId: data.teacherId });
  save(db);
  return { ok: true as const };
}

export function deleteSubject(id: string) {
  const db = load();
  if (db.grades.some((g) => g.subjectId === id) || db.absences.some((a) => a.subjectId === id) || db.tasks.some((t) => t.subjectId === id)) {
    return { ok: false as const, error: 'Não é possível excluir: há notas, faltas ou tarefas vinculadas.' };
  }
  db.subjects = db.subjects.filter((s) => s.id !== id);
  save(db);
  return { ok: true as const };
}

export function upsertGuardian(data: Omit<Guardian, 'id' | 'studentIds'> & { id?: string; studentIds?: string[] }) {
  const emailError = validateEmail(data.email);
  if (!data.name.trim()) return { ok: false as const, error: 'Informe o nome do responsável.' };
  if (emailError) return { ok: false as const, error: emailError };
  const db = load();
  if (data.id) {
    db.guardians = db.guardians.map((g) => (g.id === data.id ? { ...g, name: data.name.trim(), email: data.email.trim().toLowerCase(), phone: data.phone.trim(), studentIds: data.studentIds || g.studentIds } : g));
    db.users = db.users.map((u) => (u.guardianId === data.id ? { ...u, name: data.name.trim(), email: data.email.trim().toLowerCase() } : u));
  } else {
    const id = uid();
    db.guardians.push({ id, name: data.name.trim(), email: data.email.trim().toLowerCase(), phone: data.phone.trim(), studentIds: data.studentIds || [] });
    if (!db.users.some((u) => u.email === data.email.trim().toLowerCase())) {
      db.users.push({ id: uid(), name: data.name.trim(), email: data.email.trim().toLowerCase(), password: '123456', role: 'pais', guardianId: id, active: true });
    }
  }
  save(db);
  return { ok: true as const };
}

export function deleteGuardian(id: string) {
  const db = load();
  if (db.students.some((s) => s.guardianId === id)) return { ok: false as const, error: 'Não é possível excluir: há alunos vinculados a este responsável.' };
  db.guardians = db.guardians.filter((g) => g.id !== id);
  db.users = db.users.filter((u) => u.guardianId !== id);
  db.messages = db.messages.filter((m) => m.guardianId !== id);
  save(db);
  return { ok: true as const };
}

export function upsertStudent(data: Omit<Student, 'id'> & { id?: string }) {
  const emailError = validateEmail(data.email);
  if (!data.name.trim() || !data.enrollment.trim()) return { ok: false as const, error: 'Informe nome e matrícula.' };
  if (emailError) return { ok: false as const, error: emailError };
  if (!data.classId || !data.guardianId) return { ok: false as const, error: 'Vincule o aluno a uma turma e a um responsável.' };
  const db = load();
  if (!db.classes.some((c) => c.id === data.classId)) return { ok: false as const, error: 'Turma inválida.' };
  if (!db.guardians.some((g) => g.id === data.guardianId)) return { ok: false as const, error: 'Responsável inválido.' };
  if (data.id) {
    const previous = db.students.find((s) => s.id === data.id);
    db.students = db.students.map((s) => (s.id === data.id ? { ...s, ...data, id: s.id, email: data.email.trim().toLowerCase() } : s));
    db.guardians = db.guardians.map((g) => ({
      ...g,
      studentIds: g.studentIds.filter((id) => id !== data.id),
    }));
    db.guardians = db.guardians.map((g) => (g.id === data.guardianId ? { ...g, studentIds: [...g.studentIds, data.id!] } : g));
    db.users = db.users.map((u) => (u.studentId === data.id ? { ...u, name: data.name.trim(), email: data.email.trim().toLowerCase() } : u));
    if (previous && previous.guardianId !== data.guardianId) {
      db.messages = db.messages.map((m) => (m.studentId === data.id ? { ...m, guardianId: data.guardianId } : m));
    }
  } else {
    const id = uid();
    db.students.push({ id, name: data.name.trim(), email: data.email.trim().toLowerCase(), enrollment: data.enrollment.trim(), classId: data.classId, guardianId: data.guardianId });
    db.guardians = db.guardians.map((g) => (g.id === data.guardianId ? { ...g, studentIds: [...g.studentIds, id] } : g));
    if (!db.users.some((u) => u.email === data.email.trim().toLowerCase())) {
      db.users.push({ id: uid(), name: data.name.trim(), email: data.email.trim().toLowerCase(), password: '123456', role: 'aluno', studentId: id, active: true });
    }
  }
  save(db);
  return { ok: true as const };
}

export function deleteStudent(id: string) {
  const db = load();
  const linked = db.grades.some((g) => g.studentId === id) || db.absences.some((a) => a.studentId === id);
  if (linked) return { ok: false as const, error: 'Não é possível excluir: há notas ou faltas vinculadas. Remova esses registros antes.' };
  db.students = db.students.filter((s) => s.id !== id);
  db.guardians = db.guardians.map((g) => ({ ...g, studentIds: g.studentIds.filter((sid) => sid !== id) }));
  db.users = db.users.filter((u) => u.studentId !== id);
  db.messages = db.messages.filter((m) => m.studentId !== id);
  save(db);
  return { ok: true as const };
}

export function upsertGrade(data: Omit<Grade, 'id'> & { id?: string }) {
  if (!data.studentId || !data.subjectId || !data.term.trim()) return { ok: false as const, error: 'Preencha aluno, disciplina e unidade.' };
  const dateError = validateDate(data.date);
  if (dateError) return { ok: false as const, error: dateError };
  if (Number.isNaN(data.value) || data.value < 0 || data.value > 10) return { ok: false as const, error: 'A nota deve estar entre 0 e 10.' };
  const db = load();
  if (data.id) db.grades = db.grades.map((g) => (g.id === data.id ? { ...g, ...data, id: g.id } : g));
  else db.grades.push({ ...data, id: uid(), term: data.term.trim() });
  save(db);
  return { ok: true as const };
}

export function deleteGrade(id: string) {
  const db = load();
  db.grades = db.grades.filter((g) => g.id !== id);
  save(db);
  return { ok: true as const };
}

export function upsertAbsence(data: Omit<Absence, 'id'> & { id?: string }) {
  if (!data.studentId || !data.subjectId) return { ok: false as const, error: 'Selecione aluno e disciplina.' };
  const dateError = validateDate(data.date);
  if (dateError) return { ok: false as const, error: dateError };
  const db = load();
  if (data.id) db.absences = db.absences.map((a) => (a.id === data.id ? { ...a, ...data, id: a.id } : a));
  else db.absences.push({ ...data, id: uid(), note: data.note.trim() });
  save(db);
  return { ok: true as const };
}

export function deleteAbsence(id: string) {
  const db = load();
  db.absences = db.absences.filter((a) => a.id !== id);
  save(db);
  return { ok: true as const };
}

export function upsertTask(data: Omit<Task, 'id'> & { id?: string }) {
  if (!data.title.trim() || !data.classId || !data.subjectId) return { ok: false as const, error: 'Preencha título, turma e disciplina.' };
  const dateError = validateDate(data.dueDate);
  if (dateError) return { ok: false as const, error: dateError };
  const db = load();
  const subject = db.subjects.find((s) => s.id === data.subjectId);
  if (subject && subject.classId !== data.classId) return { ok: false as const, error: 'A disciplina não pertence à turma selecionada.' };
  if (data.id) db.tasks = db.tasks.map((t) => (t.id === data.id ? { ...t, ...data, id: t.id, title: data.title.trim() } : t));
  else db.tasks.push({ ...data, id: uid(), title: data.title.trim(), description: data.description.trim() });
  save(db);
  return { ok: true as const };
}

export function deleteTask(id: string) {
  const db = load();
  db.tasks = db.tasks.filter((t) => t.id !== id);
  save(db);
  return { ok: true as const };
}

export function upsertNotice(data: Omit<Notice, 'id'> & { id?: string }) {
  if (!data.title.trim() || !data.body.trim()) return { ok: false as const, error: 'Preencha título e texto do aviso.' };
  const dateError = validateDate(data.date);
  if (dateError) return { ok: false as const, error: dateError };
  const db = load();
  if (data.id) db.notices = db.notices.map((n) => (n.id === data.id ? { ...n, ...data, id: n.id } : n));
  else db.notices.push({ ...data, id: uid(), title: data.title.trim(), body: data.body.trim() });
  save(db);
  return { ok: true as const };
}

export function deleteNotice(id: string) {
  const db = load();
  db.notices = db.notices.filter((n) => n.id !== id);
  save(db);
  return { ok: true as const };
}

export function upsertMessage(data: Omit<SchoolMessage, 'id'> & { id?: string }) {
  if (!data.title.trim() || !data.body.trim() || !data.guardianId || !data.studentId) return { ok: false as const, error: 'Preencha responsável, aluno, título e mensagem.' };
  const dateError = validateDate(data.date);
  if (dateError) return { ok: false as const, error: dateError };
  const db = load();
  const student = db.students.find((s) => s.id === data.studentId);
  if (!student || student.guardianId !== data.guardianId) return { ok: false as const, error: 'O aluno não está vinculado a este responsável.' };
  if (data.id) db.messages = db.messages.map((m) => (m.id === data.id ? { ...m, ...data, id: m.id } : m));
  else db.messages.push({ ...data, id: uid(), title: data.title.trim(), body: data.body.trim(), from: data.from.trim() || 'Coordenação' });
  save(db);
  return { ok: true as const };
}

export function deleteMessage(id: string) {
  const db = load();
  db.messages = db.messages.filter((m) => m.id !== id);
  save(db);
  return { ok: true as const };
}

export function upsertUser(data: Omit<UserAccount, 'id'> & { id?: string }) {
  const emailError = validateEmail(data.email);
  if (!data.name.trim()) return { ok: false as const, error: 'Informe o nome.' };
  if (emailError) return { ok: false as const, error: emailError };
  if (data.password.length < 6) return { ok: false as const, error: 'A senha precisa ter pelo menos 6 caracteres.' };
  if (data.role === 'aluno' && !data.studentId) return { ok: false as const, error: 'Vincule o usuário a um aluno.' };
  if (data.role === 'pais' && !data.guardianId) return { ok: false as const, error: 'Vincule o usuário a um responsável.' };
  const db = load();
  const duplicate = db.users.find((u) => u.email.toLowerCase() === data.email.trim().toLowerCase() && u.id !== data.id);
  if (duplicate) return { ok: false as const, error: 'Já existe um usuário com este e-mail.' };
  if (data.id) db.users = db.users.map((u) => (u.id === data.id ? { ...u, ...data, id: u.id, email: data.email.trim().toLowerCase() } : u));
  else db.users.push({ ...data, id: uid(), email: data.email.trim().toLowerCase(), name: data.name.trim() });
  save(db);
  return { ok: true as const };
}

export function deleteUser(id: string, currentUserId: string) {
  if (id === currentUserId) return { ok: false as const, error: 'Você não pode excluir a própria conta enquanto estiver logado.' };
  const db = load();
  const user = db.users.find((u) => u.id === id);
  if (!user) return { ok: false as const, error: 'Usuário não encontrado.' };
  if (user.role === 'admin' && db.users.filter((u) => u.role === 'admin').length <= 1) {
    return { ok: false as const, error: 'Não é possível excluir o único administrador.' };
  }
  db.users = db.users.filter((u) => u.id !== id);
  save(db);
  return { ok: true as const };
}
