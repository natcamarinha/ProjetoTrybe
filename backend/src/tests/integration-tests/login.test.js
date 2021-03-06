const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;
const server  = require('../../../index');

const { getConnection } = require('./mongoMockConnection');
const { MongoClient } = require('mongodb');

const jwt = require('jsonwebtoken');

describe('POST /login', () => {
  let connectionMock;

  const user = {
    email: 'user@email.com',
    password: '123456',
  };

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    const user = { name: 'user', email: 'user@email.com', password: '123456' }
    const db = connectionMock.db('Tasks_Ebytr');
    await db.collection('users').insertOne(user);
  });

  after(async () => {
    await connectionMock.db('Tasks_Ebytr').collection('users').drop();
    MongoClient.connect.restore();
  });

  describe('Quando o login é feito com sucesso', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
      .post('/login')
      .send(user);
    });

    it('retorna código de status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta deve possuir a propriedade "token"', () => {
      expect(response).to.be.an('object');
      expect(response.body).to.have.property('token');
    });

    it('o valor da propriedade token deve ser uma "string"', () => {
      expect(response.body.token).to.be.a('string');
    });

    it('a propriedade token deve conter um token JWT com o usuario usado no login no seu payload', () => {
      const token = response.body.token;
      const payload = jwt.decode(token);

      expect(payload.data.email).to.be.equal('user@email.com');
    });
  });

  describe('Quando name e/ou email e/ou passaword não são informados', () => {
    let response;
    
    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({});
    });

    it('retorna código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta deve possuir a propriedade "message"', () => {
      expect(response).to.be.an('object');
      expect(response.body).to.have.property('message');
    });
  });

  describe('Quando pessoa usuária não existe ou senha é inválida', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'email-nao-cadastrado@example.com',
          password: 'password-fake'
        });
    });

    it('retorna código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto no body', () => {
      expect(response).to.be.an('object');
    });

    it('objeto de resposta deve possuir a propriedade "message"', () => {
      expect(response).to.be.an('object');
      expect(response.body).to.have.property('message');
    });
  });
});
