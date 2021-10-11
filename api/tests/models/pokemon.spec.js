const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('Should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done())
          .catch(() => done(new Error('It requires a valid name')));
      });
      it('Should work when its a valid name', () => {
        Pokemon.create({ name: 'pokeloco' })
          .then(() => done())
          .catch(() => done(new Error('It requires a valid name')));
      });

      it('Should throw an error if name is repeated', (done) => {
        Pokemon.create({ name: 'pika2' });
        Pokemon.create({ name: 'pika2' })
          .then(() => done())
          .catch(() => done(new Error('It requires a valid name')));
      });
    });
  });

  describe("Stats", () => {
    it("Should throw an error if Hp is not a number", (done) => {
      Pokemon.create({ name: "pikachu1", hp: "aaa" })
        .then(() => done())
        .catch(() => done(new Error("Hp is not a number")));
    });
  
    it("Should throw an error if attack is not a number", (done) => {
      Pokemon.create({ name: "pikachu2", attack: "aaa" })
        .then(() => done())
        .catch(() => done(new Error("Attack is not a number")));
    });

    it("This test should run fine, strength is a number", (done) => {
      Pokemon.create({ name: "pikachu2", attack: 15 })
        .then(() => done())
        .catch(() => done(new Error("Attack is not a number")));
    });
  
    it("Should throw an error if defense is not a number", (done) => {
      Pokemon.create({ name: "pikachu3", defense: "aaa" })
        .then(() => done())
        .catch(() => done(new Error("Defense is not a number")));
    });
  
    it("Should throw an error if speed is not a number", (done) => {
      Pokemon.create({ name: "pikachu4", speed: "aaa" })
        .then(() => done())
        .catch(() => done(new Error("Speed is not a number")));
    });
  
    it("Should throw an error if height is not a number", (done) => {
      Pokemon.create({ name: "pikachu5", height: "aaa" })
        .then(() => done())
        .catch(() => done(new Error("Height is not a number")));
    });
  
    it("Should throw an error if weight is not a number", (done) => {
      Pokemon.create({ name: "pikachu6", weight: "aaa" })
        .then(() => done())
        .catch(() => done(new Error("Weight is not a number")));
    });
  
    it("It works if some values aren't passed", () => {
      Pokemon.create({ name: "pikachu7" });
      Pokemon.create({ name: "pikachu8", hp: 50});
      Pokemon.create({ name: "pikachu9", defense: 50 });
      Pokemon.create({ name: "pikachu10", speed: 50 });
      Pokemon.create({ name: "Pikachu11", height: 50 });
    });
  
  });  

});

