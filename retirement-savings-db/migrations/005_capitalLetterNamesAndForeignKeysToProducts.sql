ALTER TABLE `asset` RENAME `Asset` 
ALTER TABLE `fund` RENAME `Fund`
ALTER TABLE `rate` RENAME `Rate`
ALTER TABLE `user` RENAME `User`
ALTER TABLE `wallet` RENAME `Wallet`

ALTER TABLE `Wallet` ADD `InvestmentProductId` INT NULL
ALTER TABLE `Fund` ADD `InvestmentProductId` INT NOT NULL
