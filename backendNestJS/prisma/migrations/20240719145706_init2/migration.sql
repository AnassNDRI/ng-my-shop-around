-- AlterTable
ALTER TABLE `utilisateurs` ADD COLUMN `confirmationMailToken` VARCHAR(500) NULL,
    ADD COLUMN `confirmationMailTokenExpires` DATETIME(3) NULL;
