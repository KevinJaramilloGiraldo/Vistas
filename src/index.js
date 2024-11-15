// Importaciones de dependencias usando ESM
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import ejs from 'ejs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Configuración de variables de entorno
dotenv.config();

// Rutas importadas
import routes from './routes/routes.js';
import adminRoutes from './routes/adminRoutes.js';

// Configuración del servidor Express
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middlewares
app.use(express.json()); // Análisis de solicitudes JSON
app.use(cors());         // Habilitar CORS
app.use(morgan('dev'));  // Logging de solicitudes HTTP

// Configuración de vistas con EJS
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configuración de rutas estáticas
app.use(express.static(join(__dirname, 'public')));

// Rutas de la aplicación
app.use(routes);            // Rutas generales
app.use('/admin', adminRoutes); // Rutas de administración

// Conexión a MongoDB
// Conectar a MongoDB usando la URI del archivo .env
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri)
  .then(() => console.log("Conectado a la base de datos"))
  .catch((error) => console.error("Error al conectar a la base de datos:", error));

// Ruta principal y otras vistas
app.get('/', (req, res) => res.render('home'));
app.get('/about', (req, res) => res.render('about'));

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Algo salió mal en el servidor.' });
});

// Configuración de puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

console.log("MONGODB_URI:", process.env.MONGODB_URI);

export default app;


