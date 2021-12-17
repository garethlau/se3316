-- DropForeignKey
ALTER TABLE `Response` DROP FOREIGN KEY `Response_pollId_fkey`;

-- AlterTable
ALTER TABLE `Response` MODIFY `pollId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Response` ADD CONSTRAINT `Response_pollId_fkey` FOREIGN KEY (`pollId`) REFERENCES `Poll`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
