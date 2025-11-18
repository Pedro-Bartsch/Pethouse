async function ajax(url, data = {}, method = "POST") {
  const options = {
    method,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(data),
  };

  const response = await fetch(url, options);
  return response.json();
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const message = document.getElementById("message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await ajax(
        window.BASE_URL + "components/functions/valida_login.php",
        data
      );

      message.className = response.success ? "success" : "error";
      message.textContent = response.message;
      message.style.display = "block";

      if (response.success) {
        setTimeout(() => {
          window.location.href =
            response.redirect || window.BASE_URL + "pages/painel.php";
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      message.className = "error";
      message.textContent = "Erro ao processar login.";
      message.style.display = "block";
    }
  });
});
