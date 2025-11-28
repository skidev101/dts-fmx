/*
  Warnings:

  - Added the required column `level` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Level" AS ENUM ('L100', 'L200', 'L300', 'L400', 'L500');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "level" "Level" NOT NULL;
