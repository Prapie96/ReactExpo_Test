-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.40 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for testapi
CREATE DATABASE IF NOT EXISTS `testapi` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `testapi`;

-- Dumping structure for table testapi.account
CREATE TABLE IF NOT EXISTS `account` (
  `accountid` int NOT NULL AUTO_INCREMENT,
  `userid` int DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `usertype` int DEFAULT '2' COMMENT '1=Admin,2=user',
  PRIMARY KEY (`accountid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table testapi.account: ~5 rows (approximately)
INSERT INTO `account` (`accountid`, `userid`, `username`, `password`, `usertype`) VALUES
	(1, 1, 'John', '123', 1),
	(2, 277, 'Prapie', '1', 2),
	(3, 278, 'test', 'qwe', 1),
	(4, NULL, 'pop', 'pap', NULL),
	(5, NULL, 'pop1', 'pap1', 2);

-- Dumping structure for table testapi.attendance
CREATE TABLE IF NOT EXISTS `attendance` (
  `attendanceid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `statususer` int NOT NULL DEFAULT (0),
  PRIMARY KEY (`attendanceid`),
  KEY `FK_useridattendance` (`userid`),
  CONSTRAINT `FK_useridattendance` FOREIGN KEY (`userid`) REFERENCES `userinfo` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table testapi.attendance: ~9 rows (approximately)
INSERT INTO `attendance` (`attendanceid`, `userid`, `statususer`) VALUES
	(1, 1, 1),
	(2, 277, 2),
	(3, 278, 4),
	(4, 279, 3),
	(5, 281, 4),
	(6, 282, 4),
	(7, 283, 3),
	(8, 284, 3),
	(9, 286, 2);

-- Dumping structure for table testapi.status
CREATE TABLE IF NOT EXISTS `status` (
  `statusid` int NOT NULL AUTO_INCREMENT,
  `statusname` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`statusid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table testapi.status: ~4 rows (approximately)
INSERT INTO `status` (`statusid`, `statusname`) VALUES
	(1, 'มาเรียน'),
	(2, 'มาสาย'),
	(3, 'ลา'),
	(4, 'ขาดเรียน');

-- Dumping structure for table testapi.testattend
CREATE TABLE IF NOT EXISTS `testattend` (
  `attendid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL DEFAULT '0',
  `statususer` int NOT NULL DEFAULT (0),
  PRIMARY KEY (`attendid`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table testapi.testattend: ~12 rows (approximately)
INSERT INTO `testattend` (`attendid`, `userid`, `statususer`) VALUES
	(1, 1, 1),
	(2, 277, 4),
	(3, 278, 3),
	(4, 279, 3),
	(5, 281, 4),
	(6, 282, 1),
	(7, 283, 2),
	(8, 284, 2),
	(9, 285, 1),
	(10, 286, 1),
	(11, 287, 1),
	(12, 288, 4);

-- Dumping structure for table testapi.userinfo
CREATE TABLE IF NOT EXISTS `userinfo` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `nickname` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=291 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table testapi.userinfo: ~9 rows (approximately)
INSERT INTO `userinfo` (`userid`, `firstname`, `lastname`, `nickname`, `img`) VALUES
	(1, 'John', 'Doe', 'Antony', 'img_173831585812796c564e4-789a-433c-82e7-cfb67dbfa4cd.jpeg'),
	(277, 'Pongsapat​', 'Intaratoot', 'Prapie Angry', 'img_17381387767297f52ab29-6770-4a4d-a797-b2b18fcc5ab7.webp'),
	(278, 'Ratti', 'Ketchchaiyo', 'Disc', 'img_1738118988411935577d8-5873-44f1-9aab-e225c42eb066.jpeg'),
	(279, 'Kittipong', 'Pananon', 'Kitar', 'img_1738119737035ceac5fcc-cf01-4e21-8b23-6a72a424481d.jpeg'),
	(281, 'Sukrit', 'Nilda', 'Ham', 'img_1738119991433e67f6495-c2f0-4ba4-abad-97f524a26ccc.jpeg'),
	(282, 'Api​sit', 'Kittiruangaram', 'Khawoat', 'img_17381391015330b4dd8c9-bcad-4100-9b0d-b083a107f40a.jpeg'),
	(283, 'Nontakorn', 'Ukong', 'Boongkeii', 'img_17381391982248b7f8d56-1cc7-4235-ab4e-64fecca3b3c6.jpeg'),
	(284, 'Test', 'WithSis', 'Reine', 'img_1738308329691c01e99bc-aafa-4078-a032-7cfba71e87e1.jpeg'),
	(286, 'Ploypuk', 'Uso', 'Ploy', 'img_1738319132888d3a2d0ee-4169-4235-9f9d-d01ad7cb9fc1.jpeg');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
