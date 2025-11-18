document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const msg = document.getElementById("message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const f = new FormData(form);
    const senha = f.get("ds_password");
    const confirma = f.get("ds_password_confirm");

    if (senha !== confirma) {
      showMsg("As senhas não coincidem.", false);
      return;
    }

    try {
      const response = await ajax(
        "../components/functions/valida_register.php",
        Object.fromEntries(f.entries())
      );

      showMsg(response.message, response.success);

      if (response.success) {
        form.reset();
        setTimeout(() => {
          window.location.href = "/Pethouse/login.php";
        }, 2000);
      }
    } catch {
      showMsg("Erro ao processar cadastro.", false);
    }
  });

  function showMsg(texto, ok) {
    msg.className = ok ? "success" : "error";
    msg.textContent = texto;
    msg.style.display = "block";
    setTimeout(() => (msg.style.display = "none"), 3000);
  }
});
