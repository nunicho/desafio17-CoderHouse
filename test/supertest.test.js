const supertest = require("supertest");
const chai = require("chai");
const mongoose = require("mongoose");
const { describe, it } = require("mocha");

//const config = require("../src/config/config.js");

//mongoose.connect(config.MONGO_URL, { dbName: config.DB_NAME });

mongoose.connect(
  "mongodb+srv://contaalonso:12345qwert@cluster0.k4sa2ya.mongodb.net/?retryWrites=true&w=majority&dbName=ecommercePRUEBA"
);

const expect = chai.expect;
const requester = supertest("http://localhost:3050");

describe("Pruebas al proyecto Ecommerce", function () {
  this.timeout(10000);

  describe("Pruebas al módulo productos", function () {
    after(async function () {
      await mongoose.connection
        .collection("productos")
        .deleteMany({ code: "TEST-1" });
    });
    
    it("SUPERTEST: El endpoint /api/products, con método POST, permite generar un producto nuevo en BD", async function () {
      let producto = {
        title: "productoTest",
        description: "producto de Test",
        price: 20000,
        thumbnail: "https://example.com/new-thumbnail.png",
        code: "TEST-10",
        stock: 20,
      };
      let {body, ok, statusCode} = await requester.post("/api/products").send(producto);
      expect(statusCode).to.be.equal(201)
      expect(ok).to.be.true
      expect(body.productoInsertado).to.has.property("_id");
    });
    

    it("SUPERTEST: El endpoint /api/products, con método GET, obtiene productos de la Base de datos", async function () {
      const queryParams = {
        query: {},
        limit: 10,
        pagina: 1,
        sortQuery: {},
      };

      try {
        let { body, ok, statusCode } = await requester
          .get("/api/products")
          .query(queryParams);
        expect(statusCode).to.equal(200);
        expect(ok).to.be.true;
        expect(body.productos.docs).to.be.an("array");        
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });
});

/*
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
        code: "SuperTest-1",
        stock: 20,
      };

      let resultado = await requester.post("/api/products").send(producto);
      console.log(resultado.body);
    });
  });
});

*/
