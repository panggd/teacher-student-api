const registerStudent = (req, res) => {
  res.append('Content-Type', 'application/json');
  try {
    const teacher = req.body.teacher;
    const students = req.body.students;
    console.log([teacher, students]);

    // save to mysql database
    const con = mysql.createConnection({
      host: process.env.DATABASE_HOST || '127.0.0.1',
      user: 'root',
      password: 'test',
      database: 'school',
      port: 3306,
      insecureAuth : true
    });

    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });

    res.status(204);
  } catch(error) {
    res.status(500);
  }
  res.send();
};

module.exports = registerStudent;