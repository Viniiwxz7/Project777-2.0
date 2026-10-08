# Como testar

Senha de todas as contas de demonstração: `123456`

| Perfil | E-mail | O que abre |
|---|---|---|
| Aluno | aluno@ifpe.edu.br | Início, notas, faltas, tarefas, avisos e perfil de João |
| Responsável | pais@ifpe.edu.br | Início, filhos João e Ana, notas, faltas, avisos e mensagens |
| Admin | admin@ifpe.edu.br | Painel e todos os cadastros |

Aluno e responsável não têm menu de turmas, usuários ou professores. Se a view for forçada, o portal volta para o início.

## CRUD

No admin, cada cadastro tem Novo, Buscar, Editar e Excluir.

- Aluno exige nome, e-mail válido, matrícula, turma e responsável.
- Excluir aluno com nota ou falta é bloqueado.
- Excluir responsável com filho vinculado é bloqueado.
- Excluir turma com aluno ou disciplina é bloqueado.
- Excluir o próprio admin logado é bloqueado.
- Mensagem só salva se o aluno pertence ao responsável escolhido.

Os dados ficam no navegador, na chave `preserva_school_db_v1`. O módulo antigo de doações continua em `preserva_donors`, `preserva_materials` e `preserva_donations`.
