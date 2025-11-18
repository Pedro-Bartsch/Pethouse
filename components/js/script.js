document.addEventListener("DOMContentLoaded", () => {
  const pagina = document.getElementById("pagina");

  if (!pagina) {
    console.error("ERRO: div #pagina não encontrada.");
    return;
  }

  // -----------------------------------------------------------
  // FUNÇÃO DE CARREGAMENTO DAS PÁGINAS
  // -----------------------------------------------------------
  async function carregarPagina(url) {
    pagina.innerHTML = `
      <div class="text-center p-4">
        <i class="fa fa-spinner fa-spin fa-2x"></i><br>
        Carregando...
      </div>
    `;

    try {
      const resp = await fetch(url, { cache: "no-store" });
      if (!resp.ok) throw new Error(resp.status);

      const conteudo = await resp.text();
      pagina.innerHTML = conteudo;
    } catch (e) {
      pagina.innerHTML = `
        <div class="alert alert-danger">
          Erro ao carregar a página:<br>
          <strong>${url}</strong><br>
          Código: ${e.message}
        </div>
      `;
    }
  }

  // -----------------------------------------------------------
  // TRATADOR DE CLIQUE NOS SUBMENUS
  // -----------------------------------------------------------
  document.querySelectorAll(".submenu").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      const path = item.dataset.page;

      if (!path) {
        console.error("submenu sem data-page", item);
        return;
      }

      let url = path;

      // Se não tiver .php, adiciona .php
      if (!url.endsWith(".php")) {
        url += ".php";
      }

      carregarPagina(url);

      // remove active dos outros
      document
        .querySelectorAll(".submenu")
        .forEach((s) => s.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // -----------------------------------------------------------
  // ABRE E FECHA SUBMENUS (SETA GIRO)
  // -----------------------------------------------------------
  document.querySelectorAll("[data-bs-toggle='collapse']").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const icon = toggle.querySelector(".bi");

      // fecha todos os outros
      document.querySelectorAll(".collapse.show").forEach((div) => {
        if (div.id !== toggle.getAttribute("href")?.replace("#", "")) {
          div.classList.remove("show");
        }
      });

      // Alterna seta
      if (icon) icon.classList.toggle("rotate");

      // Remove rotação das outras setas
      document.querySelectorAll(".bi.rotate").forEach((el) => {
        if (el !== icon) el.classList.remove("rotate");
      });
    });
  });
});
