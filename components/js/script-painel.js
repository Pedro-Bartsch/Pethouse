document.addEventListener("DOMContentLoaded", () => {
  const paginaDiv = document.getElementById("pagina");
  if (!paginaDiv) {
    console.error(
      "Elemento #pagina não encontrado. Insira <div id='pagina'></div> no HTML."
    );
    return;
  }

  // Função utilitária para montar a URL a partir do data-page
  function buildUrlFromDataPage(dataPage) {
    if (!dataPage) return null;

    // Se já vem com .php, usa direto
    if (dataPage.endsWith(".php")) return dataPage;

    // Se vier com / e sem .php, apenas adiciona .php
    return dataPage + ".php";
  }

  // Função de carga via fetch com loader e tratamento de erro
  async function loadPageToContainer(url, container) {
    container.innerHTML = `
      <div class="loader text-center py-4" style="font-size:18px;">
        <i class="fa fa-spinner fa-spin"></i> Carregando...
      </div>
    `;

    try {
      const resp = await fetch(url, { cache: "no-store" });
      if (!resp.ok) throw new Error(`HTTP ${resp.status} - ${resp.statusText}`);
      const html = await resp.text();
      container.innerHTML = html;
    } catch (err) {
      console.error("Erro ao carregar página:", url, err);
      container.innerHTML = `
        <div class="alert alert-danger">
          Erro ao carregar a página: ${err.message}
        </div>
      `;
    }
  }

  // ---- Controle de dropdowns (abre/fecha submenus) ----
  document
    .querySelectorAll(
      ".nav .nav-link[data-bs-toggle='collapse'], .dropdown-toggle"
    )
    .forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        // Permite que Bootstrap também trate (se quiser). Aqui só cuidamos da UI extra.
        // Não impede comportamento padrão porque usamos collapse via classes.
        const targetSelector =
          toggle.getAttribute("href") || toggle.dataset.bsTarget;
        let submenu = null;

        if (targetSelector && targetSelector.startsWith("#")) {
          submenu = document.querySelector(targetSelector);
        } else {
          // fallback: próximo elemento .collapse
          const next = toggle.nextElementSibling;
          if (next && next.classList.contains("collapse")) submenu = next;
        }

        // Fecha outros submenus abertos
        document.querySelectorAll(".collapse.show").forEach((open) => {
          if (open !== submenu) open.classList.remove("show");
        });

        // Alterna o submenu atual
        if (submenu) submenu.classList.toggle("show");

        // Alterna a rotação da seta (procura ícone de chevron dentro)
        const arrow = toggle.querySelector(
          ".arrow, .bi-chevron-down, .bi-chevron-up, i"
        );
        if (arrow) {
          arrow.classList.toggle("rotate");
          // remove rotate de outras setas
          document
            .querySelectorAll(
              ".nav .nav-link .rotate, .dropdown-toggle .rotate"
            )
            .forEach((a) => {
              if (!toggle.contains(a)) a.classList.remove("rotate");
            });
        }
      });
    });

  // ---- Clique nos itens .submenu (carregar conteúdo dinâmico) ----
  document.querySelectorAll(".submenu").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      // Pegamos diretamente o data-page
      const dp = item.dataset.page;
      if (!dp) {
        console.warn("Elemento .submenu sem data-page:", item);
        return;
      }

      // Marca ativo
      document
        .querySelectorAll(".submenu")
        .forEach((s) => s.classList.remove("active"));
      item.classList.add("active");

      // Monta URL de forma inteligente
      let url = buildUrlFromDataPage(dp.trim());

      // Se o data-page não tem pasta e não contém '/', mas você quer que vá para formularios,
      // mas no seu HTML data-page já tem 'formularios/...', então respeitamos o que está no atributo.
      // Ex: data-page="clientes" -> "clientes.php"
      //     data-page="formularios/clientes" -> "formularios/clientes.php"
      //     data-page="reports/rprt_clientes" -> "reports/rprt_clientes.php"
      //     data-page="painel" -> "painel.php"
      // Caso queira prefixo sempre "formularios/", altere aqui.

      // Se gerou null
      if (!url) {
        console.error("Impossível montar URL a partir de data-page:", dp);
        return;
      }

      // Se a URL não começa com '/' e não é absoluta, deixamos relativa ao app
      // Opcional: prefixar BASE_URL se disponível
      if (
        typeof window.BASE_URL !== "undefined" &&
        !url.startsWith("/") &&
        !url.match(/^https?:\/\//)
      ) {
        // se data-page já incluir BASE_URL (por exemplo: "<?= BASE_URL ?>...") o dev dá o caminho completo
        // Aqui assumimos caminhos relativos ao root do projeto
        // Não força; se não quiser prefixar, comente a linha abaixo
        url = (window.BASE_URL || "") + url;
      }

      console.log("Carregando", url);
      loadPageToContainer(url, paginaDiv);
    });
  });
});
