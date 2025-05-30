// server.js - Archivo principal de la API
// Configura el servidor Express, middlewares y rutas principales de Vitoko's Coffee

// Importamos dependencias necesarias:
// - Express: framework web para Node.js
// - Rutas de cliente y ventas
// - CORS para permitir peticiones desde otros orígenes
import express from 'express';
import clienteRoutes from './routes/clientes.js';
import ventasRoutes from './routes/ventas.js';
import cors from 'cors';



// Inicializamos la aplicación Express
const app = express();
// Definimos el puerto de escucha (puede configurarse vía variable de entorno)
const PORT = process.env.PORT || 3000;


// Middleware: parseo automático de JSON en el cuerpo de las peticiones
app.use(express.json());
// Middleware: habilita CORS para aceptar peticiones de cualquier origen
app.use(cors({ origin: '*' }));

// Montamos las rutas de clientes en '/api/cliente'
app.use('/api/cliente', clienteRoutes); 
// Montamos las rutas de ventas en '/api/ventas'
app.use('/api/ventas', ventasRoutes);


// Ruta raíz para verificar que la API está en funcionamiento
app.get('/', (req, res) => {
  res.send("✔ API de Vitoko's Coffee en funcionamiento");
});

// Iniciamos el servidor y escuchamos en el puerto configurado
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

