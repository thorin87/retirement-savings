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

ALTER TABLE `thorin87_myretirement`.`Asset` 
CHANGE COLUMN `WalletId` `WalletId` INT(11) NOT NULL AFTER `Id`,
CHANGE COLUMN `FundId` `FundId` INT(11) NULL DEFAULT NULL AFTER `WalletId`,
ADD COLUMN `IsRecurringPayment` TINYINT(1) NOT NULL DEFAULT 0 AFTER `OperationFee`,
ADD COLUMN `RecurringPaymentAmount` DECIMAL(10,2) NULL AFTER `IsRecurringPayment`,
ADD COLUMN `RecuuringPaymentDays` INT NULL AFTER `RecurringPaymentAmount`;

ALTER TABLE `thorin87_myretirement`.`Asset` 
CHANGE COLUMN `RecuuringPaymentDays` `RecuuringPaymentTimesInYear` INT(11) NULL DEFAULT NULL ;
