/*
  Warnings:

  - You are about to drop the column `prfilePicture` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "prfilePicture",
ADD COLUMN     "profilePicture" TEXT;
