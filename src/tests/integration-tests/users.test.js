const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;
const server  = require('../../../index');

const { getConnection } = require('./mongoMockConnection');
const { MongoClient } = require('mongodb');

describe('POST /users', () => {
  let connectionMock;

  before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Quando o usuário é cadastrado com sucesso', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'user',
          email: 'user@email.com',
          password: '123456',
        });
    });

    it('retorna código de status "201"', () => {
      expect(response).to.have.status(201);
    });
    
    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto de resposta deve possuir a propriedade "user"', () => {
      expect(response.body).to.have.property('user');
    });
    
    it('na propriedade "user" deve existir as propriedades "id", "name" e "email"', () => {
      expect(response.body.user).to.have.property('id');
      expect(response.body.user).to.have.property('name');
      expect(response.body.user).to.have.property('email');
    });

    it('o valor das propriedades "id", "name" e "email" deve ser uma "string"', () => {
      expect(response.body.user.id).to.be.a('string');
      expect(response.body.user.name).to.be.a('string');
      expect(response.body.user.email).to.be.a('string');
    });
  });

  describe('Quando o usuário não é cadastrado com sucesso', () => {
    let response;

    it('retorna código de status "400" com uma mensagem de erro', async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          email: 'user@email.com',
          password: '123456'
        });
      
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('message');
    });

    it('retorna código de status "409" se o email já estiver cadastrado com a mensagem "Email already registered"', async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'user',
          email: 'user@email.com',
          password: '123456'
        });

      expect(response).to.have.status(409);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Email already registered');
    });
  });
});
