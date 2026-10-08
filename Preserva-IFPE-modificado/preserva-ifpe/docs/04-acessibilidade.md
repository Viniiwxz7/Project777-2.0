# Relatório de análise de acessibilidade

Produto: Preserva IFPE  
Data: 08/10/2026  
Referência: WCAG 2.2 níveis A e AA  
Ferramenta: verificação estática com script próprio (`scripts/a11y-check.mjs`), conferindo lang, título, rótulos, botões sem nome, tabelas, diálogo, skip link e mensagens de erro. A checagem foi complementada por revisão manual do fluxo de login e do portal.

## Como a ferramenta foi usada

```bash
node scripts/a11y-check.mjs
```

O script lê `index.html`, `AuthScreen.tsx` e `SchoolPortal.tsx` e aponta falhas objetivas. A revisão manual cobriu o que o script não vê: ordem do foco, contraste e anúncio de status.

## Falhas encontradas

| ID | Onde | Problema | Critério | Gravidade |
|---|---|---|---|---|
| A1 | index.html | Idioma da página em inglês | 3.1.1 | Alta |
| A2 | AuthScreen | Botão de mostrar senha sem nome acessível | 4.1.2 | Alta |
| A3 | AuthScreen | "Esqueci minha senha" sem ação | 2.1.1 / 3.2.4 | Média |
| A4 | AuthScreen | Erro de login só em silêncio, sem alerta | 3.3.1 | Alta |
| A5 | Telas antigas | Botões de resgatar prêmio, relatório e fiscalização sem função | 2.1.1 | Alta |
| A6 | App antigo | Área de admin e demais telas no mesmo menu, sem perfil | 2.4.5 / uso | Alta |
| A7 | Listas | Busca sem rótulo em várias telas | 1.3.1 | Média |
| A8 | Tabelas | Tabelas sem caption | 1.3.1 | Média |
| A9 | Menu mobile | Painel sem role de diálogo e botão sem nome | 4.1.2 | Média |
| A10 | Página | Sem link de pular para o conteúdo | 2.4.1 | Média |
| A11 | Status | Cor como único indicador em alguns badges antigos | 1.4.1 | Baixa |
| A12 | Título | title genérico em minúsculas | 2.4.2 | Baixa |

Total: 12 falhas.

## Resultado depois da correção

O mesmo script, rodado após o ajuste, deixa de apontar A1, A2, A4, A7, A8, A9, A10 e A12 nas telas novas. A5 e A6 foram resolvidas ao substituir o menu único pelo portal com ações reais. Restam A3 parcialmente orientado e A11 nas telas antigas de preservação que não entram no fluxo principal.

Correção registrada: 8 de 12 falhas, acima dos 50% exigidos.
