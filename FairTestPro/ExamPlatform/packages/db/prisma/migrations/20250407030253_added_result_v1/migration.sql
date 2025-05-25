/*
  Warnings:

  - Added the required column `question_no` to the `question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "question" ADD COLUMN     "question_no" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "result" (
    "id" SERIAL NOT NULL,
    "exam_id" TEXT NOT NULL,
    "student_id" INTEGER NOT NULL,
    "result_validity" BOOLEAN NOT NULL DEFAULT true,
    "marks" INTEGER NOT NULL,

    CONSTRAINT "result_pkey" PRIMARY KEY ("id")
);
