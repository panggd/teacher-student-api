const suspendStudent = (req, res) => {
  res.append('Content-Type', 'application/json');
  try {
    const student = req.body.student;
    console.log(student);

    // save to mysql database

    res.status(204);
  } catch(error) {
    res.status(500);
  }
  res.send();
};

module.exports = suspendStudent;