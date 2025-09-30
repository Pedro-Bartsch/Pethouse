-- Arquivo de Inserts

-- INSERIR USUARIO ADMIN
INSERT INTO usuarios (nm_nome, nm_login, ds_email, ds_password, tipo_usuario, data_cadastro) VALUES
('Admin', 'admin', 'admin@gmail.com', '123', 'admin', NOW());


-- INSERIR CLIENTES
INSERT INTO tb_clientes (nome, endereco, telefone, email, estado_civil, data_cadastro) VALUES
('Ana Silva', 'Rua dos Cachorros, 123', '(11) 98765-4321', 'ana.silva@email.com', 'S', NOW()),
('Carlos Pereira', 'Av. Gatos Felizes, 456', '(21) 99876-5432', 'carlos.pereira@email.com', 'C', NOW()),
('Mariana Souza', 'Rua dos Pássaros, 789', '(31) 91234-5678', 'mariana.souza@email.com', 'S', NOW()),
('Rogério dos Santos', 'Travessa dos Hamsters, 101', '(41) 98456-7890', 'rogerio.senai@email.com', 'C', NOW()),
('Ricardo Gomes', 'Alameda dos Peixes, 222', '(51) 97321-6543', 'ricardo.gomes@email.com', 'C', NOW());

-- INSERIR PRODUTOS (com códigos realistas de 8 dígitos)
INSERT INTO tb_produto (cod_produto, nm_produto, ds_produto, quantidade, nr_preco, tipo_embalagem, data_cadastro) VALUES
(10012035, 'Ração para Cachorro', 'Ração balanceada para cães adultos', 100, 120.00, 'pacote', NOW()),
(10023579, 'Areia para Gato', 'Areia sanitária perfumada para gatos', 200, 30.50, 'caixa', NOW()),
(10034892, 'Shampoo Pet', 'Shampoo neutro para pelagem de cães e gatos', 150, 25.00, 'frasco', NOW()),
(10045903, 'Brinquedo para Cães', 'Bola de borracha resistente para cães', 50, 40.00, 'pacote', NOW()),
(10057821, 'Ração para Pássaros', 'Mistura nutritiva para aves domésticas', 80, 15.75, 'pacote', NOW()),
(10062345, 'Coleira Antipulgas', 'Coleira repelente com duração de 3 meses', 80, 49.99, 'pacote', NOW()),
(10074567, 'Garrafa de Água Portátil', 'Garrafa com bebedouro para passeios', 40, 32.90, 'garrafa', NOW());

-- INSERIR VENDEDORES
INSERT INTO tb_vendedor (nm_nome, nr_celular, ds_email, data_cadastro) VALUES
('Kauany Paterno', '(11) 99999-8888', 'kauany.paterno@pethouse.com', NOW()),
('Luiz Guilherme', '(21) 98888-7777', 'luiz.guilherme@pethouse.com', NOW()),
('Pedro Bartsch', '(31) 97777-6666', 'pedro.bartsch@pethouse.com', NOW());

-- INSERIR VENDAS
INSERT INTO tb_vendas (qnt_itens, vlr_total, id_cliente, id_vendedor, id_produto, status_venda, data_venda) VALUES
(2, 240.00, 1, 1, 10012035, 'finalizada', NOW()),
(3, 91.50, 2, 2, 10023579, 'finalizada', NOW()),
(1, 25.00, 3, 1, 10034892, 'finalizada', NOW()),
(4, 160.00, 1, 2, 10045903, 'finalizada', NOW()),
(5, 78.75, 3, 1, 10057821, 'finalizada', NOW()),
(1, 119.90, 2, 1, 10012035, 'finalizada', NOW()),
(2, 69.00, 5, 2, 10023579, 'finalizada', NOW()),    
(3, 66.00, 4, 3, 10034892, 'finalizada', NOW()),    
(1, 45.00, 3, 1, 10045903, 'finalizada', NOW()),    
(2, 97.98, 2, 2, 10062345, 'finalizada', NOW()),    
(1, 32.90, 1, 3, 10074567, 'finalizada', NOW()),    
(2, 237.80, 5, 1, 10012035, 'finalizada', NOW()),   
(1, 18.75, 3, 2, 10057821, 'finalizada', NOW());    

