require('dotenv/config');
const app = require('../api/main/app');
const request = require('supertest');
const { expect } = require('chai');

describe('Admin Users API', () => {
  let user = {
    id: '5daa663ad5a1a22fdb968a8a',
    firstName: 'Unaiz',
    lastName: 'Rehmani',
    password: 'password',
    email: 'unaizrehmani@gmail.com',
    isAdmin: true
  };
  const fakeUser = {
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email@email.com',
    password: 'password',
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

  it('Insert a New Agent Without Image', async () => {
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
        'new user does not have a createdDate property'
      )
      .that.is.not.empty.that.is.an.instanceof(Date);

    expect(body).to.have.own.property(
      'imageID',
      body.imageID,
      'new user does not have an imageID property'
    ).that.is.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'mediaURL',
      body.mediaURL,
      'new user does not have a mediaURL property'
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
    );
    expect(body).to.have.own.property(
      'firstName',
      fakeUser.firstName,
      'created user does not have property firstName'
    );
    expect(body).to.have.own.property(
      'lastName',
      fakeUser.lastName,
      'created user does not have property lastName'
    );
    expect(body).to.have.own.property(
      'email',
      fakeUser.email,
      'new user does not have an email property'
    );
  });

  it('GET All Users', async () => {
    await request(app)
      .get('/api/users')
      .set('Authorization', 'Bearer ' + user.token)
      .expect(200);
  });

  it('GET Newly Created Fake User', async () => {
    const { body } = await request(app)
      .get('/api/users/' + fakeUser._id)
      .set('Authorization', 'Bearer ' + user.token)
      .expect(200);

    // Response data should have '_id', 'createdDate', 'imageID', 'mediaURL', 'isAdmin', 'firstName', 'lastName', and 'email' properties
    expect(body).to.have.own.property(
      '_id',
      fakeUser._id,
      'created user does not have property _id'
    ).that.is.not.empty.that.is.a.string;

    expect(body)
      .to.have.own.property(
        'createdDate',
        fakeUser.createdDate,
        'new user does not have a createdDate property'
      )
      .that.is.not.empty.that.is.an.instanceof(Date);

    expect(body).to.have.own.property(
      'imageID',
      fakeUser.imageID,
      'fake user does not have an imageID property'
    ).that.is.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'mediaURL',
      fakeUser.mediaURL,
      'new user does not have a mediaURL property'
    ).that.is.empty.that.is.a.string;

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
      'new user does not have an email property'
    ).that.is.not.empty.that.is.a.string;
  });

  // TODO: implement PATCH /api/users test
  it('PATCH /api/users/:userID', async () => {});

  it('DELETE /api/users/:userID', async () => {
    const { body } = await request(app)
      .delete('/api/users/' + fakeUser._id)
      .set('Authorization', 'Bearer ' + user.token)
      .expect(200);

    // Response data should have '_id', 'createdDate', 'imageID', 'mediaURL', 'isAdmin', 'firstName', 'lastName', and 'email' properties
    expect(body).to.not.have.own.property('password');
    expect(body).to.not.have.own.property('__v');

    // Response data should have '_id', 'createdDate', 'imageID', 'mediaURL', 'isAdmin', 'firstName', 'lastName', and 'email' properties
    expect(body).to.have.own.property(
      '_id',
      fakeUser._id,
      'created user does not have property _id'
    ).that.is.not.empty.that.is.a.string;

    expect(body)
      .to.have.own.property(
        'createdDate',
        fakeUser.createdDate,
        'new user does not have a createdDate property'
      )
      .that.is.not.empty.that.is.an.instanceof(Date);

    expect(body).to.have.own.property(
      'imageID',
      fakeUser.imageID,
      'fake user does not have an imageID property'
    ).that.is.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'mediaURL',
      fakeUser.mediaURL,
      'new user does not have a mediaURL property'
    ).that.is.empty.that.is.a.string;

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
      'new user does not have an email property'
    ).that.is.not.empty.that.is.a.string;
  });

  after(() => {});
});
