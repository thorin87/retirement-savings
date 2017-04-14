CREATE TABLE `wallet` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(256) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `asset` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Quantity` decimal(10,4) NOT NULL,
  `Bought` datetime NOT NULL,
  `Sold` datetime DEFAULT NULL,
  `WalletId` int(11) NOT NULL,
  `FundId` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;