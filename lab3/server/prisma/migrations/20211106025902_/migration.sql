/*
  Warnings:

  - You are about to drop the column `userId` on the `Response` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Response_userId_fkey` ON `Response`;

-- AlterTable
ALTER TABLE `Response` DROP COLUMN `userId`;
