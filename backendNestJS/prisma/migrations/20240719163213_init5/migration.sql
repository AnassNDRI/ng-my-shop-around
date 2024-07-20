/*
  Warnings:

  - You are about to alter the column `utilisateur_email` on the `utilisateurs` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - A unique constraint covering the columns `[utilisateur_email]` on the table `Utilisateurs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `utilisateurs` MODIFY `utilisateur_email` VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Utilisateurs_utilisateur_email_key` ON `Utilisateurs`(`utilisateur_email`);
