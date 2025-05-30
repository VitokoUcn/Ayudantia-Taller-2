
// Modelos de Venta:
// Contiene funciones que realizan operaciones CRUD en la base de datos
// para las entidades Venta y DetalleVenta.
import db from '../config/db.js';

// Importamos la conexión a la base de datos configurada en db.js

/**
 * createVenta(ventaData, callback):
 * - Insertar un nuevo registro en la tabla 'ventas'.
 * - Parámetros:
 *    • ventaData: { clienteId: número, total: número }
 *    • callback: función para manejar resultado o error.
 * - SQL: INSERT INTO ventas (Clienteid, fecha, total) VALUES (?, NOW(), ?);
 */
export const createVenta = (ventaData, callback) => {
  const { clienteId, total } = ventaData;
  const sql = 'INSERT INTO ventas (Clienteid, fecha, total) VALUES (?, NOW(), ?)';
  db.query(sql, [clienteId, total], callback);
};

/**
 * createDetalleVenta(detalleData, callback):
 * - Insertar línea de detalle para una venta en 'detalleVenta'.
 * - Parámetros:
 *    • detalleData: { ventaId: número, productoId: número, cantidad: número, subtotal: número }
 *    • callback: función para manejar resultado o error.
 * - SQL:
 *     INSERT INTO detalleVenta (Ventasid, Productosid, cantidad, subtotal)
 *     VALUES (?, ?, ?, ?);
 */
export const createDetalleVenta = (detalleData, callback) => {
  const { ventaId, productoId, cantidad, subtotal } = detalleData;
  const sql = `
    INSERT INTO detalleVenta (Ventasid, Productosid, cantidad, subtotal)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [ventaId, productoId, cantidad, subtotal], callback);
};

/**
 * getVentasPorClienteFecha(clienteId, fecha, callback):
 * - Consultar ventas de un cliente en una fecha específica junto con sus detalles.
 * - Parámetros:
 *    • clienteId: ID del cliente (número).
 *    • fecha: fecha en formato 'YYYY-MM-DD'.
 *    • callback: función para manejar resultado o error.
 * - SQL:
 *     SELECT
 *       v.id            AS ventaId,
 *       DATE(v.fecha)   AS fecha,
 *       dv.Productosid  AS productoId,
 *       dv.cantidad     AS cantidad,
 *       dv.subtotal     AS subtotal
 *     FROM ventas v
 *     JOIN detalleVenta dv ON v.id = dv.Ventasid
 *     WHERE v.Clienteid = ?
 *       AND DATE(v.fecha) = ?
 *     ORDER BY v.fecha DESC, dv.Productosid;
 */
export const getVentasPorClienteFecha = (clienteId, fecha, callback) => {
  const sql = `
    SELECT
      v.id            AS ventaId,
      DATE(v.fecha)   AS fecha,
      dv.Productosid  AS productoId,
      dv.cantidad     AS cantidad,
      dv.subtotal     AS subtotal
    FROM ventas v
    JOIN detalleVenta dv
      ON v.id = dv.Ventasid
    WHERE v.Clienteid = ?
      AND DATE(v.fecha) = ?
    ORDER BY v.fecha DESC, dv.Productosid
  `;
  db.query(sql, [clienteId, fecha], callback);
};

/**
 * getAllVentas(callback):
 * - Listar todas las ventas registradas.
 * - Parámetros:
 *    • callback: función para manejar resultado o error.
 * - SQL: SELECT * FROM ventas;
 */
export const getAllVentas = (callback) => {
  const sql = 'SELECT * FROM ventas';
  db.query(sql, callback);
};

/**
 * getVentaById(id, callback):
 * - Obtener una venta por su ID.
 * - Parámetros:
 *    • id: ID de la venta (número).
 *    • callback: función para manejar resultado o error.
 * - SQL: SELECT * FROM ventas WHERE id = ?;
 */
export const getVentaById = (id, callback) => {
  const sql = 'SELECT * FROM ventas WHERE id = ?';
  db.query(sql, [id], callback);
};

/**
 * updateVenta(id, ventaData, callback):
 * - Actualizar el total de una venta existente.
 * - Parámetros:
 *    • id: ID de la venta (número).
 *    • ventaData: { total: número }.
 *    • callback: función para manejar resultado o error.
 * - SQL: UPDATE ventas SET total = ? WHERE id = ?;
 */
export const updateVenta = (id, ventaData, callback) => {
  const { total } = ventaData;
  const sql = 'UPDATE ventas SET total = ? WHERE id = ?';
  db.query(sql, [total, id], callback);
};

/**
 * deleteVenta(id, callback):
 * - Eliminar una venta por su ID.
 * - Parámetros:
 *    • id: ID de la venta (número).
 *    • callback: función para manejar resultado o error.
 * - SQL: DELETE FROM ventas WHERE id = ?;
 */
export const deleteVenta = (id, callback) => {
  const sql = 'DELETE FROM ventas WHERE id = ?';
  db.query(sql, [id], callback);
};
