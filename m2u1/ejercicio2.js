let texto = document.getElementById("miTexto");
let contador = document.getElementById("contador");

texto.addEventListener("input", function() {
  let cantidad = texto.value.length;
  contador.textContent = cantidad;
});
