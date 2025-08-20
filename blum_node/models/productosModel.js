const pool = require('./bd');

// READ: traer todos los productos
async function getProductos() {
  const sql = 'SELECT id, nombre, precio, descripcion, imagen FROM productos';
  const rows = await pool.query(sql);
  return rows;
}

// READ (uno): traer un producto por id
async function getProductoById(id) {
  const sql = 'SELECT id, nombre, precio, descripcion, imagen FROM productos WHERE id = ?';
  const rows = await pool.query(sql, [id]);
  return rows[0];
}

// CREATE: insertar producto
// obj esperado: { nombre, precio, descripcion, imagen }
async function insertProducto(obj) {
  try {
    const sql = 'INSERT INTO productos (nombre, precio, descripcion, imagen) VALUES (?, ?, ?, ?)';
    const params = [obj.nombre, obj.precio, obj.descripcion, obj.imagen];
    const rows = await pool.query(sql, params);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// UPDATE: modificar producto por id
// obj: { nombre, precio, descripcion, imagen }
async function modificarProductoById(obj, id) {
  try {
    const sql = 'UPDATE productos SET nombre = ?, precio = ?, descripcion = ?, imagen = ? WHERE id = ?';
    const params = [obj.nombre, obj.precio, obj.descripcion, obj.imagen, id];
    const rows = await pool.query(sql, params);
    return rows;
  } catch (error) {
    throw error;
  }
}

// DELETE: eliminar producto por id
async function deleteProductoById(id) {
  const sql = 'DELETE FROM productos WHERE id = ?';
  const rows = await pool.query(sql, [id]);
  return rows;
}

module.exports = {
  getProductos,
  getProductoById,
  insertProducto,
  modificarProductoById,
  deleteProductoById
};