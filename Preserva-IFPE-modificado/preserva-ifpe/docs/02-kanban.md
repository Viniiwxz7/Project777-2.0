# Quadro Kanban — 4ª unidade e próxima sprint

Atualizado em 08/10/2026.

## Concluído nesta entrega

- Login por perfil (aluno, responsável e admin), com bloqueio de área.
- Início, notas, faltas, tarefas, avisos e perfil do aluno, só com os próprios dados.
- Filhos vinculados, notas, faltas, avisos e mensagens do responsável.
- Painel administrativo com CRUD de alunos, responsáveis, turmas, professores, disciplinas, avisos, usuários, notas, faltas, tarefas e mensagens.
- Validação de obrigatórios, e-mail, data e vínculo aluno-responsável-turma.
- Exclusão com confirmação e bloqueio quando o vínculo quebraria.
- Cabeçalho, menu por perfil e rodapé comuns.
- Correções de acessibilidade listadas no relatório próprio.

## Em revisão

- Contraste do cabeçalho em gradiente no modo escuro.
- Foco preso dentro do menu mobile.
- Exportação ainda em TXT no módulo antigo de doações.

## Pronto para a próxima sprint

| Ordem | Card | Por que entra agora |
|---|---|---|
| 1 | TST-05 Testes de login e CRUD | Protege o que acabou de ser entregue. |
| 2 | PDF-04 Boletim e relatório em PDF | Pais e admin já têm os dados na tela. |
| 3 | NOT-03 Aviso interno de nova nota e falta | Não depende de serviço externo. |
| 4 | REC-07 Recuperação de senha | O botão já existe e hoje só orienta. |

## Backlog

- API com banco compartilhado.
- Câmeras ao vivo.
- Auditoria de alterações.
- Modo offline.
- Integração do módulo antigo de doações ao mesmo login por perfil.

## Análise

A próxima sprint não deve abrir câmera nem backend completo. O risco maior agora é regressão de permissão. Por isso o primeiro card é teste de acesso: aluno não vê admin, responsável não vê filho de outro cadastro, exclusão com vínculo continua bloqueada.
