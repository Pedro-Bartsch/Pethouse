/**
 * Configura o tratamento AJAX para um formulário
 * @param {string} formSelector - Seletor do formulário (ex: "#formCadastro")
 * @param {string} endpoint - URL do script PHP (ex: "insert-clientes.php")
 * @param {string} messageSelector - Seletor da div de mensagens (ex: "#message")
 * @param {function} [successCallback] - Função opcional a ser executada no sucesso
 **/

function serializeForm(form) {
  const formData = new FormData(form);
  return new URLSearchParams(formData).toString();
}

function setupAjaxForm(
  formSelector,
  endpoint,
  messageSelector,
  successCallback
) {
  const form = document.querySelector(formSelector);
  const message = document.querySelector(messageSelector);

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = serializeForm(form);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data,
      });

      const result = await response.json();

      // Mensagem
      message.classList.remove("success", "error");
      message.classList.add(result.success ? "success" : "error");
      message.textContent = result.message || "Erro desconhecido";

      fade(message, "in");
      setTimeout(() => fade(message, "out"), 3000);

      if (result.success) {
        form.reset();

        if (typeof successCallback === "function") {
          successCallback(result);
        }
      }
    } catch (error) {
      console.error("ERRO AJAX: ", error);
      message.classList.remove("success");
      message.classList.add("error");
      message.textContent = "Erro ao conectar com o servidor";

      fade(message, "in");
      setTimeout(() => fade(message, "out"), 5000);
    }
  });
}

function setupAjaxFormWithFile(
  formSelector,
  endpoint,
  messageSelector,
  successCallback
) {
  const form = document.querySelector(formSelector);
  const message = document.querySelector(messageSelector);

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      message.classList.remove("success", "error");
      message.classList.add(result.success ? "success" : "error");
      message.textContent = result.message || "Erro desconhecido";

      fade(message, "in");
      setTimeout(() => fade(message, "out"), 3000);

      if (result.success) {
        form.reset();

        const preview = document.querySelector("#preview-container");
        if (preview) preview.innerHTML = "";

        if (typeof successCallback === "function") {
          successCallback(result);
        }
      }
    } catch (error) {
      console.error("Erro AJAX:", error);

      message.classList.remove("success");
      message.classList.add("error");
      message.textContent = "Erro ao conectar com o servidor.";

      fade(message, "in");
      setTimeout(() => fade(message, "out"), 5000);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupAjaxForm(
    "#formCadastro",
    window.BASE_URL + "components/functions/inserts/insert-clientes.php",
    "#message"
  );
  setupAjaxForm(
    "#formProduto",
    window.BASE_URL + "components/functions/inserts/insert-produtos.php",
    "#message",
    function (response) {
      // Callback específico para produtos (opcional)
      console.log("Produto cadastrado com ID:", response.id);
    }
  );
  setupAjaxForm(
    "#formVendedor",
    window.BASE_URL + "components/functions/inserts/insert-vendedores.php",
    "#message"
  );
  setupAjaxForm(
    "#formVenda",
    window.BASE_URL + "components/functions/inserts/insert-vendas.php",
    "#message"
  );
  setupAjaxForm(
    "#formCadastroUsuario",
    window.BASE_URL + "components/functions/update-usuario.php",
    "#message"
  );
});
setupAjaxFormWithFile(
  "#formCadUsuario",
  window.BASE_URL + "components/functions/inserts/insert-update-usuarios.php",
  "#message"
);

//   })
//   $(formSelector).on("submit", function (e) {
//     e.preventDefault();
//     $.ajax({
//       url: endpoint,
//       type: "POST",
//       data: $(this).serialize(),
//       dataType: "json",
//       success: function (response) {
//         const $message = $(messageSelector);

//         // Configura mensagem
//         $message
//           .removeClass(response.success ? "error" : "success")
//           .addClass(response.success ? "success" : "error")
//           .text(
//             response.message ||
//               (response.success
//                 ? "Operação realizada com sucesso!"
//                 : "Erro desconhecido")
//           )
//           .fadeIn()
//           .delay(3000)
//           .fadeOut();

//         // Reseta formulário se sucesso
//         if (response.success) {
//           $(formSelector)[0].reset();

//           // Executa callback se fornecido
//           if (typeof successCallback === "function") {
//             successCallback(response);
//           }
//         }
//       },
//       error: function (xhr, status, error) {
//         console.error("Erro AJAX:", { xhr, status, error });
//         $(messageSelector)
//           .removeClass("success")
//           .addClass("error")
//           .text(
//             "Erro ao conectar com o servidor: " + (xhr.responseText || error)
//           )
//           .fadeIn()
//           .delay(5000)
//           .fadeOut();
//       },
//     });
//   });
// }

// // Função que executa caso o formulario possua envio de arquivos
// function setupAjaxFormWithFile(
//   formSelector,
//   endpoint,
//   messageSelector,
//   successCallback
// ) {
//   $(formSelector).on("submit", function (e) {
//     e.preventDefault();

//     const form = this;
//     const formData = new FormData(form);

//     $.ajax({
//       url: endpoint,
//       type: "POST",
//       data: formData,
//       contentType: false,
//       processData: false,
//       dataType: "json",
//       success: function (response) {
//         const $message = $(messageSelector);

//         $message
//           .removeClass("success error")
//           .addClass(response.success ? "success" : "error")
//           .text(response.message || "Erro desconhecido")
//           .fadeIn()
//           .delay(3000)
//           .fadeOut();

//         if (response.success) {
//           form.reset();
//           $("#preview-container").html("");

//           if (typeof successCallback === "function") {
//             successCallback(response);
//           }
//         }
//       },
//       error: function (xhr, status, error) {
//         console.error("Erro AJAX:", { xhr, status, error });
//         $(messageSelector)
//           .removeClass("success")
//           .addClass("error")
//           .text("Erro ao conectar com o servidor.")
//           .fadeIn()
//           .delay(5000)
//           .fadeOut();
//       },
//     });
//   });
// }

// $(document).ready(function () {
//   // Configuração dos formulários
//   setupAjaxForm(
//     "#formCadastro",
//     window.BASE_URL + "components/functions/inserts/insert-clientes.php",
//     "#message"
//   );
//   setupAjaxForm(
//     "#formProduto",
//     window.BASE_URL + "components/functions/inserts/insert-produtos.php",
//     "#message",
//     function (response) {
//       // Callback específico para produtos (opcional)
//       console.log("Produto cadastrado com ID:", response.id);
//     }
//   );
//   setupAjaxForm(
//     "#formVendedor",
//     window.BASE_URL + "components/functions/inserts/insert-vendedores.php",
//     "#message"
//   );
//   // setupAjaxForm(
//   //   "#formVenda",
//   //   window.BASE_URL + "components/functions/inserts/insert-vendas.php",
//   //   "#message"
//   // );
//   setupAjaxForm(
//     "#formCadastroUsuario",
//     window.BASE_URL + "components/functions/update-usuario.php",
//     "#message"
//   );
// });

// setupAjaxFormWithFile(
//   "#formCadUsuario",
//   window.BASE_URL + "components/functions/inserts/insert-update-usuarios.php",
//   "#message"
// );

function fade(element, type = "in", duration = 400) {
  element.style.transition = `opacity ${duration}ms`;
  element.style.opacity = type === "in" ? 1 : 0;

  if (type === "in") {
    element.style.display = "block";
  } else {
    setTimeout(() => {
      element.style.display = "none";
    }, duration);
  }
}
