DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(10) NULL,
  `nome` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `nascimento` datetime DEFAULT NULL,
  `rede_social` varchar(50) DEFAULT NULL,
  `tipo_rede_social` varchar(50) DEFAULT NULL,
  `pontos` smallint(6) DEFAULT NULL,
  `sessao` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;

DROP TABLE IF EXISTS `tipo_qr`;
CREATE TABLE IF NOT EXISTS `tipo_qr` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;

DROP TABLE IF EXISTS `atividade`;
CREATE TABLE IF NOT EXISTS `atividade` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(20) DEFAULT NULL,
  `id_tipo_qr` smallint(1) DEFAULT NULL,
  `descricao` varchar(500) DEFAULT NULL,
  `pontos` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY `FK_id_tipo_qr_tb_atividade` (`id_tipo_qr`) REFERENCES tipo_qr (id)
) ;

DROP TABLE IF EXISTS `alternativas_quiz`;
CREATE TABLE IF NOT EXISTS `alternativas_quiz` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `id_quiz` smallint(6) DEFAULT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `resposta_certa` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY `FK_id_quiz_tb_alternativas_quiz` (`id_quiz`) REFERENCES atividade (id)
) ;

DROP TABLE IF EXISTS `premio`;
CREATE TABLE IF NOT EXISTS `premio` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(20) DEFAULT NULL,
  `id_tipo_qr` smallint(1) DEFAULT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `estoque` smallint(6) DEFAULT NULL,
  `pontos` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY `FK_id_tipo_qr_tb_premio` (`id_tipo_qr`) REFERENCES tipo_qr (id)
) ;

DROP TABLE IF EXISTS `realiza_atividade`;
CREATE TABLE IF NOT EXISTS `realiza_atividade` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `id_usuario` smallint(6) DEFAULT NULL,
  `id_atividade` smallint(6) DEFAULT NULL,
  `hora_inicio` datetime DEFAULT NULL,
  `hora_fim` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY `FK_id_usuario_tb_realiza_atividade` (`id_usuario`) REFERENCES usuario (id)
  
) ;

DROP TABLE IF EXISTS `resgata_premio`;
CREATE TABLE IF NOT EXISTS `resgata_premio` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `id_usuario` smallint(6) DEFAULT NULL,
  `id_premio` smallint(6) DEFAULT NULL,
  `hora_resgate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;

DROP TABLE IF EXISTS `qr_finaliza_atividade`;
CREATE TABLE IF NOT EXISTS `qr_finaliza_atividade` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(20) DEFAULT NULL,
  `id_tipo_qr` smallint(1) DEFAULT NULL,
  `finaliza_atividade` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY `FK_id_tipo_qr_tb_qr_finaliza_atividade` (`id_tipo_qr`) REFERENCES tipo_qr (id)
) ;






