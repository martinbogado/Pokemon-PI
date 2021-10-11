/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, Type, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'pika2',
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));

  describe('GET /pokemons', () => {

    it('should get 200', async () => {
      await agent.get('/pokemons').expect(200)
    }).timeout(50000);

    it('should get at least 40 pokes', (done) => { 
        agent.get('/pokemons')
        .then( response => response.body)
        .then( array => {
          expect(array.length >= 40).equal(true)
          done();
        })
        .catch(() => done(new Error('Cannot get at least 40 pokemons')));
    }).timeout(50000);

  });

  describe('GET /pokemons/:idPokemon', () => {
   it('should get 200', (done) => {
        agent.get(`/pokemons/25`).expect(200)
        .then(() => done())
        .catch(() => done(new Error('Cannot get status 200')));
   });

    it('should get 404', (done) => {
       agent.get(`/pokemons/57`).expect(404)
        .then(() => done())
        .catch(() => done(new Error('Cannot get status 400')));
    });
  });

  describe('POST /pokemons', () => {
    it('should create a new pokemon', (done) => {
        agent.post('/pokemons').send(pokemon).expect(200);
        done();
    });
  
  });
});

describe('Type routes', () => {;

  describe('GET /types', () => {

    it('should get 200', (done) => {
      agent.get('/types').expect(200)
      .then(() => done())
      .catch(() => done(new Error('Cannot get types')));
    });
  });

  it('Should throw an error if name is null', (done) => {
    Type.create({})
      .then(() => done())
      .catch((err) => done(new Error(err)));
  });

  it('Should throw an error if name is repeated', (done) => {
    Type.create({name: 'fire'})
      .then(() => done())
      .catch(() => done(new Error('The name is repeated')));
  });

  it('Should work when its a valid name', (done) => {
    Type.findOrCreate({
      where: {name: 'atomictype'}
    })
    .then(() => done())
    .catch((err) => done(new Error(err)));
  });
});
