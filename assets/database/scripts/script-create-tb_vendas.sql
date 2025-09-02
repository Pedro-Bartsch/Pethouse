CREATE TABLE tb_vendas(

	id_venda INT PRIMARY KEY AUTO_INCREMENT,
	qnt_itens INT NOT NULL,
	vlr_total DECIMAL (8,2),
	id_cliente INT NOT NULL,
	id_vendedor INT NOT NULL,
	id_produto INT NOT NULL,
	status_venda ENUM ("em andamento", "cancelada", "finalizada"),
	data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	CONSTRAINT pk_vendas_clientes FOREIGN KEY (id_cliente) REFERENCES tb_clientes (id_cliente),
	CONSTRAINT pk_vendas_vendedores FOREIGN KEY (id_vendedor) REFERENCES tb_vendedor (cod_vendedor),
	CONSTRAINT pk_vendas_produtos FOREIGN KEY (id_produto) REFERENCES tb_produto (cod_produto)
);
