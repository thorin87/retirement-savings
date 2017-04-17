CREATE TABLE `thorin87_myretirement`.`user` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Token` CHAR(36) NOT NULL,
  `Admin` TINYINT NOT NULL,
  PRIMARY KEY (`Id`));

ALTER TABLE `thorin87_myretirement`.`wallet` 
ADD COLUMN `UserId` INT NOT NULL AFTER `Name`;

ALTER TABLE `thorin87_myretirement`.`user` 
ADD UNIQUE INDEX `Token_UNIQUE` (`Token` ASC);