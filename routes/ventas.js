import express from 'express';
import { validateVenta } from '../middlewares/validateVenta.js';
import { crearVenta, obtenerVentasPorClienteFecha } from '../controllers/ventaController.js';

const router = express.Router();

/**
 * 7. Registrar un nuevo pedido/venta
 * POST /api/venta
 */
router.post( '/', validateVenta, crearVenta);

/**
 * 8. Consultar detalle de pedidos por cliente y fecha  
 * GET /api/venta/cliente/:clienteId/fecha/:fecha  
 */
router.get( '/cliente/:clienteId/fecha/:fecha', obtenerVentasPorClienteFecha );

export default router;
