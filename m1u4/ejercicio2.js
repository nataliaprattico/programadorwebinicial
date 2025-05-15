document.addEventListener('DOMContentLoaded', function () {
  const boton = document.getElementById('btnCalcularMayor');

  boton.addEventListener('click', function () {
    const input = document.getElementById('numeros').value;
    const numeros = input.split(',').map(num => parseFloat(num.trim()));

    if (numeros.some(isNaN)) {
      document.getElementById('resultadoMayor').textContent = 'Por favor ingresa solo números separados por coma.';
      return;
    }

    let mayor = numeros[0];

    for (let i = 1; i < numeros.length; i++) {
      if (numeros[i] > mayor) {
        mayor = numeros[i];
      }
    }

    document.getElementById('resultadoMayor').textContent = 'El número mayor es: ' + mayor;
  });
});
