const registerStudent = (req, res) => {
  res.append('Content-Type', 'application/json');
  try {
    const teacher = req.body.teacher;
    const students = req.body.students;
    console.log([teacher, students]);

    // save to mysql database

    res.status(204);
  } catch(error) {
    res.status(500);
  }
  res.send();
};

module.exports = registerStudent;