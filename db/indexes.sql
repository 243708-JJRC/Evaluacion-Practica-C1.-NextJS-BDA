-- Filtros por programa
CREATE INDEX idx_students_program
ON students (program);

-- Filtros por periodo
CREATE INDEX idx_groups_term
ON groups (term);

-- JOIN frecuente enrollments → grades
CREATE INDEX idx_grades_enrollment
ON grades (enrollment_id);