# HIPET

## Pré Requisitos
- [MongoBD](https://downloads.mongodb.com/compass/mongodb-compass-1.30.1-win32-x64.zip "MongoBD")
- [Node 16.14.x](https://nodejs.org/en/ "Node 16.14.x")

## Inicialização
***Obs: Se os passos abaixo não funcionarem fale com o adminstrador (rsrsrsrs)***

Para instalar todos os pacote de o seguinte comando, com o projeto já deve estar configurado e pronto para ser testado.
``` shell
npm i
```
Para subir o servidor local de o comando abaixo na raiz do projeto, o servidro será inicializado em http://localhost:5050/ 
``` shell
npm start
```
Todas as rotas estão configuradas dentro de `/api`
- Rota de apresentação (teste) - http://localhost:5050/api/version

## Testes
### Instalando mock do MongoDB

Para instalar o mock do MongoBD rode o comando, e o download deve começar de forma automatica
``` shell
npm test
```
### Rodando testes
***Obs: Os teste vão rodar automaticamente a cada modificação***

#### Testes unitários
Para rodar os testes unitarios rode o comando abaixo
``` shell
npm run test:unit
```
#### Testes de integração
Para rodar os testes unitarios rode o comando abaixo
``` shell
npm run test:integration
```
#### Todos os testes
Para rodar os testes unitarios rode o comando abaixo
``` shell
npm run test
```
#### Teste de cobertura
Para rodar os testes unitarios rode o comando abaixo
``` shell
npm run test:ci
```
## Pontos de atenção
***Obs: Essa DESGRAÇA já tava configurada assim não tenho culpa de nada (ou talvez tenha nunca saberão)
Obs2: Sobre os commits se for pelo bem geral da nação a gente pode retirar
Obs3: Ou podemos tirar tudo seus inimigos do CI***


- A cada push vai rodar *todos os testes* e ser exibido a cobertura de testes no código
- Caso haja algum erro em algum teste você não vai conseguir subir o seu código ate corrigi-lo (*se você **REALMENTE** quiser não validar nada (você não vai querer isso :D) e **REALMENTE CONFIA EM VOCÊ MESMO**  (me dá a receita pra auto-estima) é só dar* `git commit -m "feat: mensagem legal" --no-verify`)
- O commit está padronizado *(sorry ja tava configurado no template)*, então para commitar a mensagem deve dizer se é uma **feat**, um **refactor**, um **test**, uma **doc** ou um **fix**, deve estar tudo em letras minusculas. Por exemplo:
`feat: uma mensagem bem top`
ou
`refactor: modifiquei essa desgraca`
ou
`test: tdd reina`
ou
`doc: documentado essa droga`
ou
`fix: tava bugado`