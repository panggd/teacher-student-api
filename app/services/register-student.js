const { getDBConnection } = require('../config/connection');

const registerStudent = async (req, res) => {
  let conn = null;
  let results = {};
  try {
    const teacher = req.body.teacher;
    const students = req.body.students;

    conn = await getDBConnection();

    // Add teacher, ignore error if exist
    let sql = 'insert ignore into teachers (email) values (?)';
    await conn.execute(sql, [teacher]);

    // Add student, ignore error if exist
    students.forEach(async (student) => {
      sql = 'insert ignore into students (email, is_suspend) values (?, ?);';
      await conn.execute(sql, [student, 0]);
    });

    // Add student, ignore error if exist
    students.forEach(async (student) => {
      sql = 'insert ignore into teacher_student (teacher_email, student_email) values (?, ?);';
      await conn.execute(sql, [teacher, student]);
    });

    res.status(204);
  } catch(error) {
    console.error(error, error.stack);
    results = {"message":
      "Sorry, we have failed to register your record " +
      "at the moment due to internal server error"};
    res.status(500);
  } finally {
    if(conn) conn.end();
  }

  res.append('Content-Type', 'application/json');
  res.send(results);
};

module.exports = registerStudent;