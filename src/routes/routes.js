// Cuando creo este archivo para las rutas y pego las rutas igualmente queda sin funcionar porque no lo he conectado con la aplicación. Para conectarla con la aplicación debo importar una parte del modulo de express, la parte del enrutamiento, para ello usamos la parte del modulo llamada routher.
import{Router} from 'express';

// Para usar sus metodos los metodos lo guardamos en constante.
const router = Router();

// Ahora como la lógica y procesos quedarán a cargo de este archivo y de los metodos de sus modulos. (El modulo Router importado) cambiabos en el código: expres.get('/', (req,res) => res.render('home')); la parte de expres por router.

router.get('/', (req,res) => res.render('home', {title: 'Home', titleContinue: 'TituloContinue' })); // Esta linea esta explicada en el index.js y antes se veía así:  expres.get('/', (req,res) => res.render('home')). Como esto se esta ejecutando antes de que se renderice el html, desde este el backend puedo cambiarle caracteristicas a mi html, por ejemplo el title. Adicional a lo anterior podemos por aquí mismo enviar muchas cosas al html, por ejemplo le enviaré información al h1 del html, llamaremos a la variable como queramos, en este caso le ponde titleContinue.
router.get('/about', (req,res) => res.render('about', {title: 'About'}));
router.get('/contact', (req,res) => res.render('contact', {title: 'Contact Page'}));

// Ahora para poder usar esta porción de código con el código de la aplicación index.js, exportamos por defecto el modulo router ya configurado.

export default router; // Posteriormente importamos en el index el modulo router exportado.
