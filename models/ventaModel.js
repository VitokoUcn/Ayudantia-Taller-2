
import db from '../config/db.js';

/**
 * 7. Registrar un nuevo pedido/venta
 * Inserta en `ventas` y devuelve el insertId para luego usarlo en detalleVenta.
 */
export const createVenta = (ventaData, callback) => {
  const { clienteId, total } = ventaData;
  const sql = 'INSERT INTO ventas (Clienteid, fecha, total) VALUES (?, NOW(), ?)';
  db.query(sql, [clienteId, total], callback);
};

/**
 * 7b. Registrar cada línea de detalle de la venta
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
 * 8. Consultar detalle de pedidos por cliente y fecha
 * Retorna cada venta con sus detalles de productos para un cliente en un día dado.
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
 * Opcionales: obtener todas las ventas o por ID
 */
export const getAllVentas = (callback) => {
  const sql = 'SELECT * FROM ventas';
  db.query(sql, callback);
};

export const getVentaById = (id, callback) => {
  const sql = 'SELECT * FROM ventas WHERE id = ?';
  db.query(sql, [id], callback);
};

/**
 * Opcional: actualizar total de una venta
 */
export const updateVenta = (id, ventaData, callback) => {
  const { total } = ventaData;
  const sql = 'UPDATE ventas SET total = ? WHERE id = ?';
  db.query(sql, [total, id], callback);
};

/**
 * Opcional: eliminar venta
 */
export const deleteVenta = (id, callback) => {
  const sql = 'DELETE FROM ventas WHERE id = ?';
  db.query(sql, [id], callback);
};
