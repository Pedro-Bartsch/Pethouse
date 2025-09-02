CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nm_nome VARCHAR(100) NOT NULL,
    nm_login VARCHAR(50) NOT NULL UNIQUE,
    ds_email VARCHAR(100) NOT NULL UNIQUE,
    ds_password VARCHAR(255) NOT NULL,
    tipo_usuario ENUM ('admin', 'vendedor') NOT NULL DEFAULT 'vendedor',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);