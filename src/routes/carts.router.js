// Importación del Router de Express JS:
import { Router } from "express";
// Importación del manejador de carts:
import { CartManager } from "../controllers/cartManager.js";
// Creación del Router de Carts:
const cartsRouter = Router();
// Llamado de la función constructora:
const cartManager = new CartManager;

// Rutas de carts:
// Post que crea un nuevo cart:
cartsRouter.post("/", async (request, response) => {
    try {
        const newCart = await cartManager.createCart();
        response.json(newCart);
    } catch (error) {
        response.status(500).json({ error: 'Error al crear el cart.' });
    }
})

// Get que lista los productos que pertenezcan al cart por id:
cartsRouter.get("/:cid", async (request, response) => {
    const cartId = request.params.cid;
    try {
        const cart = await cartManager.getCartById(cartId);
        response.json(cart.products);
    } catch (error) {
        response.status(500).json({ error: "Error. No se pudo obtener el producto del cart por id." });
    }
})

// Post que agrega como objeto el producto al array de products del cart seleccionado:
cartsRouter.post("/:cartId/product/:prodId", async (request, response) => {
    const { cartId } = request.params;
    const { prodId } = request.params;
    const { quantity } = request.body || 1;
    try {
        const updateCart = await cartManager.addProduct(cartId, prodId, quantity);
        response.json(updateCart.products);
    } catch (error) {
        response.status(500).json({ error: "Error. No se pudo agregar el producto" });
    }
})

// Exportación del router de carts para utilizarlo desde app.js:
export { cartsRouter }