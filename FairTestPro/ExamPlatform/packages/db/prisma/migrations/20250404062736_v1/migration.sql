-- CreateTable
CREATE TABLE "mcq_exam" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "Exam_id" TEXT NOT NULL,
    "no_of_questions" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "result_display" BOOLEAN NOT NULL,

    CONSTRAINT "mcq_exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" SERIAL NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "options" TEXT[],

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mcq_exam_Exam_id_key" ON "mcq_exam"("Exam_id");

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "mcq_exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
