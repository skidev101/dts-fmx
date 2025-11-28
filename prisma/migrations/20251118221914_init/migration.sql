/*
  Warnings:

  - You are about to drop the column `tags` on the `Note` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_uploadedById_fkey";

-- DropForeignKey
ALTER TABLE "NoteDownloadLog" DROP CONSTRAINT "NoteDownloadLog_noteId_fkey";

-- DropForeignKey
ALTER TABLE "NoteDownloadLog" DROP CONSTRAINT "NoteDownloadLog_userId_fkey";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "tags",
ALTER COLUMN "uploadedById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteDownloadLog" ADD CONSTRAINT "NoteDownloadLog_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteDownloadLog" ADD CONSTRAINT "NoteDownloadLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
