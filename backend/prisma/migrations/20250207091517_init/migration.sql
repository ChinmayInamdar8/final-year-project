-- CreateTable
CREATE TABLE "TestDetails" (
    "id" TEXT NOT NULL,
    "test_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "no_question" INTEGER NOT NULL,

    CONSTRAINT "TestDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" SERIAL NOT NULL,
    "test_id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "option1" TEXT NOT NULL,
    "option2" TEXT NOT NULL,
    "option3" TEXT NOT NULL,
    "option4" TEXT NOT NULL,
    "answer_op" TEXT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Test_test_id_key" ON "Test"("test_id");

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "TestDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
