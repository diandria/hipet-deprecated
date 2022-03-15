# HIPET

Para inicializar voce precisa necessáriamente ter instalado na sua maquina o mongoDB

Em seguida rode o comando `npm i`

Para testar de o seguinte comando `npm start`, o servidor vai ser inicializado em http://localhost:5050/
Todas as rotas estão configuradas dentro de /api então a rota de teste esta disponivel em http://localhost:5050/api/teste

Para instalar o mock do mongoBd rode o comando `npm test` o download deve começar de forma automatica

Para rodar os testes unitarios rode `npm run test:unit` (os testes vão rodar automaticamente a cada modificação)
Para rodar os testes de integração rode `npm run test:integration` (os testes vão rodar automaticamente a cada modificação)
Para rodar todos os testes `npm run test`