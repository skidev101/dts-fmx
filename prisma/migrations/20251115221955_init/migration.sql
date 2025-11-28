/*
  Warnings:

  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "fullname" DROP NOT NULL,
ALTER COLUMN "fullname" SET DEFAULT '';
