INSERT INTO Asset (Quantity, Bought, WalletId, FundId)
SELECT -Quantity AS Quantity, Sold AS Bought, WalletId, FundId 
FROM Asset
WHERE Sold IS NOT NULL;

ALTER TABLE `thorin87_myretirement`.`Asset` 
DROP COLUMN `Sold`,
CHANGE COLUMN `Bought` `OperationDate` DATETIME NOT NULL ,
CHANGE COLUMN `WalletId` `WalletId` INT(11) NOT NULL ,
CHANGE COLUMN `FundId` `FundId` INT(11) NULL ;

ALTER TABLE `Rate` 
ADD INDEX `DateAndFundId` (`Date` ASC, `FundId` ASC);
