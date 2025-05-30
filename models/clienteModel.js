// src/models/clienteModel.js
import db from '../config/db.js';

/**
 * 11. Listar todos los clientes
 */
export const getAllClientes = (callback) => {
  const sql = 'SELECT * FROM Cliente';
  db.query(sql, callback);
};

/**
 * 9. Listar clientes normales
 */
export const getClientesNormales = (callback) => {
  const sql = 'SELECT * FROM Cliente WHERE tipo = ?';
  db.query(sql, ['1'], callback);
};

/**
 * 10. Listar clientes Premium
 */
export const getClientesPremium = (callback) => {
  const sql = 'SELECT * FROM Cliente WHERE tipo = ?';
  db.query(sql, ['2'], callback);
};

/**
 * Obtener un cliente por ID
 */
export const getClienteById = (id, callback) => {
  const sql = 'SELECT * FROM Cliente WHERE id = ?';
  db.query(sql, [id], callback);
};

/**
 * 7. Registrar un nuevo cliente
 *    (por defecto tipo = 'normal' si no viene)
 */
export const createCliente = (clienteData, callback) => {
  const { nombre, ciudad, tipo = 'normal' } = clienteData;
  const sql = 'INSERT INTO Cliente (nombre, ciudad, tipo) VALUES (?, ?, ?)';
  db.query(sql, [nombre, email, tipo], callback);
};

/**
 * 6. Actualizar datos completos de un cliente
 */
export const updateCliente = (id, clienteData, callback) => {
  const { nombre, email } = clienteData;
  const sql = 'UPDATE Cliente SET nombre = ?, ciudad = ? WHERE id = ?';
  db.query(sql, [nombre, ciudad, id], callback);
};

/**
 * 6. Actualizar solo el estado/tipo de un cliente
 */
export const updateEstadoCliente = (id, nuevoTipo, callback) => {
  const sql = 'UPDATE Cliente SET tipo = ? WHERE id = ?';
  db.query(sql, [nuevoTipo, id], callback);
};

/**
 * 5. Eliminar (desactivar) un cliente
 *    Aquí hacemos un borrado lógico, marcando tipo = 'inactive'
 */
export const deleteCliente = (id, callback) => {
  const sql = "UPDATE Cliente SET tipo = 'inactive' WHERE id = ?";
  db.query(sql, [id], callback);
};
