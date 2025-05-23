import express from 'express';
import clienteRoutes from './routes/clientes.js';
import ventasRoutes from './routes/ventas.js';


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use('/api/cliente', clienteRoutes); 
app.use('/api/ventas', ventasRoutes);


app.get('/', (req, res) => {
  res.send("✔ API de Vitoko's Coffee en funcionamiento");
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

