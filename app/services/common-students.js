const { getDBConnection } = require('../config/connection');

const commonStudent = async (req, res) => {
  let conn = null;
  let results = {
    "students": []
  };
  try {
    let teachers = req.query.teacher;
    if (typeof teachers === 'string') {
      teachers = [teachers];
    }

    conn = await getDBConnection();

    let sql = 'select t0.student_email from ';
    teachers.forEach((teacher, i) => {
      if(i == 0) {
        sql += `(select student_email from teacher_student where teacher_email=?) t${i} `;
      } else {
        sql += `inner join (select student_email from teacher_student where teacher_email=?) t${i} on t${i-1}.student_email = t${i}.student_email `;
      }
    });

    const [rows] = await conn.execute(sql.trim(), teachers);
    rows.forEach((row) => {
      results.students.push(row.student_email);
    });

    res.status(200);
  } catch(error) {
    console.error(error, error.stack);
    results = {"message":
      "Sorry, we have failed to fetch the students records " +
      "at the moment due to internal server error."};
    res.status(500);
  } finally {
    if(conn) conn.end();
  }
  res.append('Content-Type', 'application/json');
  res.send(results);
};

module.exports = commonStudent;