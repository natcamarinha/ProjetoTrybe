const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;
const server  = require('../../../index');

const { getConnection } = require('./mongoMockConnection');
const { MongoClient } = require('mongodb');

describe('POST /tasks', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  const TEST_ID = '658de6ded1dd479300cd6aa1';

  describe('Quando é possível adicionar uma tarefa com login e token válidos', () => {
    let response;

    before(async () => {
      connectionMock.db('Tasks_Ebytr').collection('users').insertOne({
        id: TEST_ID,
        name: 'user',
        email: 'user@email.com',
        password: '123456',
      });

      const token = await chai
        .request(server)
        .post('/login')
        .send({
          email: 'user@email.com',
          password: '123456'
        })
        .then((res) => res.body.token);
      
      response = await chai
        .request(server)
        .post('/tasks')
        .send({
          name: 'lavar louça',
          description: 'lavar a louça de ontem e de hoje.'
        })
        .set('authorization', token);
    });
 
    it('retorna código de status "201"', () => {
      expect(response).to.have.status(201);
    });
    
    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto de resposta deve possuir a propriedade "task"', () => {
      expect(response.body).to.have.property('task');
    });

    it('na propriedade "task" deve existir as propriedades "id" e "name"', () => {
      expect(response.body.task).to.have.property('id');
      expect(response.body.task).to.have.property('name');
    });

    it('o valor das propriedades "id", "name" e "description" deve ser uma "string"', () => {
      expect(response.body.task.id).to.be.a('string');
      expect(response.body.task.name).to.be.a('string');
      expect(response.body.task.description).to.be.a('string');
    });    
  });

  describe('Quando não é possível cadastrar uma tarefa sem um token válido', () => {
    let response;

    before(async () => {
      connectionMock.db('Tasks_Ebytr').collection('users').insertOne({
        id: TEST_ID,
        name: 'user',
        email: 'user@email.com',
        password: '123456',
      });

      const token = '';
      
      response = await chai
        .request(server)
        .post('/tasks')
        .send({
          name: 'lavar louça',
          description: 'lavar a louça de ontem e de hoje.'
        })
        .set('authorization', token);
    });

    it('retorna código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto no body', () => {
      expect(response).to.be.an('object');
    });

    it('objeto de resposta deve possuir a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Token not found"', () => {
      expect(response.body.message).to.be.equal('Token not found');
    });
  });

  describe('Quando não é possível cadastrar uma tarefa sem um dos campos obrigatórios', () => {
    let response;

    before(async () => {
      connectionMock.db('Tasks_Ebytr').collection('users').insertOne({
        id: TEST_ID,
        name: 'user',
        email: 'user@email.com',
        password: '123456',
      });

      const token = await chai
        .request(server)
        .post('/login')
        .send({
          email: 'user@email.com',
          password: '123456'
        })
        .then((res) => res.body.token);
      
      response = await chai
        .request(server)
        .post('/tasks')
        .send({
          description: 'lavar a louça de ontem e de hoje.'
        })
        .set('authorization', token);
    });

    it('retorna código de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto no body', () => {
      expect(response).to.be.an('object');
    });

    it('objeto de resposta deve possuir a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "\"name\" is required"', () => {
      expect(response.body.message).to.be.equal('\"name\" is required');
    });
  });
});

describe('GET /tasks', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  const TEST_ID = '658de6ded1dd479300cd6aa1';

  describe('Quando é possível consultar a lista de receitas', () => {
    let response;

    before(async () => {
      connectionMock.db('Tasks_Ebytr').collection('tasks').insertMany([
        {
          id: '61e88aa7152585d9a885f0bb',
          name: 'lavar louça',
        },
        {
          id: '61e88aa7152585d9a885f0cc',
          name: 'fazer almoço',
          description: 'fazer arroz, feijão, bife e batata frita',
        },
      ]);
      
      const token = await chai
        .request(server)
        .post('/login')
        .send({
          email: 'user@email.com',
          password: '123456'
        })
      .then((res) => res.body.token);

      response = await chai
        .request(server)
        .get('/tasks')
        .set('authorization', token);
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto de resposta deve possuir a propriedade "tasks"', () => {
      expect(response.body).to.have.property('tasks');
    });

   /*  it('na propriedade "tasks" deve existir as propriedades "_id" e "name"', () => {
      expect(response.body.tasks).to.have.property('_id');
      expect(response.body.tasks).to.have.property('name');
    });

    it('o valor das propriedades "_id", "name" e "description" deve ser uma "string"', () => {
      expect(response.body.tasks._id).to.be.a('string');
      expect(response.body.tasks.name).to.be.a('string');
      expect(response.body.tasks.description).to.be.a('string');
    });  */
  });
});
