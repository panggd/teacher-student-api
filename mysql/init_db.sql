ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'test';
FLUSH PRIVILEGES;

USE school;

CREATE TABLE teachers (
    email VARCHAR(50),
    PRIMARY KEY (email)
);

CREATE TABLE students (
    email VARCHAR(50),
    is_suspend INTEGER(1),
    PRIMARY KEY (email)
);

CREATE TABLE teacher_student (
    id INTEGER AUTO_INCREMENT,
    teacher_email VARCHAR(50),
    student_email VARCHAR(50),
    PRIMARY KEY (id)
);