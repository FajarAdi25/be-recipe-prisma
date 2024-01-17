/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `recipes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "recipes_userId_key" ON "recipes"("userId");

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
