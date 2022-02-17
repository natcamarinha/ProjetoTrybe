const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');

const { getConnection } = require('./mongoConnection');

const usersModel = require('../../models/users');
const tasksModel = require('../../models/tasks');

const user1 = {
    _id: '6207ec6bd5b2b25c7c5faaa6',
    name: 'Natalia',
    email: 'natalia@gmail.com',
    password: '123456',
};

const user2 = {
    _id: '6207ec6bd5b2b25c7c5fbbb6',
    name: 'Raphael',
    email: 'raphael@gmail.com',
    password: '123456',
};

const task1 = {
    _id: '6208112521b3db025d3f7515',
    name: 'Lavar a louça',
    description: '',
    date: '',
};

describe('Testing usersModel', () => {
    let connectionMock;

    before(async () => {
        connectionMock = await getConnection();

        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(async () => {
        await MongoClient.connect.restore();
    });

    describe('Testando a função findUsers', () => {
        describe('Quando não existe nenhum usuário', () => {
            it('Deve retornar um array vazio', async () => {
              const users = await usersModel.findUsers();
      
              expect(users).to.be.a('array');
              expect(users).to.be.empty;
            });
          });

        describe('Quando existem usuários cadastrados', () => {
            before(async () => {
              await connectionMock
                .db('Tasks_Ebytr')
                .collection('users')
                .insertMany([user1, user2]);
            });
      
            it('Deve retornar um array com os usuários', async () => {
              const users = await usersModel.findUsers();
      
              expect(users).to.be.a('array');
              expect(users).to.deep.equal([user1, user2]);
            });
        });
    });

    describe('Testando a função addUser', () => {
        it('Deve retornar o produto criado', async () => {
            const newUser = await usersModel.addUser({
                name: "Natalia",
                email: "natalia@gmail.com",
                password: "123456",
            });

            expect(newUser).to.deep.equal({
                name: "Natalia",
                email: "natalia@gmail.com",
                password: "123456",
            });
        });
    });
});

describe('Testing tasksModel', () => {
    let connectionMock;

    before(async () => {
        connectionMock = await getConnection();

        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(async () => {
        await MongoClient.connect.restore();
    });

    describe('Testando a função findTasks', () => {
        describe('Quando não existe nenhuma tarefa', () => {
            it('Deve retornar um array vazio', async () => {
              const tasks = await tasksModel.findTasks();
      
              expect(tasks).to.be.a('array');
              expect(tasks).to.be.empty;
            });
          });
      
          describe('Quando existem tarefas cadastradas', () => {
            before(async () => {
              await connectionMock
                .db('Tasks_Ebytr')
                .collection('tasks')
                .insertOne(task1);
            });
      
            it('Deve retornar um array com as tarefas', async () => {
              const tasks = await tasksModel.findTasks();
      
              expect(tasks).to.be.a('array');
              expect(tasks).to.deep.equal([task1]);
            });
        });
    });

    describe('Testando a função addTask', () => {
        it('Deve retornar a tarefa criada', async () => {
            const task = await tasksModel.addTask(task1);

            const { name, description, date } = task;
                    
            expect(task).to.deep.equal(task1);
        });
    });

    describe('Testando a função editTask', () => {
        describe('Quando a tarefa existe', () => {
            it('Deve retornar a tarefa atualizada', async () => {
                const task = await tasksModel.editTaskModel(
                    task1._id,
                    'xablau',
                );
    
                expect(task.value).to.be.equal({
                    _id: task1._id,
                    name: 'xablau',
                    description,
                    date,
                });
            });
        });
    
        describe('Quando a tarefa não existe', () => {
            it('Deve retornar null', async () => {
                const task = await tasksModel.editTaskModel();
    
                expect(task.value).to.be.null;
            });
        });
    });
});
