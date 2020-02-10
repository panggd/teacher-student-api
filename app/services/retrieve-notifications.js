const { getDBConnection } = require('../config/connection');

const retrieveforNotifications = async (req, res) => {
  let conn = null;
  let results = {
    "recipients": []
  };
  try {
    const teacher = req.body.teacher;
    const notification = req.body.notification;

    const set = new Set();

    const regex = /@\S+@\S+\.\S+/g;
    notification.match(regex).forEach((email) => {
      set.add(email.substring(1));
    });

    conn = await getDBConnection();

    let sql = `
      select a.student_email
        from
      teacher_student a
        inner join
      students b
        on a.student_email = b.email
        and a.teacher_email = ?
        and b.is_suspend = 0
      `;

    const [rows] = await conn.execute(sql, [teacher]);
    rows.forEach((row) => {
      set.add(row.student_email);
    });

    results.recipients = [...set];

    res.status(200);
  } catch(error) {
    console.error(error, error.stack);
    results = {"message":
      "Sorry, we have failed to retrieve " +
      "the students who receive the notification."};
    res.status(500);
  } finally {
    if(conn) conn.end();
  }
  res.append('Content-Type', 'application/json');
  res.send(results);
};

module.exports = retrieveforNotifications;