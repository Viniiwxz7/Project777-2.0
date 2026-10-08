# Planning Poker — cards ainda não entregues

Data: 08/10/2026  
Equipe: Preserva IFPE  
Escala: Fibonacci (1, 2, 3, 5, 8, 13)  
Referência: 3 pontos = tela com formulário e listagem, sem integração externa.

## Rodada

| Card | Descrição | Votos | Consenso | Observação |
|---|---|---|---|---|
| API-01 | Trocar localStorage por API com autenticação real | 8, 8, 13, 8 | 8 | Persistência atual atende à demo, mas não é multiusuário. |
| CAM-02 | Câmeras ao vivo do campus | 13, 8, 13, 13 | 13 | Depende de equipamento e permissão institucional. |
| NOT-03 | Notificações push de falta, nota e aviso | 5, 5, 8, 5 | 5 | Pode começar por aviso interno. |
| PDF-04 | Relatório de doações e boletim em PDF | 3, 5, 3, 5 | 5 | TXT já existe; PDF pede layout. |
| TST-05 | Testes automatizados de login e CRUD | 5, 5, 8, 5 | 5 | Cobre aluno, pais e admin. |
| AUD-06 | Trilha de auditoria das alterações do admin | 5, 8, 5, 8 | 8 | Quem alterou nota, falta e vínculo. |
| REC-07 | Recuperação de senha por e-mail | 5, 5, 3, 5 | 5 | Hoje só há orientação na tela. |
| OFF-08 | Uso offline com sincronização | 8, 13, 8, 13 | 13 | Fora do escopo imediato. |

## Resultado

- Total estimado do backlog restante: 62 pontos.
- Capacidade observada na sprint anterior: cerca de 20 pontos.
- Próxima sprint cabe de 18 a 21 pontos: NOT-03, PDF-04, TST-05 e REC-07.
- API-01 fica como spike no início da sprint seguinte, sem prometer a troca completa.
- CAM-02 e OFF-08 permanecem no backlog por dependência externa.

## Critério de pronto usado na votação

Card só entra como entregue quando tem tela em português, validação, mensagem de sucesso ou erro, lista recarregada e bloqueio de acesso indevido.
