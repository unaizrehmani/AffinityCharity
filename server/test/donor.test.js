const app = require('../api/main/app');
const request = require('supertest');
const { expect } = require('chai');

describe('Donor Api', () => {
  let donor = {
    firstName: 'donorFirst',
    lastName: 'donorLast',
    email: 'donor@donor.com',
    phone: '5555555555',
    address: '366 Oaklawn Crescent'
  };

  const fakeCause = {
    name: 'Rami Aid',
    location: 'Ottawa',
    deleteable: true,
    description: 'Charity for Rami because he needs money.'
  };

  let user = {
    password: 'admin',
    email: 'test@affinity.com'
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

  it('POST a new cause', async () => {
    const { body } = await request(app)
      .post('/api/causes')
      .set('Authorization', 'Bearer ' + user.token)
      .field('name', fakeCause.name)
      .field('location', fakeCause.location)
      .field('deleteable', fakeCause.deleteable)
      .field('description', fakeCause.description)
      .expect(200);

    expect(body).to.be.an('object').that.is.not.empty;

    fakeCause._id = body._id;
    fakeCause.createdDate = body.createdDate;
    fakeCause.defaultDesign = body.defaultDesign;
    fakeCause.imageID = body.imageID;
    fakeCause.mediaURL = body.mediaURL;
    fakeCause.donors = body.donors;
  });

  it('Create New Donor', async () => {
    setTimeout(1000);
    const { body } = await request(app)
      .post('/api/donors')
      .set('Authorization', 'Bearer ' + user.token)
      .field('firstName', donor.firstName)
      .field('lastName', donor.lastName)
      .field('email', donor.email)
      .field('address', donor.address)
      .field('phone', donor.phone)
      .field('causeId', fakeCause._id)
      .expect(200);

    // Response data should generate an '_id', 'causes', 'createdDate' properties

    expect(body).to.have.own.property(
      '_id',
      body._id,
      'created donor does not have property _id'
    ).that.is.not.empty.that.is.a.string;

    expect(body)
      .to.have.own.property(
        'createdDate',
        body.createdDate,
        'created donor does not have a createdDate property'
      )
      .that.is.not.empty.that.is.an.instanceof(Date);

    expect(body)
      .to.have.own.property(
        'causes',
        body.causes,
        'created donor does not have property causes'
      )
      .that.is.an('array');

    donor._id = body._id;
    donor.createdDate = body.createdDate;
    donor.causes = body.causes;

    // Response data should have 'firstName', 'lastName', 'phone', 'address' and 'email' properties
    expect(body).to.have.own.property(
      'phone',
      donor.phone,
      'created donor does not have property phone'
    ).that.is.not.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'firstName',
      donor.firstName,
      'created donor does not have property firstName'
    ).that.is.not.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'lastName',
      donor.lastName,
      'created donor does not have property lastName'
    ).that.is.not.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'email',
      donor.email,
      'created donor does not have an email property'
    ).that.is.not.empty.that.is.a.string;
  });

  it('Get All New Donors', async () => {
    const { body } = await request(app)
      .get('/api/donors')
      .set('Authorization', 'Bearer ' + user.token)
      .expect(200);

    expect(body).to.be.an('array');
  });

  it('Get New Fake Donor', async () => {
    const { body } = await request(app)
      .get('/api/donors/' + donor._id)
      .set('Authorization', 'Bearer ' + user.token)
      .expect(200);

    // Response data should have '_id', 'createdDate', 'firstName', 'lastName', 'phone', 'address', 'causes' and 'email' properties
    expect(body).to.have.own.property(
      '_id',
      donor._id,
      'get donor does not have property _id'
    ).that.is.not.empty.that.is.a.string;

    expect(body)
      .to.have.own.property(
        'causes',
        body.causes,
        'get donor does not have property causes'
      )
      .that.is.an('array');

    expect(body).to.have.own.property(
      'address',
      donor.address,
      'get donor does not have property address'
    ).that.is.not.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'phone',
      donor.phone,
      'get donor does not have property phone'
    ).that.is.not.empty.that.is.a.string;

    expect(body)
      .to.have.own.property(
        'createdDate',
        donor.createdDate,
        'get donor does not have a createdDate property'
      )
      .that.is.not.empty.that.is.an.instanceof(Date);

    expect(body).to.have.own.property(
      'firstName',
      donor.firstName,
      'get donor does not have property firstName'
    ).that.is.not.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'lastName',
      donor.lastName,
      'get donor does not have property lastName'
    ).that.is.not.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'email',
      donor.email,
      'get donor does not have an email property'
    ).that.is.not.empty.that.is.a.string;
  });

  it('Update Fake Donor', async () => {
    const fakeDonorChanges = {
      firstName: 'changedFirst',
      lastName: 'changedLast',
      email: 'changedEmail',
      address: 'changedAddress',
      phone: '123456789',
      causes: []
    };

    const { body } = await request(app)
      .patch('/api/donors/' + donor._id)
      .set('Authorization', 'Bearer ' + user.token)
      .send(fakeDonorChanges)
      .expect(200);

    // Response data should not have changed '_id' and 'createdDate'
    expect(body).to.have.own.property(
      '_id',
      donor._id,
      'changed donor does not have property _id'
    ).that.is.not.empty.that.is.a.string;

    expect(body)
      .to.have.own.property(
        'createdDate',
        donor.createdDate,
        'changed donor does not have a createdDate property'
      )
      .that.is.not.empty.that.is.an.instanceof(Date);

    // Response data should have 'firstName', 'lastName', 'phone', 'address', 'causes' and 'email' properties
    expect(body).to.have.own.property(
      'firstName',
      fakeDonorChanges.firstName,
      'changed donor does not have property firstName'
    ).that.is.not.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'lastName',
      fakeDonorChanges.lastName,
      'changed donor does not have property lastName'
    ).that.is.not.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'email',
      fakeDonorChanges.email,
      'changed donor does not have an email property'
    ).that.is.not.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'address',
      fakeDonorChanges.address,
      'get donor does not have property address'
    ).that.is.not.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'phone',
      fakeDonorChanges.phone,
      'get donor does not have property phone'
    ).that.is.not.empty.that.is.a.string;

    expect(body)
      .to.have.own.property('causes')
      .that.is.an('array');

    donor = body;
  });

  it('Delete New Fake Donor', async () => {
    const { body } = await request(app)
      .delete('/api/donors/' + donor._id)
      .set('Authorization', 'Bearer ' + user.token)
      .expect(200);

    // Response data should have '_id', 'createdDate', 'firstName', 'lastName', 'phone', 'address', 'causes' and 'email' properties
    expect(body).to.have.own.property(
      '_id',
      donor._id,
      'get donor does not have property _id'
    ).that.is.not.empty.that.is.a.string;

    expect(body)
      .to.have.own.property(
        'causes',
        body.causes,
        'get donor does not have property causes'
      )
      .that.is.an('array');

    expect(body).to.have.own.property(
      'address',
      donor.address,
      'get donor does not have property address'
    ).that.is.not.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'phone',
      donor.phone,
      'get donor does not have property phone'
    ).that.is.not.empty.that.is.a.string;

    expect(body)
      .to.have.own.property(
        'createdDate',
        donor.createdDate,
        'get donor does not have a createdDate property'
      )
      .that.is.not.empty.that.is.an.instanceof(Date);

    expect(body).to.have.own.property(
      'firstName',
      donor.firstName,
      'get donor does not have property firstName'
    ).that.is.not.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'lastName',
      donor.lastName,
      'get donor does not have property lastName'
    ).that.is.not.empty.that.is.a.string;

    expect(body).to.have.own.property(
      'email',
      donor.email,
      'get donor does not have an email property'
    ).that.is.not.empty.that.is.a.string;
  });

  it('DELETE the new fake cause', async () => {
    await request(app)
      .delete('/api/causes/' + fakeCause._id)
      .set('Authorization', 'Bearer ' + user.token)
      .expect(200);
  });
});
