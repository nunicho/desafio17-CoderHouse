const supertest = require("supertest");
const chai = require("chai");
const mongoose = require("mongoose");
const { describe, it } = require("mocha");
const config = require("../src/config/config.js");

async function runTests() {
  await mongoose.connect(config.MONGO_URL, { dbName: config.DB_NAME });

  const expect = chai.expect;
  const requester = supertest("http://localhost:8080");

  describe("Pruebas al proyecto Ecommerce", function () {
    this.timeout(6000);

    describe("Pruebas al módulo carritos", function () {
      /*
        after(async function () {
        await mongoose.connection.collection("carritos").deleteMany({
          _id: "ID_D657b66096TESTe340895514e",
        });
      });
*/

    it("SUPERTEST: El endpoint /api/carts, con método POST, permite crear un carrito nuevo en BD", async function () {
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

        console.log("Response Body:", JSON.stringify(body, null, 2)); // Agrega este console.log para verificar la respuesta
        console.log("Status Code:", statusCode); // Agrega este console.log para verificar el código de estado

        expect(statusCode).to.equal(201);
        expect(ok).to.be.true;
        expect(body).to.have.property("carritoInsertado").that.is.an("object");
        expect(body.carritoInsertado).to.have.property("_id");
      } catch (error) {
        console.error("Test Error:", error); // Agrega este console.error para ver el error en la consola
        throw error; // Re-lanza el error para que el test falle correctamente
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
