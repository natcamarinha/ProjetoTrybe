# Back-end

## To Do List

### Funcionalidades

* Gerar a lista de tarefas (Esta lista pode ser ordenável por ordem alfabética, data de criação ou por status); 
* Inserir uma nova tarefa na lista; 
* Remover uma tarefa da lista; 
* Atualizar uma tarefa da lista; 
* A tarefa deve possuir um status editável: pendente, em andamento ou pronto;

### Como instalar

1. Abra um terminal no seu computador e utilize os comandos a baixo na ordem que são apresentados:

* `cd backend`
* `npm install`
* `npm start`

A aplicação está configurada para rodar na porta local 3001.

### Modo de utilização

A API consta com 4 rotas:

* /users
  * / [POST] Cria um novo usuário
  * / [GET] Exibe todos os usuários

* /login
  * / [POST] Faz login

* /tasks
  * / [POST] Cria uma nova tarefa
  * / [GET] Exibe todas as tarefas

* /tasks/:id
  * / [PUT] Edita a tarefa
  * / [DELETE] Remove a tarefa

### Modo de desenvolvimento

#### Tecnologias:

Foi utilizado para o desenvolvimento desse projeto o NodeJS com Express para a criação básica da api e Mocha/Chai para a criação dos testes de integração.

Banco de dados:

O banco escolhido para a aplicação foi Mongodb, pela agilidade no desenvolvimento, facilidade de adição de novas informações sem necessitar re-estruturar toda a estrutura e pela robustes para lidar com grande volume de requisições.

#### Collections:

* Users

O banco tem uma coleção chamada users. As requisições serão feitas através da rota /user.

A requisição para a criação de usuário seguirá o formato:

```json
{
  "name": "Natalia
  "email": "natalia@email.com",
  "password": "123456"
}
```

A requisição para login seguirá o formato:

```json
{
  "email": "natalia@email.com",
  "password": "123456"
}
```

* Tasks

O banco tem uma coleção chamada tasks. As requisições serão feitas através da rota /tasks.

A requisição para a criação de uma tarefa seguirá o formato:

```json
{
    "task": "Entregar projeto"
}
```

### Para testar o projeto

Para testar os arquivos separadamente, digite no seu terminal:
`npm test <nome_do_arquivo>`

Para testar todos os arquivos juntos, digite no seu terminal:
`npm test`

---
=======
# Projeto To Do List Ebytr

## Contexto:

Projeto para resolver problemas de produtividade/controle na empresa Ebtry. Foi diagnosticado que as pessoas colaboradoras vêm tendo dificuldade na organização de suas tarefas individuais e, por esse motivo, a empresa decidiu implantar uma nova forma de organizar tarefas. Na Ebytr o time de desenvolvimento utiliza a Stack MERN para criar suas aplicações.

## Requisitos técnicos:
* Front-End em React;
* Back-End em NodeJS, com MongoDB; 
* Arquitetura em camadas;

## Instruções para rodar o projeto local

### Pre-requisitos para rodar o projeto:

1. Fazer o clone do repositório: 

Abra um terminal no seu computador e utilize os comandos a baixo na ordem que são apresentados:

* `git clone git@github.com:natcamarinha/ProjetoTrybe.git`
* `cd ProjetoTrybe`

Para mais instruções olhar o README do backend e depois o do frontend.

--- 

#### Projeto desenvolvido por Natalia Camarinha

<a href="https://www.linkedin.com/in/nataliacamarinha/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
<a href = "mailto:natcamarinha@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>

