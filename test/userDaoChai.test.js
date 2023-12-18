const mongoose = require("mongoose");
const config = require("../src/config/config.js");
// const Assert = require("assert");
const chai = require("chai")
const UsersMongoDao = require("../src/dao/usersMongoDao.js");
const {describe, it} = require("mocha")


mongoose.connect(config.MONGO_URL, { dbName: config.DB_NAME });

//const assert = Assert.strict;

const expect=chai.expect

describe("Prueba al Dao de Usuarios del proyecto Ecommerce - Utilizando Chai", function () {
  this.timeout(5000);

  before(async function () {
    this.usersDao = UsersMongoDao; 
  });

  after(async function () {
    await mongoose.connection
      .collection("users")
      .deleteMany({ email: "messi@test.com" });
  });

  it("El dao debe devolver un array de usuarios al ejecutar el método getUsers", async function () {
    let resultado = await this.usersDao.getUsers();
   // assert.strictEqual(Array.isArray(resultado), true);
   expect(Array.isArray(resultado)).to.be.equal(true);
   
  });

  it("El dao graba un usuario con su método createUser", async function (){

        let usuarioPrueba = {
          first_name:"Lionel",
          last_name: "Messi" ,
          email: "messi@test.com" ,
          age: "25" ,
          password: "123" ,
          role: "user" ,   
        };
        let resultado = await this.usersDao.createUser(usuarioPrueba)

        expect(resultado).to.have.property("_id")
        expect(resultado).to.have.property("first_name").and.is.equal("Lionel")
        expect(resultado).to.have.property("last_name").and.is.equal("Messi");
           
        
/*
        assert.ok(resultado._id)
        assert.ok(resultado.first_name);
        assert.equal(resultado.first_name, "Lionel")
        assert.equal(resultado.last_name, "Messi");
*/        
  });

});


