-- VIEW: vw_course_performance
-- Qué devuelve: Rendimiento por curso y periodo
-- Grain: 1 fila = 1 curso + 1 periodo + 1 programa
-- Métricas: promedio_final, alumnos_reprobados
-- Usa GROUP BY y COUNT FILTER
-- VERIFY: SELECT * FROM vw_course_performance ORDER BY term;

CREATE OR REPLACE VIEW vw_course_performance AS
SELECT
    c.name_course AS course,
    g.term,
    s.program,
    ROUND(AVG(gr.final), 2) AS promedio_final,
    COUNT(*) FILTER (WHERE gr.final < 60) AS alumnos_reprobados
FROM grades gr
JOIN enrollments e ON e.id = gr.enrollment_id
JOIN students s ON s.id = e.student_id
JOIN groups g ON g.id = e.group_id
JOIN courses c ON c.id = g.course_id
GROUP BY c.name_course, g.term, s.program;


-- ===================================================
-- VIEW: vw_teacher_load
-- Qué devuelve: Carga académica por docente y periodo
-- Grain: 1 fila = 1 docente + 1 periodo
-- Métricas: total_grupos, total_alumnos, promedio_general
-- Usa GROUP BY y HAVING
-- VERIFY: SELECT * FROM vw_teacher_load ORDER BY total_alumnos DESC;

CREATE OR REPLACE VIEW vw_teacher_load AS
SELECT
    t.name_teacher AS docente,
    g.term,
    COUNT(DISTINCT g.id) AS total_grupos,
    COUNT(e.id) AS total_alumnos,
    ROUND(AVG(gr.final), 2) AS promedio_general
FROM teachers t
JOIN groups g ON g.teacher_id = t.id
JOIN enrollments e ON e.group_id = g.id
JOIN grades gr ON gr.enrollment_id = e.id
GROUP BY t.name_teacher, g.term
HAVING COUNT(e.id) > 0;



-- ============================================
-- VIEW: vw_students_at_risk
-- Qué devuelve: Alumnos en riesgo académico
-- Grain: 1 fila = 1 alumno inscrito
-- Métricas: promedio_calificacion, porcentaje_asistencia
-- Usa CTE y CASE
-- VERIFY: SELECT * FROM vw_students_at_risk WHERE program = 'Ingeniería';

CREATE OR REPLACE VIEW vw_students_at_risk AS
WITH attendance_rate AS (
    SELECT
        e.id AS enrollment_id,
        AVG(CASE WHEN a.present THEN 1 ELSE 0 END) AS asistencia
    FROM enrollments e
    LEFT JOIN attendance a ON a.enrollment_id = e.id
    GROUP BY e.id
)
SELECT
    s.name_student,
    s.email,
    s.program,
    ROUND((gr.partial1 + gr.partial2 + gr.final) / 3, 2) AS promedio_calificacion,
    ROUND(asistencia * 100, 2) AS porcentaje_asistencia
FROM enrollments e
JOIN students s ON s.id = e.student_id
JOIN grades gr ON gr.enrollment_id = e.id
JOIN attendance_rate ar ON ar.enrollment_id = e.id
WHERE
    gr.final < 60
    OR asistencia < 0.75;



-- ============================================
-- VIEW: vw_attendance_by_group
-- Qué devuelve: Asistencia promedio por grupo y periodo
-- Grain: 1 fila = 1 grupo
-- Métricas: porcentaje_asistencia
-- Usa CASE y COALESCE
-- VERIFY: SELECT * FROM vw_attendance_by_group ORDER BY porcentaje_asistencia DESC;

CREATE OR REPLACE VIEW vw_attendance_by_group AS
SELECT
    g.id AS group_id,
    g.term,
    ROUND(
        COALESCE(
            AVG(CASE WHEN a.present THEN 1 ELSE 0 END),
            0
        ) * 100,
        2
    ) AS porcentaje_asistencia
FROM groups g
LEFT JOIN enrollments e ON e.group_id = g.id
LEFT JOIN attendance a ON a.enrollment_id = e.id
GROUP BY g.id, g.term;



-- ============================================
-- VIEW: vw_rank_students
-- Qué devuelve: Ranking de alumnos por programa y periodo
-- Grain: 1 fila = 1 alumno
-- Métricas: promedio_final, ranking
-- Usa RANK() OVER (PARTITION BY ...)
-- VERIFY: SELECT * FROM vw_rank_students ORDER BY ranking;

CREATE OR REPLACE VIEW vw_rank_students AS
SELECT
    s.program,
    g.term,
    s.name_student,
    ROUND(AVG(gr.final), 2) AS promedio_final,
    RANK() OVER (
        PARTITION BY s.program, g.term
        ORDER BY AVG(gr.final) DESC
    ) AS ranking
FROM students s
JOIN enrollments e ON e.student_id = s.id
JOIN groups g ON g.id = e.group_id
JOIN grades gr ON gr.enrollment_id = e.id
GROUP BY s.program, g.term, s.name_student;
