// Importación de Express JS:
import { Router } from "express";
// Creación del Router de Express JS:
const viewsRouter = Router();
// Importación del manejador de productos:
import { ProductManager } from "../controllers/productManager.js";
// Llamado de la función de productManager:
const productManager = new ProductManager();
// Importación del manejador de carts:
import { CartManager } from "../controllers/cartManager.js";
// Llamado de la función de cartManager:
const cartManager = new CartManager();

// Ruta GET para renderizar los productos:
viewsRouter.get("/products", async (request, response) => {
  let { page = 1, limit = 2 } = request.query;
  try {
    const products = await productManager.getProducts({
      page: parseInt(page),
      limit: parseInt(limit),
    });
    const productsArray = products.data.map((product) => {
      const { _id, ...rest } = product.toObject();
      return rest;
    });
    response.render("products", {
      products: productsArray,
      currentPage: products.page,
      nextPage: products.nextPage,
      previousPage: products.previousPage,
      hasNextPage: products.hasNextPage,
      hasPreviousPage: products.hasPreviousPage,
      totalPages: products.totalPages,
    });
  } catch (error) {
    console.log("Error al obtener los productos de la base de datos.", error);
    response.status(500).json({ error: "Error al obtener los productos." });
  }
});

// Ruta GET para renderizar el cart:
viewsRouter.get("/carts/:cartId", async (request, response) => {
  const { cartId } = request.params;
  try {
    const cart = await cartManager.getCartById(cartId);
    const cartData = cart.products.map((item) => ({
      product: item.product.toObject(),
      quantity: item.quantity,
    }));
    response.render("carts", { products: cartData });
  } catch (error) {
    console.log("Error en el servidor al buscar el cart por id", error);
    response
      .status(500)
      .json({ error: "Error en el servidor al intentar obtener el cart." });
  }
});
// Exportación del router para ser utilizado en la app:
export { viewsRouter };
