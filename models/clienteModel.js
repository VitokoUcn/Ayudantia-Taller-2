// Modelos de Cliente:
// Contiene funciones que realizan operaciones CRUD en la base de datos para la entidad Cliente.
// src/models/clienteModel.js
import db from '../config/db.js';

// Importamos la conexión a la base de datos configurada en db.js

/**
 * getAllClientes(callback):
 * - Listar todos los registros de la tabla Cliente.
 * - Consulta SQL: SELECT * FROM Cliente.
 */
export const getAllClientes = (callback) => {
  const sql = 'SELECT * FROM Cliente';
  db.query(sql, callback);
};

/**
 * getClientesNormales(callback):
 * - Listar clientes con tipo = 1 (normales).
 * - Consulta SQL: SELECT * FROM Cliente WHERE tipo = ? (1).
 */
export const getClientesNormales = (callback) => {
  const sql = 'SELECT * FROM Cliente WHERE tipo = ?';
  db.query(sql, [1], callback);
};


/**
 * getClientesPremium(callback):
 * - Listar clientes con tipo = 2 (premium).
 * - Consulta SQL: SELECT * FROM Cliente WHERE tipo = ? (2).
 */
export const getClientesPremium = (callback) => {
  const sql = 'SELECT * FROM Cliente WHERE tipo = ?';
  db.query(sql, [2], callback);
};

/**
 * getClienteById(id, callback):
 * - Obtener un solo cliente según su ID.
 * - Parámetros: id del cliente.
 * - Consulta SQL: SELECT * FROM Cliente WHERE id = ?.
 */
export const getClienteById = (id, callback) => {
  const sql = 'SELECT * FROM Cliente WHERE id = ?';
  db.query(sql, [id], callback);
};

/**
 * createCliente(clienteData, callback):
 * - Registrar un nuevo cliente.
 * - Parámetros: objeto { nombre, ciudad, tipo } (tipo default 'normal').
 * - Inserción SQL: INSERT INTO Cliente (nombre, ciudad, tipo) VALUES (?, ?, ?).
 */
export const createCliente = (clienteData, callback) => {
  const { nombre, ciudad, tipo = 'normal' } = clienteData;
  const sql = 'INSERT INTO Cliente (nombre, ciudad, tipo) VALUES (?, ?, ?)';
  db.query(sql, [nombre, ciudad, tipo], callback);
};

/**
 * updateCliente(id, clienteData, callback):
 * - Actualizar todos los campos de un cliente existente.
 * - Parámetros: id del cliente, objeto { nombre, ciudad, tipo }.
 * - SQL: UPDATE Cliente SET nombre = ?, ciudad = ?, tipo = ? WHERE id = ?.
 */
export const updateCliente = (id, clienteData, callback) => {
  const { nombre, ciudad, tipo } = clienteData;
  const sql = `
    UPDATE Cliente
    SET nombre = ?, ciudad = ?, tipo = ?
    WHERE id = ?
  `;
  db.query(sql, [nombre, ciudad, tipo, id], callback);
};

/**
 * updateEstadoCliente(id, nuevoTipo, callback):
 * - Actualizar únicamente el campo tipo de un cliente.
 * - Parámetros: id del cliente, nuevo tipo (e.g., 1=normal, 2=premium, 'inactive').
 * - SQL: UPDATE Cliente SET tipo = ? WHERE id = ?.
 */
export const updateEstadoCliente = (id, nuevoTipo, callback) => {
  const sql = 'UPDATE Cliente SET tipo = ? WHERE id = ?';
  db.query(sql, [nuevoTipo, id], callback);
};

/**
 * deleteCliente(id, callback):
 * - Desactivar (soft delete) un cliente marcando tipo='inactive'.
 * - Parámetro: id del cliente.
 * - SQL: UPDATE Cliente SET tipo = 'inactive' WHERE id = ?.
 */
export const deleteCliente = (id, callback) => {
  const sql = "UPDATE Cliente SET tipo = 'inactive' WHERE id = ?";
  db.query(sql, [id], callback);
};
