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

  after(async function () {
    await mongoose.connection
      .collection("productos")
      .deleteMany({ code: "TEST-1" });
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

  it("El dao graba un producto con su método crearProducto", async function () {
    let productoPrueba = {
      title: "productoTest",
      description: "producto creado en Test Mocha",
      price: 15000,
      thumbnail:
        "https://economipedia.com/wp-content/uploads/test-de-estr%C3%A9s.png",
      code: "TEST-1",
      stock: 15,
    };
    let resultado = await this.productosDao.crearProducto(productoPrueba);

    assert.ok(resultado._id);
    assert.ok(resultado.title);
    assert.equal(resultado.title, "productoTest");
    assert.equal(resultado.description, "producto creado en Test Mocha");
    assert.equal(resultado.code, "TEST-1");
    productoId = resultado._id;
  });

  it("El dao obtiene un producto por ID con su método obtenerProductoById", async function () {
    const resultado = await this.productosDao.obtenerProductoById(productoId);

    assert.ok(resultado, "No se encontró el producto por ID");
    assert.strictEqual(
      resultado._id.toString(),
      productoId.toString(),
      "El ID del producto no coincide"
    );
  });

  it("El dao borra un producto por ID con su método borrarProducto", async function () {
    const resultado = await this.productosDao.borrarProducto(productoId);

    assert.strictEqual(resultado.deletedCount, 1, "No se eliminó el producto");

    // Verifica que el producto ya no exista
    const productoEliminado = await this.productosDao.obtenerProductoById(
      productoId
    );
    assert.strictEqual(
      productoEliminado,
      null,
      "El producto no se eliminó correctamente"
    );
  });
});
