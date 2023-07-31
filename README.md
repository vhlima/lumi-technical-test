# Lumi Technical Interview

Este projeto é parte da entrevista técnica da empresa Lumi.

Os mockups deste projeto estão disponíveis no Figma:
[Link para o Figma](https://www.figma.com/file/nxk7ksj16VDwJRYnJU77z2/Lumi?type=design&node-id=0%3A1&mode=design&t=Em7i71SCw3fKM9lc-1)

## Opiniões
Este projeto poderia ser construído utilizando uma variedade de tecnologias, como Next.js, React Query, Redux e Apollo Client. No entanto, optei por abordá-lo de forma mais "simples", buscando promover um melhor entendimento de conceitos gerais, em vez de focar em conhecimentos específicos de uma determinada tecnologia ou framework (apesar de ser um grande admirador e utilizador dessas bibliotecas mencionadas em meus projetos). A escolha de tecnologias mais simples permitiu destacar os princípios fundamentais do desenvolvimento e proporcionar uma experiência mais didática ao analisar o projeto.

## Como executar o projeto

**Primeira maneira:**
Se você tiver o Docker no seu computador, basta rodar o comando: `docker-compose build` e depois `docker-compose up`.

**Segunda maneira:**
Se você não tiver o Docker, siga os passos abaixo:
1. Instale as dependências rodando `yarn install` na raiz do projeto.
2. Crie os arquivos de variáveis ambiente para o app web e o app server, tendo como base os arquivos `.env.example` localizados na pasta de cada respectivo app.
3. Após configurar as variáveis ambiente, inicie o app server utilizando `yarn dev`.
4. Em seguida, você poderá iniciar o app web utilizando `yarn start`.

## Testes

**Frontend:**
Testes unitários: 
`yarn test`
Testes E2E: 
`yarn cypress`
**ATENÇÃO:** Antes de rodar os testes de integração, pelo menos um boleto precisa ser enviado ao banco de dados.

**Backend:**
Testes unitários: `yarn test`

## Backend

O backend dessa aplicação foi construído baseado no conceito de clean architecture. Algumas vezes, este conceito não está sendo 100% aplicado devido ao fato de ser apenas um projeto "MVP". Para um projeto em escala real, algumas mudanças deveriam ser feitas.

Tecnologias utilizadas:
- Express
- Celebrate
- Joi
- Multer
- Pdf.js
- TypeORM
- Jest

## Frontend

O frontend foi feito pensando em um fluxo de um único usuário, ou seja, o "cliente" apontado na fatura deve ver somente as faturas que estão diretamente ligadas a ele. Para acessar faturas de outros clientes, o botão "Switch account" deve ser utilizado. Projeto feito com princípios SOLID.

Tecnologias utilizadas:
- Axios
- Material UI
- Jest
- Chartjs
- Datefns
- Cypress
