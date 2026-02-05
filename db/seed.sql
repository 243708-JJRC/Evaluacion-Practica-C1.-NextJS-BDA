-- STUDENTS
INSERT INTO students (name_student, email, program, enrollment_year) VALUES
('Carlos Ruiz', 'carlos.ruiz@univ.edu', 'Ingeniería de Software', 2024),
('Ana Beltrán', 'ana.beltran@univ.edu', 'Ciberseguridad', 2023),
('Luis Méndez', 'luis.mendez@univ.edu', 'Inteligencia Artificial', 2025),
('Elena Gómez', 'elena.gomez@univ.edu', 'Ingeniería de Software', 2024),
('Diego Torres', 'diego.torres@univ.edu', 'Ciberseguridad', 2024),
('Claudia Rivas', 'claudia.rivas@univ.edu', 'Sistemas Digitales', 2023),
('Fernando Paz', 'fernando.paz@univ.edu', 'Inteligencia Artificial', 2025),
('Gloria Soler', 'gloria.soler@univ.edu', 'Ingeniería de Software', 2024),
('Hugo Herrera', 'hugo.herrera@univ.edu', 'Ciberseguridad', 2025),
('Isabel Luna', 'isabel.luna@univ.edu', 'Sistemas Digitales', 2024);


-- TEACHERS
INSERT INTO teachers (name_teacher, email) VALUES
('Dr. Roberto Frausto', 'rfrausto@univ.edu'),
('Dra. Silvia Pinal', 'spinal@univ.edu'),
('Mtro. Arturo Pérez', 'aperez@univ.edu'),
('Ing. Laura Casillas', 'lcasillas@univ.edu'),
('Dra. Mónica Galindo', 'mgalindo@univ.edu'),
('Dr. Julián Quiroga', 'jquiroga@univ.edu'),
('Mtra. Beatriz Adriana', 'badriana@univ.edu'),
('Ing. Samuel García', 'sgarcia@univ.edu'),
('Dr. Octavio Paz', 'opaz@univ.edu'),
('Mtra. Martha Higareda', 'mhigareda@univ.edu');



-- COURSES
INSERT INTO courses (code, name_course, credits) VALUES
('CS101', 'Introducción a la Programación', 6),
('DB201', 'Bases de Datos Avanzadas', 5),
('SEC301', 'Criptografía', 4),
('AI401', 'Machine Learning', 7),
('NET501', 'Protocolos de Red', 5),
('SO601', 'Sistemas Operativos', 6),
('WEB701', 'Desarrollo Web Fullstack', 6),
('ALG801', 'Algoritmos y Estructuras', 5),
('MAT901', 'Cálculo Multivariado', 4),
('EST102', 'Estadística Descriptiva', 4);



-- GROUPS
INSERT INTO groups (course_id, teacher_id, term) VALUES
(1, 1, 'Enero-Abril'), (2, 2, 'Enero-Abril'),
(3, 3, 'Mayo-Agosto'), (4, 4, 'Mayo-Agosto'),
(5, 5, 'Septiembre-Diciembre'), (6, 6, 'Septiembre-Diciembre'),
(7, 7, 'Enero-Abril'), (8, 8, 'Mayo-Agosto'),
(9, 9, 'Septiembre-Diciembre'), (10, 10, 'Enero-Abril');



-- ENROLLMENTS
INSERT INTO enrollments (student_id, group_id, enrollet_at) VALUES
(1, 1, '2026-01-10'), (2, 2, '2026-01-11'),
(3, 3, '2026-05-05'), (4, 4, '2026-05-06'),
(5, 5, '2025-09-01'), (6, 6, '2025-09-02'),
(7, 7, '2026-01-12'), (8, 8, '2026-05-07'),
(9, 9, '2025-09-03'), (10, 10, '2026-01-13');



-- GRADES
INSERT INTO grades (enrollment_id, partial1, partial2, final) VALUES
(1, 8.5, 9.2, 8.9), (2, 7.0, 7.5, 7.3),
(3, 9.8, 10.0, 9.9), (4, 6.5, 8.0, 7.3),
(5, 8.0, 8.0, 8.0), (6, 9.0, 8.5, 8.8),
(7, 7.5, 7.0, 7.2), (8, 10.0, 9.5, 9.7),
(9, 5.5, 6.0, 5.8), (10, 8.8, 9.0, 8.9);



-- ATTENDANCE
INSERT INTO attendance (enrollment_id, date, present) VALUES
(1, '2026-02-01 08:00:00', TRUE), (2, '2026-02-01 09:00:00', TRUE),
(3, '2026-06-15 10:00:00', FALSE), (4, '2026-06-15 11:00:00', TRUE),
(5, '2025-10-10 07:00:00', TRUE), (6, '2025-10-10 08:00:00', TRUE),
(7, '2026-02-02 08:00:00', FALSE), (8, '2026-06-16 09:00:00', TRUE),
(9, '2025-10-11 10:00:00', TRUE), (10, '2026-02-02 11:00:00', TRUE);