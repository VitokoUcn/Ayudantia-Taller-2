// Rutas de Ventas:
// Define los endpoints para gestionar ventas/pedidos,
// incluyendo registro y consulta por cliente y fecha.
import express from 'express';
// Importamos Express, middleware de validación y los controladores de ventas
import { validateVenta } from '../middlewares/validateVenta.js';
import { crearVenta, obtenerVentasPorClienteFecha } from '../controllers/ventaController.js';

const router = express.Router();

// Registrar un nuevo pedido/venta
// - Método: POST
// - Ruta: /api/venta
// - Middleware: validateVenta valida los datos en req.body
// - Controlador: crearVenta procesa la lógica de registro en la base de datos
router.post( '/', validateVenta, crearVenta);

// Consultar detalle de pedidos por cliente y fecha
// - Método: GET
// - Ruta: /api/venta/cliente/:clienteId/fecha/:fecha
// - Parámetros:
//    • clienteId: ID del cliente
//    • fecha: fecha en formato YYYY-MM-DD
// - Controlador: obtenerVentasPorClienteFecha devuelve los pedidos de ese cliente en la fecha dada
router.get( '/cliente/:clienteId/fecha/:fecha', obtenerVentasPorClienteFecha );

// Exportamos el router para montarlo en "/api/venta" en la aplicación principal
export default router;
