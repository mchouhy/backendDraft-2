// Importación del Router de Express JS:
import { Router } from "express";
// Importación del manejador de carts:
import { CartManager } from "../controllers/cartManager.js";
// Creación del Router de Carts:
const cartsRouter = Router();
// Llamado de la función constructora:
const cartManager = new CartManager();

// Rutas de carts:
// Post que crea un nuevo cart:
cartsRouter.post("/", async (request, response) => {
  try {
    const newCart = await cartManager.createCart();
    response.json(newCart);
  } catch (error) {
    response.status(500).json({ error: "Error al crear el cart." });
  }
});

// Get que lista los productos que pertenezcan al cart por id:
cartsRouter.get("/:cid", async (request, response) => {
  const cartId = request.params.cid;
  try {
    const cart = await cartManager.getCartById(cartId);
    response.json(cart.products);
  } catch (error) {
    response.status(500).json({
      error: "Error. No se pudo obtener el producto del cart por id.",
    });
  }
});

// Post que agrega como objeto el producto al array de products del cart seleccionado:
cartsRouter.post("/:cartId/product/:prodId", async (request, response) => {
  const { cartId } = request.params;
  const { prodId } = request.params;
  const { quantity } = request.body || 1;
  try {
    const updateCart = await cartManager.addProduct(cartId, prodId, quantity);
    response.json(updateCart.products);
  } catch (error) {
    response
      .status(500)
      .json({ error: "Error. No se pudo agregar el producto" });
  }
});

// Delete que elimina un producto del cart:
cartsRouter.delete("/:cartId/product/:prodId", async (request, response) => {
  const { cartId } = request.params;
  const { prodId } = request.params;
  try {
    const updateCart = await cartManager.deleteProduct(cartId, prodId);
    response.json({
      status: "success",
      message: "Producto eliminado con éxito.",
      updateCart,
    });
  } catch (error) {
    console.log("Error al eliminar el producto del cart", error);
    res.status(500).json({
      status: "error",
      error: "Error interno del servidor",
    });
  }
});

// Put que actualiza products en el cart:
cartsRouter.put("/:cartId", async (request, response) => {
  const { cartId } = request.params;
  // Se envía un array de productos en el body de la solicitud:
  const { updatedProducts } = request.body;
  try {
    const updatedCart = await CartManager.updateCart(cartId, updatedProducts);
    response.json(updatedCart);
  } catch (error) {
    console.log("Error al actualizar el cart", error);
    res.status(500).json({
      status: "error",
      error: "Error interno del servidor",
    });
  }
});

// Put que actualiza la cantidad de productos en el cart:
cartsRouter.put("/:cartId/product/:prodId"),
  async (request, response) => {
    const { cartId } = request.params;
    const { prodId } = request.params;
    const { newQuantity } = request.body;
    try {
      const updatedCart = await cartManager.updateProductQuantity(
        cartId,
        prodId,
        newQuantity
      );
      response.json({
        status: "succes",
        message: "Cantidad del producto actualizada con éxito.",
        updatedCart,
      });
    } catch (error) {
      console.log(
        "Error al actualizar la cantidad de productos el cart.",
        error
      );
      res.status(500).json({
        status: "error",
        error: "Error interno del servidor.",
      });
    }
  };

// Delete que vacía el cart:
cartsRouter.delete("/:cartId"),
  async (request, response) => {
    const { cartId } = request.params;
    try {
      const updatedCart = await cartManager.emptyCart(cartId);
      response.json({
        status: "succes",
        message: "Se eliminaron con éxito los productos del cart.",
        updatedCart,
      });
    } catch (error) {
      console.log("Error al intentar vaciar el cart.", error);
      res.status(500).json({
        status: "error",
        error: "Error interno del servidor",
      });
    }
  };

// Exportación del router de carts para utilizarlo desde app.js:
export { cartsRouter };
