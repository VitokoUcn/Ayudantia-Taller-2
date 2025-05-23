import db from '../config/db.js';

export const getAllClientes = (callback) => {
  db.query('SELECT * FROM Cliente', callback);
};

export const getClienteById = (id, callback) => {
  db.query(
    'SELECT * FROM Cliente WHERE id = ?',
    [id],
    callback
  );
};

export const createCliente = (clienteData, callback) => {
  const { nombre, ciudad, tipo } = clienteData;
  db.query(
    'INSERT INTO Cliente (nombre, ciudad, tipo) VALUES (?, ?, ?)',
    [nombre, ciudad, tipo],
    callback
  );
};

export const updateCliente = (id, clienteData, callback) => {
  const { ciudad } = clienteData;
  db.query(
    'UPDATE Cliente SET ciudad = ? WHERE id = ?',
    [ciudad, id],
    callback
  );
};

export const deleteCliente = (id, callback) => {
  db.query(
    'DELETE FROM Cliente WHERE id = ?',
    [id],
    callback
  );
};
