// IMPORTACIONES:
// Importación de Express JS (https://expressjs.com/en/starter/hello-world.html):
import express from "express";
// Creación de la app que utilizará Express JS y Handlebars:
const app = express();
// Número de puerto del servidor:
const PORT = 8080;
// Importación del motor de plantillas Handlebars (https://www.npmjs.com/package/express-handlebars):
import { engine } from "express-handlebars";
// Importación de la vista "home.handlebars":
import { viewsRouter } from "./routes/views.router.js";
// Importación del router de productos:
import { productsRouter } from "./routes/products.router.js";
// Importación del router de carts:
import { cartsRouter } from "./routes/carts.router.js";
// Importación de la conexión a la base de datos de Mongo Atlas:
import "./mongoDB.js";

// MIDDLEWARES:
// Directorio raíz desde el cual Express servirá los archivos estáticos cuando se realicen solicitudes HTTP:
app.use(express.static("./src/public"));
// Middleware que permite analizar los cuerpos de las solicitudes con datos codificados en URL y hacerlos accesibles en req.body:
app.use(express.urlencoded({ extended: true }));
// Función que permite comunicarnos con el servidor en formato JSON:
app.use(express.json());

// HANDLEBARS:
// Aplicación del motor de plantillas Handlebars a todos los archivos con la extensión ".handlebars":
app.engine("handlebars", engine());
// Renderización de las vistas de la aplicación a través de Handlebars:
app.set("view engine", "handlebars");
// Directorio raíz desde el cual deben leerse los archivos con la extensión ".handlebars":
app.set("views", "./src/views");

// RUTAS:
// Endpoint de la ruta de products:
app.use("/api/products", productsRouter);
// Endpoint de la ruta de carts:
app.use("/api/carts", cartsRouter);
// Endpoint de la ruta "home.handlebars":
app.use("/", viewsRouter);

// PUERTO:
// Función que escucha cualquier cambio en el servidor:
app.listen(PORT, () =>
  console.log(`Escuchando cualquier cambio en el puerto ${PORT}`)
);
