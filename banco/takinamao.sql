-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 05-Abr-2021 às 23:09
-- Versão do servidor: 10.4.14-MariaDB
-- versão do PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `takinamao`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

CREATE TABLE `user` (
  `iduser` int(11) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `senha` varchar(45) NOT NULL,
  `tipo` varchar(45) NOT NULL DEFAULT '1',
  `celular` varchar(45) NOT NULL DEFAULT ' '
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`iduser`, `nome`, `email`, `senha`, `tipo`, `celular`) VALUES
(3, 'Luis Felipe Colosimo', 'luisfelipecolosimo@gmail.com', 'e8bdbae5a16e62d9386c61ecdf19cb5e', '1', ' ');

-- --------------------------------------------------------

--
-- Estrutura da tabela `vagas`
--

CREATE TABLE `vagas` (
  `idvagas` int(11) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `descricao` text NOT NULL DEFAULT ' ',
  `idCriador` varchar(45) NOT NULL,
  `cidade` varchar(45) NOT NULL,
  `valor` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `vagas`
--

INSERT INTO `vagas` (`idvagas`, `nome`, `descricao`, `idCriador`, `cidade`, `valor`, `status`) VALUES
(1, 'vaga 1', 'decricao bao vaga top de + super legal muito bom, aaaaaaaaaaaaaaaaa fdfdf grgrgr grgrg dskdf kjsflkfj psfuskf psfpf ´dpfksf', '1', 'sao joao', '1200', '0'),
(2, 'vaga 2', 'decricao 2  bao vaga top de + super legal muito bom, aaaaaaaaaaaaaaaaa fdfdf grgrgr grgrg dskdf kjsflkfj psfuskf psfpf ´dpfksf', '1', 'poços de caldas', '2100', '0'),
(3, 'jogo 3', '    jsdlfj sl kfjd k fjkf jsfjkldsjfkdlfj kfjsl kfk skjflksdjfkljsd kfjksljfkljs l jkslfjlksfj asdfree', '3', 'sao joao', '123', '0'),
(4, 'jogo 1', '    jsdlfj sl kfjd k fjkf jsfjkldsjfkdlfj kfjsl kfk skjflksdjfkljsd kfjksljfkljs l jkslfjlksfj asdfree', '3', 'poços', '321', '0');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`iduser`);

--
-- Índices para tabela `vagas`
--
ALTER TABLE `vagas`
  ADD PRIMARY KEY (`idvagas`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `iduser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `vagas`
--
ALTER TABLE `vagas`
  MODIFY `idvagas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
