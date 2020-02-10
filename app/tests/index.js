const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const expect = chai.expect;

const API_URL = "http://localhost:8080";

chai.use(chaiHttp);

describe("API", () => {
  it("register new students - teacher ken", done => {
    const request = {
      "teacher": "teacherken@gmail.com",
      "students": [
        "studentjon@gmail.com",
        "studenthon@gmail.com",
        "studentmax@gmail.com"
      ]
    };
    chai.request(API_URL)
      .post("/api/register")
      .send(request)
      .end((err, res) => {
        if(err) done(err);
        should.exist(res.body);
        res.should.have.status(204);
        done();
      });
  });

  it("register new students - teacher joe", done => {
    const request = {
      "teacher": "teacherjoe@gmail.com",
      "students": [
        "studentjon@gmail.com",
        "studenthon@gmail.com"
      ]
    };
    chai.request(API_URL)
      .post("/api/register")
      .send(request)
      .end((err, res) => {
        if(err) done(err);
        should.exist(res.body);
        res.should.have.status(204);
        done();
      });
  });

  it("get registered students - teacher ken", done => {
    chai.request(API_URL)
      .get("/api/commonstudents?teacher=teacherken%40gmail.com")
      .end((err, res) => {
        if(err) done(err);
        should.exist(res.body);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("students");
        res.body.students.should.be.a('array');
        const student = res.body.students.pop();
        expect([
          "studentjon@gmail.com",
          "studenthon@gmail.com",
          "studentmax@gmail.com"
        ]).to.include(student);
        done();
      });
  });

  it("get registered students - teacher ken and joe", done => {
    chai.request(API_URL)
      .get("/api/commonstudents?teacher=teacherken%40gmail.com&teacher=teacherjoe%40gmail.com")
      .end((err, res) => {
        if(err) done(err);
        should.exist(res.body);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("students");
        res.body.students.should.be.a('array');
        const student = res.body.students.pop();
        expect([
          "studentjon@gmail.com",
          "studenthon@gmail.com"
        ]).to.include(student);
        done();
      });
  });

  it("suspend student - student max", done => {
    const request = {
      "student": "studentmax@gmail.com"
    };
    chai.request(API_URL)
      .post("/api/suspend")
      .send(request)
      .end((err, res) => {
        if(err) done(err);
        should.exist(res.body);
        res.should.have.status(204);
        done();
      });
  });

  it("suspend student - unknown student max", done => {
    const request = {
      "student": "nobody@gmail.com"
    };
    chai.request(API_URL)
      .post("/api/suspend")
      .send(request)
      .end((err, res) => {
        if(err) done(err);
        should.exist(res.body);
        res.should.have.status(204);
        done();
      });
  });

  it("retrieve notification for students - teacher ken", done => {
    const request = {
      "teacher": "teacherken@gmail.com",
      "notification": "Hello students! @studentjon@gmail.com @studentagnes@gmail.com @studentmiche@gmail.com"
    };
    chai.request(API_URL)
      .post("/api/retrievefornotifications")
      .send(request)
      .end((err, res) => {
        if(err) done(err);
        should.exist(res.body);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("recipients");
        res.body.recipients.should.be.a('array');
        const student = res.body.recipients.pop();
        expect([
          "studentjon@gmail.com",
          "studenthon@gmail.com",
          "studentagnes@gmail.com",
          "studentmiche@gmail.com"
        ]).to.include(student);
        done();
      });
  });
});