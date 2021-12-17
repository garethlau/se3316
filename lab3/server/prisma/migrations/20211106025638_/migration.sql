/*
  Warnings:

  - Added the required column `author` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Response` DROP FOREIGN KEY `Response_userId_fkey`;

-- AlterTable
ALTER TABLE `Response` ADD COLUMN `author` VARCHAR(191) NOT NULL;
