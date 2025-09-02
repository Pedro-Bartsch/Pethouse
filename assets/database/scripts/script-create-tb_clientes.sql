CREATE TABLE tb_clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(200) NOT NULL,
    telefone VARCHAR (20) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    estado_civil CHAR(1) NOT NULL DEFAULT 'S' COMMENT 'C=Casado, S=Solteiro',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);