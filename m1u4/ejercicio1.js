document.getElementById('btnCalcular').addEventListener('click', function() {

  let distancia = parseInt(document.getElementById('distancia').value);

  let resultado = '';

  if (distancia >= 0 && distancia <= 1000) {
    resultado = 'Usa: pie';
  } else if (distancia > 1000 && distancia <= 10000) {
    resultado = 'Usa: bicicleta';
  } else if (distancia > 10000 && distancia <= 30000) {
    resultado = 'Usa: colectivo';
  } else if (distancia > 30000 && distancia <= 100000) {
    resultado = 'Usa: auto';
  } else if (distancia > 100000) {
    resultado = 'Usa: avión';
  } else {
    resultado = 'Distancia no válida';
  }

  document.getElementById('resultado').textContent = resultado;

});