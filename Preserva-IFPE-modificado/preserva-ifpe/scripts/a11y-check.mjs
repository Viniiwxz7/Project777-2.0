import fs from 'node:fs';

const files = [
  'index.html',
  'src/app/components/AuthScreen.tsx',
  'src/app/components/SchoolPortal.tsx',
  'src/app/App.tsx',
];

const text = Object.fromEntries(files.map((file) => [file, fs.readFileSync(file, 'utf8')]));
const issues = [];

if (!text['index.html'].includes('lang="pt-BR"')) issues.push('A1 html sem lang pt-BR');
if (!text['index.html'].includes('<title>Preserva IFPE</title>')) issues.push('A12 title ausente ou genérico');
if (!text['src/app/components/AuthScreen.tsx'].includes('Ocultar senha')) issues.push('A2 botão de senha sem nome');
if (!text['src/app/components/AuthScreen.tsx'].includes('role="alert"')) issues.push('A4 erro sem role=alert');
if (!text['src/app/components/SchoolPortal.tsx'].includes('aria-label="Buscar"')) issues.push('A7 busca sem rótulo');
if (!text['src/app/components/SchoolPortal.tsx'].includes('<caption')) issues.push('A8 tabela sem caption');
if (!text['src/app/components/SchoolPortal.tsx'].includes('aria-modal="true"')) issues.push('A9 menu sem diálogo');
if (!text['src/app/components/SchoolPortal.tsx'].includes('Ir para o conteúdo')) issues.push('A10 sem skip link');
if (!text['src/app/App.tsx'].includes('SchoolPortal')) issues.push('A6 portal por perfil ausente');
if ((text['src/app/components/SchoolPortal.tsx'].match(/onClick=\{/g) || []).length < 5) issues.push('A5 poucos botões com ação');

if (issues.length) {
  console.log('Falhas ainda presentes:');
  issues.forEach((item) => console.log('- ' + item));
  process.exit(1);
}

console.log('Verificação de acessibilidade: sem as falhas corrigidas (A1, A2, A4, A5, A6, A7, A8, A9, A10, A12).');
