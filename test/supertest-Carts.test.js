const supertest = require("supertest");
const chai = require("chai");
const mongoose = require("mongoose");
const { describe, it } = require("mocha");
const config = require("../src/config/config.js");

async function runTests() {
  await mongoose.connect(config.MONGO_URL, { dbName: config.DB_NAME });

  const expect = chai.expect;
  const requester = supertest("http://localhost:8080");

  describe("SUPERTEST: Pruebas al proyecto Ecommerce", function () {
    this.timeout(6000);

    describe("Pruebas al módulo carritos", function () {

      it("SUPERTEST: El endpoint /api/carts, con método POST, permite crear un carrito nuevo en BD. Además se genera también un ticket mediante ticket.controller", async function () {
      const productosEnCarrito = [
        {
          id: "657b67cc67a48e340895515c",
          quantity:2,
        },
      ];

      const carrito = { products: productosEnCarrito };

      try {
        const { body, ok, statusCode } = await requester
          .post("/api/carts/purchase")
          .send(carrito);

        expect(statusCode).to.equal(201);
        expect(ok).to.be.true;
        expect(body).to.have.property("carritoInsertado").that.is.an("object");
        expect(body.carritoInsertado).to.have.property("_id");
      } catch (error) {
        console.error("Test Error:", error);
        throw error; 
      }
    });

      it("SUPERTEST: El endpoint /api/carritos, con método GET, obtiene carritos de la Base de datos", async function () {
        let { body, ok, statusCode } = await requester.get("/api/carts");

        expect(statusCode).to.equal(200);
        expect(ok).to.be.true;  
        expect(body).to.have.property("data").that.is.an("array");
      });

    });
  });
}

runTests();
