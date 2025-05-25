-- CreateTable
CREATE TABLE "active_student" (
    "id" SERIAL NOT NULL,
    "exam_id" TEXT NOT NULL,
    "student_id" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "active_student_pkey" PRIMARY KEY ("id")
);
