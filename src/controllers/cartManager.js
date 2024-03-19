// Importación del model de carts:
import { cartsModel } from "../models/carts.model.js";

//Función de clase constructora que recibe la ruta a trabajar desde el momento de generar la instancia.
export class CartManager {

      createCart = async () => {
            try {
                  // Variable que aloja el nuevo carrito:
                  const newCart = new cartsModel({ products: [] });
                  // Se guarda el cart en la base de datos:
                  await newCart.save();
                  // Se retorna el nuevo cart:
                  return newCart;
            } catch (error) {
                  console.log("Error al crear el cart de productos", error);
                  throw error;
            }
      }

      getCartById = async (cartId) => {
            try {
                  // Validación de si existe un cart con el id ingresado:
                  const cart = await cartsModel.findById(cartId);
                  // Error en caso de que no exista.
                  if (!cart) {
                        throw new Error(`No existe un cart con el id ${cartId}. Intente nuevamente.`);
                  }
                  // Se retorna el cart seleccionado por id.
                  return cart;
            } catch (error) {
                  console.log("Error en el servidor al buscar el cart por id", error);
                  throw error;
            }
      }

      addProduct = async (cartId, prodId, quantity = 1) => {
            try {
                  // Se trae el cart de la base datos por id.
                  const cart = await this.getCartById(cartId)
                  // Valicación si existe un producto con el id ingresado por parámetro.
                  const existingProduct = cart.products.find(item => item.product.toString() === prodId);
                  // En caso de que exista:
                  if (existingProduct) {
                        existingProduct.quantity += quantity;
                        // En caso contrario:
                  } else {
                        cart.products.push({ product: prodId, quantity });
                  }
                  // Marcado de la modificación del quantity con markModified:
                  cart.markModified("products");
                  await cart.save();
                  return cart;
            } catch (error) {
                  console.log("Error en el servidor al buscar el cart por id", error);
                  throw error;
            }
      }
}
