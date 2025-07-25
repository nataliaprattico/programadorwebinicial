var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/', async (req, res, next) => {

  var nombre = req.body.nombre;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var mensaje = req.body.mensaje;

  console.log(req.body);

  var obj = {
    to: 'natalia.prattico@gmail.com',
    subject: 'CONTACTO WEB BLUM',
    html: `
    <strong>${nombre}</strong> se contactó a través de la web y quiere más información al correo: <strong>${email}</strong>.<br>
    Además, hizo este comentario: <em>${mensaje}</em>.<br>
    Su teléfono es: <strong>${telefono}</strong>.
  `
  };

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  var info = await transport.sendMail(obj);

  res.render('index', {
    message: 'Mensaje enviado correctamente'
  });
});

module.exports = router;
