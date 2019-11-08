require('dotenv/config');
const app = require('../api/main/app');
const request = require('supertest');
const { expect } = require('chai');

describe('Agent Users API', () => {
  let user = {
    firstName: 'Test',
    lastName: 'Tester',
    password: 'admin',
    email: 'test@affinity.com',
    isAdmin: true
  };
  let fakeUser = {
    firstName: 'fakeFirstName',
    lastName: 'fakeLastName',
    email: 'fake@email.com',
    password: 'fakePassword',
    isAdmin: true
  };

  before(async () => {
    await require('../api/main/db');
    const response = await request(app)
      .post('/api/auth/token')
      .send({
        email: user.email,
        password: user.password
      });
    user = response.body;
  });

  it('Successful Sign-in:', async () => {
    expect(user).to.be.an('object').that.is.not.empty;
    expect(user).to.have.own.property('id', user.id, 'Auth user id is invalid');
    expect(user).to.have.own.property(
      'firstName',
      user.firstName,
      'Auth user firstname is invalid'
    );
    expect(user).to.have.own.property(
      'lastName',
      user.lastName,
      'Auth user lastName is invalid'
    );
    expect(user).to.have.own.property(
      'email',
      user.email,
      'Auth user email is invalid'
    );
    expect(user).to.have.own.property(
      'isAdmin',
      user.isAdmin,
      'Auth user isAdmin is invalid'
    );
    expect(user).to.have.own.property('token').that.is.not.empty.that.is.a
      .string;
  });

  it('Create New Fake User Agent', async () => {
    const { body } = await request(app)
      .post('/api/users')
      .set('Authorization', 'Bearer ' + user.token)
      .field('firstName', fakeUser.firstName)
      .field('lastName', fakeUser.lastName)
      .field('email', fakeUser.email)
      .field('password', fakeUser.password)
      .field('isAdmin', fakeUser.isAdmin)
      .expect(200);

    // Response data should not have 'password' and '__v' properties
    expect(body).to.not.have.own.property('password');
    expect(body).to.not.have.own.property('__v');

    // Response data should generate an '_id', 'createdDate', 'imageID' and 'mediaURL' properties
    expect(body).to.have.own.property(
      '_id',
      body._id,
      'created user does not have property _id'
    ).that.is.not.empty.that.is.a.string;

    expect(body)
      .to.have.own.property(
        'createdDate',
        body.createdDate,
        'created user does not have a createdDate property'
      )
      .that.is.not.empty.that.is.an.instanceof(Date);

    expect(body).to.have.own.property(
      'imageID',
      body.imageID,
      'created user does not have an imageID property'
    ).that.is.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'mediaURL',
      body.mediaURL,
      'created user does not have a mediaURL property'
    ).that.is.empty.that.is.a.string;

    fakeUser._id = body._id;
    fakeUser.createdDate = body.createdDate;
    fakeUser.imageID = body.imageID;
    fakeUser.mediaURL = body.mediaURL;

    // Response data should have 'isAdmin', 'firstName', 'lastName', and 'email' properties
    expect(body).to.have.own.property(
      'isAdmin',
      fakeUser.isAdmin,
      'created user does not have property isAdmin'
    ).that.is.true;
    expect(body).to.have.own.property(
      'firstName',
      fakeUser.firstName,
      'created user does not have property firstName'
    ).that.is.not.empty.that.is.a.string;
    expect(body).to.have.own.property(
      'lastName',
      fakeUser.lastName,
      'created user does not have property lastName'
    ).that.is.not.empty.that.is.a.string;
    expect(body).to.have.own.property(
      'email',
      fakeUser.email,
      'created user does not have an email property'
    ).that.is.not.empty.that.is.a.string;
  });

  it('Get All User Agents', async () => {
    const { body } = await request(app)
      .get('/api/users')
      .set('Authorization', 'Bearer ' + user.token)
      .expect(200);

    expect(body).to.be.an('array');
  });

  it('Get New Fake User Agent', async () => {
    const { body } = await request(app)
      .get('/api/users/' + fakeUser._id)
      .set('Authorization', 'Bearer ' + user.token)
      .expect(200);

    // Response data should have '_id', 'createdDate', 'imageID', 'mediaURL', 'isAdmin', 'firstName', 'lastName', and 'email' properties
    expect(body).to.have.own.property(
      '_id',
      fakeUser._id,
      'get user does not have property _id'
    ).that.is.not.empty.that.is.a.string;

    expect(body)
      .to.have.own.property(
        'createdDate',
        fakeUser.createdDate,
        'get user does not have a createdDate property'
      )
      .that.is.not.empty.that.is.an.instanceof(Date);

    expect(body).to.have.own.property(
      'imageID',
      fakeUser.imageID,
      'get user does not have an imageID property'
    ).that.is.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'mediaURL',
      fakeUser.mediaURL,
      'get user does not have a mediaURL property'
    ).that.is.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'isAdmin',
      fakeUser.isAdmin,
      'get user does not have property isAdmin'
    ).that.is.true;

    expect(body).to.have.own.property(
      'firstName',
      fakeUser.firstName,
      'get user does not have property firstName'
    ).that.is.not.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'lastName',
      fakeUser.lastName,
      'get user does not have property lastName'
    ).that.is.not.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'email',
      fakeUser.email,
      'get user does not have an email property'
    ).that.is.not.empty.that.is.a.string;
  });

  it('Update Fake User Agent', async () => {
    const fakeUserChanges = {
      firstName: 'changedFirst',
      lastName: 'changedLast',
      email: 'changedEmail',
      imageID: 'newImageID',
      mediaURL: 'newMediaURL',
      isAdmin: true
    };
    const { body } = await request(app)
      .patch('/api/users/' + fakeUser._id)
      .set('Authorization', 'Bearer ' + user.token)
      .send(fakeUserChanges)
      .expect(200);

    // Response data should not have 'password' and '__v' properties
    expect(body).to.not.have.own.property('password');
    expect(body).to.not.have.own.property('__v');

    // Response data should not have changed '_id' and 'createdDate'
    expect(body).to.have.own.property(
      '_id',
      fakeUser._id,
      'changed user does not have property _id'
    ).that.is.not.empty.that.is.a.string;

    expect(body)
      .to.have.own.property(
        'createdDate',
        fakeUser.createdDate,
        'changed user does not have a createdDate property'
      )
      .that.is.not.empty.that.is.an.instanceof(Date);

    // Response data should have changed 'imageID', 'mediaURL', 'isAdmin', 'firstName', 'lastName', and 'email' properties
    expect(body).to.have.own.property(
      'imageID',
      fakeUserChanges.imageID,
      'changed user does not have an imageID property'
    ).that.is.not.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'mediaURL',
      fakeUserChanges.mediaURL,
      'changed user does not have a mediaURL property'
    ).that.is.not.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'isAdmin',
      fakeUserChanges.isAdmin,
      'changed user does not have property isAdmin'
    ).that.is.true;

    expect(body).to.have.own.property(
      'firstName',
      fakeUserChanges.firstName,
      'changed user does not have property firstName'
    ).that.is.not.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'lastName',
      fakeUserChanges.lastName,
      'changed user does not have property lastName'
    ).that.is.not.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'email',
      fakeUserChanges.email,
      'changed user does not have an email property'
    ).that.is.not.empty.that.is.a.string;

    fakeUser = body;
  });

  it('Delete New Fake User Agent', async () => {
    const { body } = await request(app)
      .delete('/api/users/' + fakeUser._id)
      .set('Authorization', 'Bearer ' + user.token)
      .expect(200);

    // Response data should not have 'password' and '__v' properties
    expect(body).to.not.have.own.property('password');
    expect(body).to.not.have.own.property('__v');

    // Response data should have '_id', 'createdDate', 'imageID', 'mediaURL', 'isAdmin', 'firstName', 'lastName', and 'email' properties
    expect(body).to.have.own.property(
      '_id',
      fakeUser._id,
      'deleted user does not have property _id'
    ).that.is.not.empty.that.is.a.string;

    expect(body)
      .to.have.own.property(
        'createdDate',
        fakeUser.createdDate,
        'deleted user does not have a createdDate property'
      )
      .that.is.not.empty.that.is.an.instanceof(Date);

    expect(body).to.have.own.property(
      'imageID',
      fakeUser.imageID,
      'deleted user does not have an imageID property'
    ).that.is.not.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'mediaURL',
      fakeUser.mediaURL,
      'deleted user does not have a mediaURL property'
    ).that.is.not.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'isAdmin',
      fakeUser.isAdmin,
      'deleted user does not have property isAdmin'
    ).that.is.true;

    expect(body).to.have.own.property(
      'firstName',
      fakeUser.firstName,
      'deleted user does not have property firstName'
    ).that.is.not.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'lastName',
      fakeUser.lastName,
      'deleted user does not have property lastName'
    ).that.is.not.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'email',
      fakeUser.email,
      'deleted user does not have an email property'
    ).that.is.not.empty.that.is.a.string;
  });

  after(() => {});
});
