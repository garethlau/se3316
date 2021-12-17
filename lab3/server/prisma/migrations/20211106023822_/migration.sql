/*
  Warnings:

  - Added the required column `pollId` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Response` ADD COLUMN `pollId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Response` ADD CONSTRAINT `Response_pollId_fkey` FOREIGN KEY (`pollId`) REFERENCES `Poll`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
