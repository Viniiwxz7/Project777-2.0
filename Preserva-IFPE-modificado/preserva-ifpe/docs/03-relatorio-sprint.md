# Relatório da sprint anterior

Período de referência: entrega do módulo de doações do Preserva IFPE.  
Data do relatório: 08/10/2026.

## O que foi combinado

Cadastrar doadores, cadastrar materiais escolares, registrar doação com baixa ou aumento de estoque e gerar relatório com filtro.

## O que foi entregue

- Cadastro, edição e exclusão de doadores.
- Cadastro de materiais com quantidade, categoria e estado.
- Registro de doação com atualização automática do estoque.
- Relatório com filtro por doador, período e busca, além de exportação TXT.
- Persistência em localStorage, sem servidor.
- Navegação no menu desktop e no menu mobile.

## O que não foi entregue

- Login separado por perfil.
- Notas, faltas e tarefas.
- Bloqueio real de rota administrativa.
- Relatório em PDF.
- Base compartilhada entre usuários.
- Varredura de acessibilidade com ferramenta.

## Como foi a entrega

O módulo de doações funcionou de ponta a ponta na demonstração. O atraso apareceu na publicação: o upload pelo site do GitHub recusou o pacote por quantidade de arquivos, e o caminho no Termux não estava liberado. A execução local pelo Vite ficou dependente de entrar na pasta que contém o package.json.

## Lições aprendidas

- Protótipo visual não substitui fluxo salvando de verdade. Vários botões da sprint anterior só abriam alerta ou não faziam nada.
- Dados só na memória da tela somem ao recarregar. A persistência precisa nascer junto com o formulário.
- Menu único para todo mundo impede entrega de perfil. A separação aluno, pais e admin tinha que ser card próprio.
- Publicar pelo navegador do GitHub não escala. O próximo envio deve ser por Git, com .gitignore.
- Acessibilidade deixada para o fim vira retrabalho. Lang, nome de botão e rótulo de campo custam pouco se entram no pronto.

## Ajuste para a sprint atual

Cada tela de cadastro passou a ter criar, listar, buscar, editar, excluir, validar e recarregar a lista. O acesso administrativo deixou de aparecer para aluno e responsável.
