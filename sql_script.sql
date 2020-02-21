INSERT INTO usuario (nome,email,nascimento,rede_social,tipo_rede_social,pontos,sessao) values ("Maxwell Borges","max@gmail.com","1994-02-25","@maxwell.borges","twitter",15,"");
INSERT INTO usuario (nome,email,nascimento,rede_social,tipo_rede_social,pontos,sessao) values ("Leandro Chaves","leandro@gmail.com","1994-01-21","@leandrochl","instagram",5,"");

INSERT INTO premio (codigo,descricao,estoque,pontos) VALUES ('MCTIC0002', 'Caderno', 20, 15);
INSERT INTO premio (codigo,descricao,estoque,pontos) VALUES ('MCTIC0003', 'Lápis', 100, 5);
INSERT INTO premio (codigo,descricao,estoque,pontos) VALUES ('MCTIC0004', 'Bolsa', 5, 50);
INSERT INTO premio (codigo,descricao,estoque,pontos) VALUES ('MCTIC0005', 'Celular', 5, 100);

INSERT INTO tipo_atividade (descricao) VALUES ('Atividade física');
INSERT INTO tipo_atividade (descricao) VALUES ('Quiz');

INSERT INTO atividade (codigo,id_tipo_atividade, descricao,pontos) VALUES ('MCTIC0006', 1,'Subir na árvore', 15);
INSERT INTO atividade (codigo,id_tipo_atividade, descricao,pontos) VALUES ('MCTIC0007', 1,'Cantar o hino', 25);
INSERT INTO atividade (codigo,id_tipo_atividade, descricao,pontos) VALUES ('MCTIC0008', 1,'Pular 3x', 10);
INSERT INTO atividade (codigo,id_tipo_atividade, descricao,pontos) VALUES ('MCTIC0009', 1,'Tirar foto', 30);

INSERT INTO atividade (codigo,id_tipo_atividade, descricao,pontos) VALUES ('MCTIC0010', 2,'Quantas horas demora?', 15);
INSERT INTO atividade (codigo,id_tipo_atividade, descricao,pontos) VALUES ('MCTIC0011', 2,'Quantos dias demora?', 10);
INSERT INTO atividade (codigo,id_tipo_atividade, descricao,pontos) VALUES ('MCTIC0012', 2,'Qual o nome?', 5);
INSERT INTO atividade (codigo,id_tipo_atividade, descricao,pontos) VALUES ('MCTIC0013', 2,'Qual a idade?', 50);

INSERT INTO alternativas_quiz (id_quiz,descricao,resposta_certa) VALUES (5, '5h', 'N');
INSERT INTO alternativas_quiz (id_quiz,descricao,resposta_certa) VALUES (5, '6h', 'S');
INSERT INTO alternativas_quiz (id_quiz,descricao,resposta_certa) VALUES (5, '12h', 'N');
INSERT INTO alternativas_quiz (id_quiz,descricao,resposta_certa) VALUES (6, '5 dias', 'S');
INSERT INTO alternativas_quiz (id_quiz,descricao,resposta_certa) VALUES (6, '6 dias', 'N');
INSERT INTO alternativas_quiz (id_quiz,descricao,resposta_certa) VALUES (6, '7 dias', 'N');
INSERT INTO alternativas_quiz (id_quiz,descricao,resposta_certa) VALUES (7, 'Jorge', 'S');
INSERT INTO alternativas_quiz (id_quiz,descricao,resposta_certa) VALUES (7, 'Carlos', 'N');
INSERT INTO alternativas_quiz (id_quiz,descricao,resposta_certa) VALUES (7, 'Maurício', 'N');
INSERT INTO alternativas_quiz (id_quiz,descricao,resposta_certa) VALUES (8, '13 anos', 'S');
INSERT INTO alternativas_quiz (id_quiz,descricao,resposta_certa) VALUES (8, '14 anos', 'N');
INSERT INTO alternativas_quiz (id_quiz,descricao,resposta_certa) VALUES (8, '15 anos', 'N');





