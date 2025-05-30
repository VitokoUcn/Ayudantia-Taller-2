// Rutas de Clientes:
// Define los endpoints para gestionar clientes (listar, crear, editar estado, eliminar).
import { Router } from 'express';
// Importamos los controladores que implementan la lógica de cada ruta
import {
  obtenerClientes,
  registrarCliente,
  actualizarCliente,
  actualizarEstadoCliente,
  eliminarCliente
} from '../controllers/clienteController.js';

const router = Router();

// Listar clientes:
// - GET /api/cliente           → todos los clientes
// - GET /api/cliente/normales  → clientes con tipo = 1 (normales)
// - GET /api/cliente/premium   → clientes con tipo = 2 (premium)
router.get('/',                  obtenerClientes);
router.get('/normales',          (req, res, next) => { req.query.type = '1';   next(); }, obtenerClientes);
router.get('/premium',           (req, res, next) => { req.query.type = '2';  next(); }, obtenerClientes);

// Actualizar estado de un cliente (PATCH):
// - Cambia solo el campo 'tipo' de un cliente
// Endpoint: PATCH /api/cliente/:id/estado
router.patch('/:id/estado',      actualizarEstadoCliente);

// Eliminar (desactivar) un cliente:
// - Realiza un soft delete o flag de inactividad
// Endpoint: DELETE /api/cliente/:id
router.delete('/:id',            eliminarCliente);

// Registrar un nuevo cliente:
// - Recibe { nombre, ciudad, tipo } en el body
// Endpoint: POST /api/cliente
router.post('/',                 registrarCliente);

// Actualizar datos completos de un cliente:
// - Recibe { nombre, ciudad, tipo } en el body
// Endpoint: PUT /api/cliente/:id
router.put('/:id',               actualizarCliente);

// Exportamos el router para montarlo en /api/cliente en la aplicación principal
export default router;
