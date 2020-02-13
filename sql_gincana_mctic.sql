-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 13-Fev-2020 às 10:54
-- Versão do servidor: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gincana_mctic`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `alternativas_quiz`
--

DROP TABLE IF EXISTS `alternativas_quiz`;
CREATE TABLE IF NOT EXISTS `alternativas_quiz` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `id_quiz` smallint(6) DEFAULT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `resposta_certa` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_id_quiz_tb_alternativas_quiz` (`id_quiz`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `atividade_qr`
--

DROP TABLE IF EXISTS `atividade_qr`;
CREATE TABLE IF NOT EXISTS `atividade_qr` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(500) DEFAULT NULL,
  `pontuacao` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `atividade_quiz`
--

DROP TABLE IF EXISTS `atividade_quiz`;
CREATE TABLE IF NOT EXISTS `atividade_quiz` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(500) DEFAULT NULL,
  `pontuacao` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `pai_filho`
--

DROP TABLE IF EXISTS `pai_filho`;
CREATE TABLE IF NOT EXISTS `pai_filho` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `id_pai` smallint(6) DEFAULT NULL,
  `id_filho` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_id_pai_tb_pai_filho` (`id_pai`),
  KEY `FK_id_filho_tb_pai_filho` (`id_filho`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `premio`
--

DROP TABLE IF EXISTS `premio`;
CREATE TABLE IF NOT EXISTS `premio` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(100) DEFAULT NULL,
  `estoque` smallint(6) DEFAULT NULL,
  `pontos` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `realiza_atividade`
--

DROP TABLE IF EXISTS `realiza_atividade`;
CREATE TABLE IF NOT EXISTS `realiza_atividade` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `id_usuario` smallint(6) DEFAULT NULL,
  `id_tipo_atividade` smallint(6) DEFAULT NULL,
  `hora_inicio` datetime DEFAULT NULL,
  `hora_fim` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_id_usuario_tb_realiza_atividade` (`id_usuario`),
  KEY `FK_id_tipo_atividade_tb_realiza_atividade` (`id_tipo_atividade`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `resgata_premio`
--

DROP TABLE IF EXISTS `resgata_premio`;
CREATE TABLE IF NOT EXISTS `resgata_premio` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `id_usuario` smallint(6) DEFAULT NULL,
  `id_premio` smallint(6) DEFAULT NULL,
  `hora_resgate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Acionadores `resgata_premio`
--
DROP TRIGGER IF EXISTS `atualiza_estoque`;
DELIMITER $$
CREATE TRIGGER `atualiza_estoque` AFTER INSERT ON `resgata_premio` FOR EACH ROW BEGIN
   UPDATE premio
   SET estoque = estoque-1
   WHERE premio.id = resgata_premio.id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipo_atividade`
--

DROP TABLE IF EXISTS `tipo_atividade`;
CREATE TABLE IF NOT EXISTS `tipo_atividade` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipo_cadastro`
--

DROP TABLE IF EXISTS `tipo_cadastro`;
CREATE TABLE IF NOT EXISTS `tipo_cadastro` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipo_usuario`
--

DROP TABLE IF EXISTS `tipo_usuario`;
CREATE TABLE IF NOT EXISTS `tipo_usuario` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  `login` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `senha` varchar(30) DEFAULT NULL,
  `id_tipo_cadastro` smallint(6) DEFAULT NULL,
  `id_tipo_usuario` smallint(6) DEFAULT NULL,
  `pontos` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_id_tipo_cadastro_tb_pai_filho` (`id_tipo_cadastro`),
  KEY `FK_id_tipo_usuario_tb_pai_filho` (`id_tipo_usuario`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
