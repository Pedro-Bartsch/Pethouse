CREATE TABLE tb_produto(
	cod_produto INT(8) NOT NULL,
    nm_produto VARCHAR (100) NOT NULL,
    ds_produto VARCHAR (200) NOT NULL,
    quantidade SMALLINT NOT NULL,
    nr_preco DECIMAL (10,2) NOT NULL,
    tipo_embalagem ENUM ("caixa", "frasco", "pacote", "garrafa"),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT pk_produto PRIMARY KEY tb_produto(cod_produto)
);