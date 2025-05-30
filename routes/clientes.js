import { Router } from 'express';
import {
  obtenerClientes,
  registrarCliente,
  actualizarCliente,
  actualizarEstadoCliente,
  eliminarCliente
} from '../controllers/clienteController.js';

const router = Router();

/**  
 * 9-11. Listar clientes  
 * - Todos:         GET /api/cliente  
 * - Normales:      GET /api/cliente/normales  
 * - Premium:       GET /api/cliente/premium  
 *  (internamente usan el mismo controlador con un filtro `type`)
 */
router.get('/',                  obtenerClientes);
router.get('/normales',          (req, res, next) => { req.query.type = 'normal';   next(); }, obtenerClientes);
router.get('/premium',           (req, res, next) => { req.query.type = 'premium';  next(); }, obtenerClientes);

/**  
 * 6. Actualizar estado de un cliente  
 *    (PATCH porque solo cambia una parte del recurso)  
 */
router.patch('/:id/estado',      actualizarEstadoCliente);

/**  
 * 5. Eliminar (desactivar) un cliente  
 */
router.delete('/:id',            eliminarCliente);

/**  
 * 1. Registrar un nuevo cliente  
 */
router.post('/',                 registrarCliente);

/**  
  Actualizar datos completos de un cliente  
 */
router.put('/:id',               actualizarCliente);

export default router;
