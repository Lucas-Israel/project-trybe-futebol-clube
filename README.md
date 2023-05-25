# :toolbox: Tecnologias usadas:

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)
![Sinon](https://img.shields.io/badge/sinon.js-323330?style=for-the-badge&logo=sinon)
![Chai](https://img.shields.io/badge/chai.js-323330?style=for-the-badge&logo=chai&logoColor=red)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

# :open_book: Objetivo do projeto trybe futebol clube

<details>
  <summary>:speech_balloon: Objetivos</summary>

  ```
  1. Desenvolver uma API (utilizando o método TDD) e também integrar - através do docker-compose - as aplicações para que elas funcionem consumindo um banco de dados.
  2. Implementar regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.
  ```
</details>

<details>
  <summary>:speech_balloon: Exemplo de funcionamento</summary>
  
![front-example](https://github.com/Lucas-Israel/project-trybe-futebol-clube/assets/104790267/d25d2f67-aec5-4ee0-bff6-4d8e43c60b76)

</details>

# :heavy_exclamation_mark: Arquivos desenvolvidos nesse projeto:

<details>
  <summary>:speech_balloon: Arquivos</summary>

  ```
  app/
    backend/
      Dockerfile
  
      src/
        app.ts
    
        controllers/
          match.controller.ts
          team.controller.ts
          user.controller.ts
  
        database/
          migrations/
            20230120211143-users.js
            20230120223100-create-teams.js
            20230120223923-create-matches.js
          
          models/
            MatchModel.ts
            TeamModel.ts
            UserModel.ts
          
        interfaces/
          Services.interface.ts
          User.Interfaces.ts
          leaderBoard.interface.ts
  
        middlewares/
          login.validation.ts
          match.validation.ts
          token.validation.ts
          
        routes/
          leaderboard.routs.ts
          match.routs.ts
          team.routs.ts
          user.routs.ts
          
        services/
          match.service.ts
          team.service.ts
          user.service.ts
          
          utils/
            leaderboardHelper.ts
  
        tests/
          leaderboard.test.ts
          login.test.ts
          match.test.ts
          teams.test.ts
          
          utils/
            leaderboardVariables.ts
            loginVariables.ts
            matchVariables.ts
  
    frontend/
      Dockerfile
  ```
</details

#### :warning: todos os outros arquivos foram desenvolvidos pela [Trybe](https://www.betrybe.com).

# :thinking: Como checar o projeto

```
git clone git@github.com:Lucas-Israel/project-trybe-futebol-clube.git
npm run compose:up
  (caso tenha problemas com portas, mudar no arquivo app/docker-compose.yml
acessar o endereço no seu navegador http://localhost:3011/
```

# :calendar: Datas para desenvolvimento

```
início: 20/01/23 às 15h53
término: 27/01/23 às 13h49
prazo: 7 dias
dias específicos para o desenvolvimento do projéto: 6 dias úteis
```

# :trophy: Percentual de conclusão do projeto

![Captura de tela de 2023-05-25 13-55-14](https://github.com/Lucas-Israel/project-trybe-futebol-clube/assets/104790267/89c35dd2-7b0a-4fae-ae63-748ac267403e)

<details>
  <summary>:warning: Metodo de avaliação da Trybe</summary>
  
##### A escola de programação [Trybe](https://www.betrybe.com) utiliza um sistema de avaliação baseado na conclusão de requisitos em cada projeto, considerando a porcentagem de conclusão, com um mínimo de 80% dos requisitos obrigatórios, em um prazo regular de no máximo 7 dias, tendo dias específicos para o desenvolvimento do projeto que variam de acordo com a complexidade dele.

##### Não alcançando esse patamar mímino, o aluno entra em recuperação, tendo que entregar 90% dos requisitos obrigatórios mais os bonús, em outros 7 dias, caso o aluno falhe novamente ele é mudado de turma para refazer o conteúdo e projeto, caso falhe após mudar de turma, no mesmo conteúdo/projeto, o aluno é removido do curso.
  
</details>
