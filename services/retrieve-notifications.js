const retrieveforNotifications = (req, res) => {
  res.append('Content-Type', 'application/json');
  try {
    const teacher = req.body.teacher;
    const notification = req.body.notification;
    console.log([teacher, notification]);

    // save to mysql database

    res.status(204);
  } catch(error) {
    res.status(500);
  }
  res.send();
};

module.exports = retrieveforNotifications;