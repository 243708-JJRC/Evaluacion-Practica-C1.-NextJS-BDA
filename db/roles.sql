CREATE ROLE web_user LOGIN PASSWORD 'web_password';

GRANT CONNECT ON DATABASE postgres TO web_user;
GRANT USAGE ON SCHEMA public TO web_user;

GRANT SELECT ON
    vw_course_performance,
    vw_teacher_load,
    vw_students_at_risk,
    vw_attendance_by_group,
    vw_rank_students
TO web_user;
