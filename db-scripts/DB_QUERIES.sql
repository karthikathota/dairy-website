select  count(*) from users where UserName ='123';
select * from users;
ALTER TABLE Users
DROP COLUMN UserID;
Insert into users (PhoneNo, FirstName, LastName, UserName, Email, UserPassword) values
				("9923123232", "Sai", "Karthik", "123", "saikarthik.athota@gmail.com","123");
                
                
SHOW CREATE TABLE Users;
CREATE TABLE `users` (
   `UserID` INT PRIMARY KEY auto_increment,
   `PhoneNo` VARCHAR(50) NOT NULL,
   `FirstName` VARCHAR(50) NOT NULL,
   `LastName` VARCHAR(50) DEFAULT NULL,
   `UserName` VARCHAR(50) NOT NULL,
   `Email` VARCHAR(50) NOT NULL,
   `UserPassword` VARCHAR(50) NOT NULL
);
SHOW CREATE TABLE dairy;
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
 
 Insert into dairy (Entry, DairyDate, UserID) values ("This is todays Dairy", "2023-07-30" , 12);
                
select * from dairy where UserID=12 && DairyDate="2023-07-27" order by ID desc;
select * from dairy where UserID=12 order by ID desc;

select * from dairy;

