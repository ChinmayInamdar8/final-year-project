-- AlterTable
ALTER TABLE "mcq_exam" ADD COLUMN     "admin_id" INTEGER NOT NULL DEFAULT 2;

-- AddForeignKey
ALTER TABLE "mcq_exam" ADD CONSTRAINT "mcq_exam_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
