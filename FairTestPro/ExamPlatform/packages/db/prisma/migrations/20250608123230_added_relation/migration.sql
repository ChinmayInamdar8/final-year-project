-- AddForeignKey
ALTER TABLE "result" ADD CONSTRAINT "result_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "mcq_exam"("Exam_id") ON DELETE RESTRICT ON UPDATE CASCADE;
