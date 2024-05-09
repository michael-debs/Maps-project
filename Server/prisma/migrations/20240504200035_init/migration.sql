/*
  Warnings:

  - You are about to drop the column `postId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_postId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "postId";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_id_fkey" FOREIGN KEY ("id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
