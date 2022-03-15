# HIPET

Para inicializar voce precisa necessáriamente ter instalado na sua maquina o mongoDB

Em seguida rode o comando `npm i`

Para testar de o seguinte comando `npm start`, o servidor vai ser inicializado em http://localhost:5050/
Todas as rotas estão configuradas dentro de /api então a rota de teste (versão) esta disponivel em http://localhost:5050/api/version

Para instalar o mock do mongoBd rode o comando `npm test` o download deve começar de forma automatica

Para rodar os testes unitarios rode `npm run test:unit` (os testes vão rodar automaticamente a cada modificação)
Para rodar os testes de integração rode `npm run test:integration` (os testes vão rodar automaticamente a cada modificação)
Para rodar todos os testes `npm run test`

A cada push vai rodar todos os testes e ser exibido a cobertura de testes no código, caso haja algum erro você não vai conseguir subir o seu código ate corrigi-lo
(mas dá pra fazer uma gambs quando lembrar eu coloco o comando)

O commit tbm esta padronizado sorry foi o template (se for pelo bem geral da nação a gente pode retirar). Para commitar a mensagem deve dizer se é uma feat, um refactor, um test, ou uma doc, em letras minusculas. Por exemplo:

```
feat: uma mensagem bem top
ou
refactor: modifiquei essa desgraca
ou
test: tdd reina
ou
doc: documenta essa pfvvvvvvv
ou
fix: tava bugado```