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
  PRIMARY KEY (`accountid`),
  KEY `FK_account_userinfo` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table testapi.account: ~19 rows (approximately)
INSERT INTO `account` (`accountid`, `userid`, `username`, `password`, `usertype`) VALUES
	(1, 1, 'John', '123', 1),
	(2, 277, 'Pie', '1', 1),
	(3, 278, 'D12', 'D11', 1),
	(4, 279, 'tar234', 'kay', 2),
	(5, 281, 'chin@', 'chin123', 2),
	(6, 282, 'j3k', 'Qwe', 2),
	(7, 283, 'bo47', '47yu', 2),
	(8, 284, 't', 't1', 2),
	(9, 286, 'Jin', 'ploy', 2),
	(13, 312, 'qwe', '123', 2),
	(14, 287, 'regis', 'ter', 2),
	(15, 288, 'regis1', 'ter1', 2),
	(16, 289, 'select', 'up', 2),
	(40, 290, 'p1', 'pp1', 2),
	(41, 291, 'c1', 'c2', 2),
	(42, 292, 'v', 'c2v', 2),
	(43, 293, 'Key', 'Dow', 2),
	(44, 294, 'Dydy', 'E', 2),
	(46, 296, 'Cola', 'C1', 2);

-- Dumping structure for table testapi.attendance
CREATE TABLE IF NOT EXISTS `attendance` (
  `attendanceid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `statususer` int NOT NULL DEFAULT (0),
  PRIMARY KEY (`attendanceid`),
  KEY `FK_useridattendance` (`userid`),
  CONSTRAINT `FK_useridattendance` FOREIGN KEY (`userid`) REFERENCES `userinfo` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table testapi.attendance: ~10 rows (approximately)
INSERT INTO `attendance` (`attendanceid`, `userid`, `statususer`) VALUES
	(1, 1, 1),
	(2, 277, 1),
	(3, 278, 1),
	(4, 279, 1),
	(5, 281, 1),
	(6, 282, 1),
	(7, 283, 1),
	(8, 284, 1),
	(9, 286, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=297 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table testapi.userinfo: ~17 rows (approximately)
INSERT INTO `userinfo` (`userid`, `firstname`, `lastname`, `nickname`, `img`) VALUES
	(1, 'John', 'Doe', 'Antony', 'img_173831585812796c564e4-789a-433c-82e7-cfb67dbfa4cd.jpeg'),
	(277, 'La96', 'Yapie', 'P1e99', 'img_1739257839260ae888cf1-00c9-4c75-9aed-9a8c38760401.jpeg'),
	(278, 'Rat56', 'KT-343', 'D13k', 'img_17392577697478ca2d889-1df5-45d4-98f4-a0900ea20c58.jpeg'),
	(279, 'Kitti49', 'Panama', 'Karti345', 'img_1739257576780030ff785-e9f3-4237-bcf5-3ee8cac138ab.jpeg'),
	(281, 'Shinnosuke', 'Nohara', 'Chinjung', 'img_1739256997798ce180bf3-b72d-4760-b5c8-5a40a9d112c6.jpeg'),
	(282, 'Ap48', 'Kt12', 'O31j3k', 'img_1739257995036560bf5c3-7f8d-4f46-93ee-bc4119385523.jpeg'),
	(283, 'No2345', 'Ur87', 'B47ok', 'img_1739257448661842fd0e0-4f28-445b-94e3-90c8b633e796.jpeg'),
	(284, 'Li31', 'Weed', 'Pu334', 'img_1739258053715ca980995-563a-48b4-9492-a796409addf0.jpeg'),
	(286, 'Pl_46', 'Uso932', 'Pl32', 'img_17392575016651f99aff5-a387-4f8d-82a6-839a7339db35.jpeg'),
	(293, 'Kuakilng', 'Pakthai', 'Khaidow', 'img_173941720030607c27266-a177-491c-a10f-f6b1568ad310.jpeg'),
	(296, 'Coca', 'Cola', 'Coala', 'img_17394187209396796f2aa-5c52-4697-be28-037d2818f70f.jpeg');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
