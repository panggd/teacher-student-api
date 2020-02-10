const express = require('express');
const bodyParser = require('body-parser');

const registerStudent = require('./services/register-student');
const commonStudents = require('./services/common-students');
const suspendStudent = require('./services/suspend-student');
const retrieveforNotifications = require('./services/retrieve-notifications');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/register', (req, res) => registerStudent(req, res));
app.get('/api/commonstudents', (req, res) => commonStudents(req, res));
app.post('/api/suspend', (req, res) => suspendStudent(req, res));
app.post('/api/retrievefornotifications', (req, res) => retrieveforNotifications(req, res));

app.listen(port, () => console.log(`API server listening on port ${port}!`));