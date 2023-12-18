const mongoose = require("mongoose");
const config = require("../src/config/config.js");
const Assert = require("assert");
const ProductosMongoDao = require("../src/dao/productosMongoDao.js");

mongoose.connect(config.MONGO_URL, { dbName: config.DB_NAME });

const assert = Assert.strict;

describe("Prueba al Dao de Productos del proyecto Ecommerce", function () {
  this.timeout(5000);

  before(async function () {
    this.productosDao = ProductosMongoDao;
  });

  it("El dao debe devolver un array de productos al ejecutar el método listarProductos", async function () {
    const query = {
      /* ... */
    };
    const limit = 10;
    const pagina = 1;
    const sortQuery = {
      /* ... */
    };

    try {
      let resultado = await this.productosDao.listarProductos(
        query,
        limit,
        pagina,
        sortQuery
      );
      assert.ok(
        Array.isArray(resultado.docs),
        "No se devolvió un array de productos"
      );
      assert.strictEqual(
        resultado.docs.length > 0,
        true,
        "El array de productos no contiene elementos"
      );
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
