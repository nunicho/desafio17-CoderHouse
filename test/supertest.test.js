const supertest = require("supertest");
const chai = require("chai");
const mongoose = require("mongoose");
const { describe, it } = require("mocha");

const config = require("../src/config/config.js");

mongoose.connect(config.MONGO_URL, { dbName: config.DB_NAME });

const expect = chai.expect;
const requester = supertest("http://localhost:3050");

describe("Pruebas al proyecto Ecommerce", function () {
  this.timeout(10000);

  describe("Pruebas al módulo productos", function () {
    after(async function () {
      await mongoose.connection
        .collection("productos")
        .deleteMany({ description: "testing" });
    });

    it("SUPERTEST: El endpoint /api/products, con método POST, permite generar un producto nuevo en BD", async function () {
      let producto = {
        title: "productoTest",
        description: "testing",
        price: 20000,
        thumbnail: "https://example.com/new-thumbnail.png",
        code: "SuperTest-2",
        stock: 20,
      };

      let resultado = await requester.post("/api/products").send(producto);
      console.log(resultado);
    });
  });
});

