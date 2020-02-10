const express = require('express');
const bodyParser = require('body-parser');

const registerStudent = require('./services/register-student');
const commonStudents = require('./services/common-students');
const suspendStudent = require('./services/suspend-student');
const retrieveforNotifications = require('./services/retrieve-notifications');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/register', async (req, res) => await registerStudent(req, res));
app.get('/api/commonstudents', async (req, res) => await commonStudents(req, res));
app.post('/api/suspend', async (req, res) => await suspendStudent(req, res));
app.post('/api/retrievefornotifications', async (req, res) => await retrieveforNotifications(req, res));

app.listen(port, () => console.log(`API server listening on port ${port}!`));