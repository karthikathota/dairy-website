CREATE DATABASE dairy;               
                
CREATE TABLE `users` (
   `UserID` INT PRIMARY KEY auto_increment,
   `PhoneNo` VARCHAR(50) NOT NULL,
   `FirstName` VARCHAR(50) NOT NULL,
   `LastName` VARCHAR(50) DEFAULT NULL,
   `UserName` VARCHAR(50) NOT NULL,
   `Email` VARCHAR(50) NOT NULL,
   `UserPassword` VARCHAR(50) NOT NULL
);
CREATE TABLE `dairy` (
   `Id` int NOT NULL AUTO_INCREMENT,
   `Entry` text NOT NULL,
   `DairyDate` date NOT NULL,
   `CreatedTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
   `UserID` int DEFAULT NULL,
   PRIMARY KEY (`Id`),
   KEY `UserID` (`UserID`),
   CONSTRAINT `dairy_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`)
 );
