// Importación de Express JS:
import express from 'express';
// Creación del Router de Express JS:
const router = express.Router();

// Ruta GET para renderizar el chat.handlebars:
router.get('/', async (request, response) => {
      try {
            response.render("chat");
      } catch (error) {
            console.log('Error al obtener los mensajes del chat.', error);
            response.status(500).json({ error: 'Error al obtener los productos' });
      }
})

// Exportación del router para ser utilizado en la app:
export { router };

