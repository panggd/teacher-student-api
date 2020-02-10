const { getDBConnection } = require('../config/connection');

const suspendStudent = async (req, res) => {
  let conn = null;
  let results = {};

  try {
    const student = req.body.student;

    conn = await getDBConnection();

    let sql = 'update ignore students set is_suspend=1 where email = ?';
    await conn.execute(sql, [student]);

    res.status(204);
  } catch(error) {
    console.error(error, error.stack);
    results = {"message": "Sorry, we have failed to suspend this student record."};
    res.status(500);
  } finally {
    if(conn) conn.end();
  }

  res.append('Content-Type', 'application/json');
  res.send(results);
};

module.exports = suspendStudent;