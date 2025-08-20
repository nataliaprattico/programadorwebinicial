var express = require('express');
var router = express.Router();
var productosModel = require('../../models/productosModel');

// LISTAR productos
router.get('/', async function (req, res, next) {
  var productos = await productosModel.getProductos();
  res.render('admin/productos', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    productos
  });
});

// ELIMINAR un producto
router.get('/eliminar/:id', async (req, res, next) => {
  const id = req.params.id;
  await productosModel.deleteProductoById(id);
  res.redirect('/admin/productos')
});

// FORMULARIO para agregar producto
router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  });
});

// PROCESAR nuevo producto (solo nombre de archivo de imagen)
router.post('/agregar', async (req, res, next) => {
  try {
    if (req.body.nombre != "" && req.body.precio != "" && req.body.descripcion != "" && req.body.imagen != "") {
      let obj = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen   // acá va el nombre de la imagen
      };

      await productosModel.insertProducto(obj);
      res.redirect('/admin/productos');
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      });
    }
  } catch (error) {
    console.log(error);
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se cargó el producto'
    });
  }
});

// FORMULARIO para modificar producto (cargar datos por ID)
router.get('/modificar/:id', async (req, res, next) => {
  var id = req.params.id;
  var producto = await productosModel.getProductoById(id);
  res.render('admin/modificar', {
    layout: 'admin/layout',
    producto
  });
});

// PROCESAR modificación de producto
router.post('/modificar', async (req, res, next) => {
  try {
    let obj = {
      nombre: req.body.nombre,
      precio: req.body.precio,
      descripcion: req.body.descripcion,
      imagen: req.body.imagen  // también acá se escribe el nombre de la imagen
    };

    await productosModel.modificarProductoById(obj, req.body.id);
    res.redirect('/admin/productos');
  } catch (error) {
    console.log(error);
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modificó el producto'
    });
  }
});

module.exports = router;



