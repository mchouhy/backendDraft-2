// Importación de Express JS (https://expressjs.com/en/starter/hello-world.html):
import express from 'express';
// Creación de la app que utilizará Express JS y Handlebars:
const app = express();
// Número de puerto del servidor:
const PORT = 8080;
// Importación del motor de plantillas Handlebars (https://www.npmjs.com/package/express-handlebars):
import { engine } from 'express-handlebars';
// Importación de la vista "home.handlebars":
import { router } from './routes/views.router.js';
// Importación del router de productos:
import { productsRouter } from './routes/products.router.js';
// Importación del router de carts:
import { cartsRouter } from './routes/carts.router.js';
// Importación del Socket.io (https://socket.io/docs/v4/tutorial/introduction):
import { Server } from 'socket.io';
// Importación de la conexión a la base de datos de Mongo Atlas:
import "./mongoDB.js";
// Importación del model de mensajes:
import { messageModel } from './models/messages.model.js';

// Directorio raíz desde el cual Express servirá los archivos estáticos cuando se realicen solicitudes HTTP:
app.use(express.static('./src/public'))
// Aplicación del motor de plantillas Handlebars a todos los archivos con la extensión ".handlebars":
app.engine('handlebars', engine());
// Renderización de las vistas de la aplicación a través de Handlebars:
app.set('view engine', 'handlebars');
// Directorio raíz desde el cual deben leerse los archivos con la extensión ".handlebars":
app.set('views', './src/views');
// Middleware que permite analizar los cuerpos de las solicitudes con datos codificados en URL y hacerlos accesibles en req.body:
app.use(express.urlencoded({ extended: true }));
// Función que permite comunicarnos con el servidor en formato JSON:
app.use(express.json());
// Endpoint de la ruta de products:
app.use('/api/products', productsRouter);
// Endpoint de la ruta de carts:
app.use('/api/carts', cartsRouter)
// Endpoint de la ruta "home.handlebars":
app.use('/', router);

// Constante que guarda una referencia del servidor para utilizar con socket.io y función que escucha cualquier cambio en el servidor:
const httpServer = app.listen(PORT, () => console.log(`Escuchando cualquier cambio en el puerto ${PORT}`));
// Generación de una instancia del módulo socket pasando por argumento la referencia del servidor de Express JS:
const io = new Server(httpServer);

io.on("connection", (socket) => {
      console.log("Un cliente se ha conectado.");

      socket.on("message", async (data) => {
            // Guardado del mensaje en la colección de mensajes de la base de datos de Mongo Atlas:
            await messageModel.create(data);
            // Obtención de los mensajes de Mongo Atlas y envío al cliente:
            const messages = await messageModel.find();
            io.emit("message", messages);      
      })
})