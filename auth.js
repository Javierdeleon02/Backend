function login(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Simulación de login para administrador
  if (email === "admin@chapinepolis.com" && password === "1234") {
    alert("Bienvenido administrador");
    window.location.href = "admin.html";

  // Simulación de login para cliente registrado
  } else if (email === "cliente@gmail.com" && password === "1234") {
    alert("Bienvenido cliente");
    window.location.href = "cliente.html";

  } else {
    alert("Credenciales incorrectas");
  }
}
