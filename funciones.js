const container = document.getElementById("asientos");

for (let i = 1; i <= 30; i++) {
  const asiento = document.createElement("button");
  asiento.innerText = i;
  asiento.className = "asiento";
  asiento.onclick = () => asiento.classList.toggle("seleccionado");
  container.appendChild(asiento);
}

function confirmarAsientos() {
  const seleccionados = document.querySelectorAll(".asiento.seleccionado");
  if (seleccionados.length === 0) {
    alert("Selecciona al menos un asiento");
  } else {
    alert("Asientos seleccionados: " + [...seleccionados].map(s => s.innerText).join(", "));
  }
}