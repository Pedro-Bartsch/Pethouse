<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Autenticação de usuário</title>
    <link rel="stylesheet" href="css/style.css" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <script src="components/js/config_js.php"></script>
    <script src="components/js/login-ajax.js"></script>
    
    <style>
      body {
        background: #ffffff;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: "Segoe UI", Arial, sans-serif;
      }

      .login-container {
        background: #fff;
        padding: 2.5rem 2rem;
        border-radius: 15px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        width: 100%;
        max-width: 380px;
        text-align: center;
      }

      .login-container h2 {
        margin-bottom: 1.5rem;
        font-weight: 600;
        color: #0d6efd;
      }

      .form-label {
        text-align: left;
        display: block;
        margin-bottom: 0.4rem;
        font-weight: 500;
      }

      input.form-control {
        margin-bottom: 1rem;
        border-radius: 10px;
        padding: 0.6rem;
      }

      .btn-primary {
        width: 100%;
        border-radius: 10px;
        padding: 0.6rem;
        font-weight: 500;
      }

      #message {
        margin-top: 1rem;
        font-weight: 500;
      }

      #message.success {
        color: #198754;
      }

      #message.error {
        color: #dc3545;
      }

      .register-link {
        margin-top: 1rem;
        display: block;
        font-size: 0.9rem;
      }

      .register-link a {
        text-decoration: none;
        color: #0d6efd;
      }

      .register-link a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Autenticação de usuários</h2>
      <form id="loginForm" method="POST">
        <label for="nm_login">Login</label>
        <input type="text" id="nm_login" name="nm_login" required />

        <label for="ds_password">Senha</label>
        <input type="password" id="ds_password" name="ds_password" required />

        <button type="submit" class="btn btn-primary">Entrar</button>

        <br />
        <br />
        <p>
          Não possui conta ?
          <a href="pages/register.php">Cadastre-se aqui</a>
        </p>

        <div id="message" style="display: none; margin-top: 10px"></div>
      </form>
    </div>
  </body>
</html>
