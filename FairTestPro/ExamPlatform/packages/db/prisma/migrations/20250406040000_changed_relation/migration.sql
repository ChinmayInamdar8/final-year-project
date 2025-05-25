/*
  Warnings:

  - Added the required column `correctOption` to the `question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "question" DROP CONSTRAINT "question_exam_id_fkey";

-- AlterTable
ALTER TABLE "question" ADD COLUMN     "correctOption" INTEGER NOT NULL,
ALTER COLUMN "exam_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "mcq_exam"("Exam_id") ON DELETE RESTRICT ON UPDATE CASCADE;
