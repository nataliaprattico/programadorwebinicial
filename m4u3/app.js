var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var pool = require('./models/bd')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//consultas
//select

pool.query('select * from empleados').then(function (resultados) {
  console.log(resultados)
});

//insertar
//var obj = {
  //nombre: 'Flavia',
  //apellido: 'Lopez',
  //trabajo: 'docente',
  //edad: 38,
  //salario: 150000,
  //mail: 'flavialopez@gmail.com'
//}

//pool.query('insert into empleados set ?' , [obj]).then(function (resultados) {
  //console.log(resultados)
//});

//modificar por id
//var id = 23;
//var obj = {
  //nombre: 'Pablo',
  //apellido: 'Pepe',
  //edad: 50
//}

//pool.query('update empleados set ? where id_emp=?' , [obj, id]).then(function (resultados) {
  //console.log(resultados)
//});

//borrar
var id = 24

pool.query('delete from empleados where id_emp=?' , [id]).then(function (resultados) {
  console.log(resultados)
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
