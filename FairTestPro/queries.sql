
select * from "admin";

ALTER USER postgres WITH CREATEDB;

select * from "mcq_exam";

select * from "question";

select * from "active_student";

select * from "result";

delete from "question" where exam_id='034415';

DELETE FROM "mcq_exam" WHERE "Exam_id" = '034415';

delete from question;

delete from mcq_exam;
