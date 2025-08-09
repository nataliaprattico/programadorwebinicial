var express = require('express');
var router = express.Router();
var novedadesModel = require('./../../models/novedadesModel');

router.get('/', async function (req, res, next) {
  var novedades = await novedadesModel.getNovedades();
  res.render('admin/novedades', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    novedades
  });
});

//para eliminar una novedad//
router.get('/eliminar/:id', async (req, res, next) => {
  const id = req.params.id;
  await novedadesModel.deleteNovedadesById(id);
  res.redirect('/admin/novedades')
});

//formulario para poder completar campos para agregar una novedad//
router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  });
});

//enviar los datos "de la nueva novedad"//
router.post('/agregar', async (req, res, next) => {
  try {
    console.log(req.body)
    if (req.body.titulo != "" && req.body.subtitulo != "" &&
      req.body.cuerpo != "") {
      await novedadesModel.insertNovedad(req.body);
      res.redirect('/admin/novedades')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true, message: 'No se cargó la novedad'
    });
  }
});

//llamar al diseño modificar.hbs + que cargue la novedad por el id//
router.get('/modificar/:id', async (req, res, next) => {
  var id = req.params.id;
  var novedad = await novedadesModel.getNovedadById(id);
  res.render('admin/modificar', {
    layout: 'admin/layout',
    novedad
  });
});

//modificar los datos//
router.post('/modificar', async (req, res, next) => {
  console.log(req.body)
  try {
    let obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo
    }
    await novedadesModel.modificarNovedadById(obj, req.body.id);
    res.redirect('/admin/novedades');
  }
  catch (error) {
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true, message: 'No se modifico la novedad'
    });
  }
}); 

module.exports = router;