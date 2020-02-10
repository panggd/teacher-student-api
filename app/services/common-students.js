const commonStudent = (req, res) => {
  res.append('Content-Type', 'application/json');
  try {
    const teacher = req.query.teacher;
    console.log(teacher);

    // save to mysql database

    res.status(200);
  } catch(error) {
    res.status(500);
  }
  res.send();
};

module.exports = commonStudent;