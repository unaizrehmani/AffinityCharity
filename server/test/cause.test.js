require('dotenv/config');
const app = require('../api/main/app');
const request = require('supertest');
const { expect } = require('chai');

describe('Test Causes API', () => {
  let user = {
    password: 'admin',
    email: 'test@affinity.com'
  };

  let fakeCause = {
    name: 'Rami Aid',
    location: 'Ottawa',
    deleteable: true,
    description: 'Charity for Rami because he needs money.'
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

  it('GET all causes', async () => {
    await require('../api/main/db');
    const response = await request(app).get('/api/causes');
    expect(response.body).to.be.an('array').that.is.not.empty;
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

    expect(body).to.have.own.property('_id', fakeCause._id, 'id is incorrect')
      .that.is.not.empty.that.is.a.string;
    expect(body)
      .to.have.own.property('donors', fakeCause.donors, 'donors is incorrect')
      .to.be.an('array').that.is.empty;
    expect(body).to.have.own.property(
      'name',
      fakeCause.name,
      'name is incorrect'
    ).that.is.not.empty.that.is.a.string;
    expect(body).to.have.own.property(
      'location',
      fakeCause.location,
      'location is incorrect'
    ).that.is.not.empty.that.is.a.string;
    expect(body).to.have.own.property(
      'deleteable',
      fakeCause.deleteable,
      'deleteable is incorrect'
    );
    expect(body).to.have.own.property(
      'description',
      fakeCause.description,
      'description is incorrect'
    ).that.is.not.empty.that.is.a.string;
    expect(body)
      .to.have.own.property(
        'createdDate',
        fakeCause.createdDate,
        'createdDate is incorrect'
      )
      .that.is.not.empty.that.is.an.instanceof(Date);
    expect(body)
      .to.have.own.property(
        'defaultDesign',
        fakeCause.defaultDesign,
        'defaultDesign is incorrect'
      )
      .to.be.an('object').that.is.not.empty;
    expect(body).to.have.own.property(
      'imageID',
      fakeCause.imageID,
      'imageID is incorrect'
    ).that.is.empty.that.is.a.string;
    expect(body).to.have.own.property(
      'mediaURL',
      fakeCause.mediaURL,
      'mediaURL is incorrect'
    ).that.is.empty.that.is.a.string;
  });

  it('GET the new cause by ID', async () => {
    await require('../api/main/db');
    const { body } = await request(app)
      .get('/api/causes/' + fakeCause._id)
      .set('Authorization', 'Bearer ' + user.token)
      .expect(200);

    expect(body).to.be.an('object').that.is.not.empty;

    expect(body).to.have.own.property('_id', fakeCause._id, 'id is incorrect')
      .that.is.not.empty.that.is.a.string;
    expect(body)
      .to.have.property('donors')
      .to.deep.equal(fakeCause.donors)
      .to.be.an('array').that.is.empty;
    expect(body).to.have.own.property(
      'name',
      fakeCause.name,
      'name is incorrect'
    ).that.is.not.empty.that.is.a.string;
    expect(body).to.have.own.property(
      'location',
      fakeCause.location,
      'location is incorrect'
    ).that.is.not.empty.that.is.a.string;
    expect(body).to.have.own.property(
      'deleteable',
      fakeCause.deleteable,
      'deleteable is incorrect'
    );
    expect(body).to.have.own.property(
      'description',
      fakeCause.description,
      'description is incorrect'
    ).that.is.not.empty.that.is.a.string;
    expect(body)
      .to.have.own.property(
        'createdDate',
        fakeCause.createdDate,
        'createdDate is incorrect'
      )
      .that.is.not.empty.that.is.an.instanceof(Date);
    expect(body)
      .to.have.property('defaultDesign')
      .to.deep.equal(fakeCause.defaultDesign)
      .to.be.an('object').that.is.not.empty;
    expect(body).to.have.own.property(
      'imageID',
      fakeCause.imageID,
      'imageID is incorrect'
    ).that.is.empty.that.is.a.string;
    expect(body).to.have.own.property(
      'mediaURL',
      fakeCause.mediaURL,
      'mediaURL is incorrect'
    ).that.is.empty.that.is.a.string;
  });

  it('Update new cause', async () => {
    const fakeCauseChanges = {
      description: 'Rami requires assistance'
    };
    const { body } = await request(app)
      .patch('/api/causes/' + fakeCause._id)
      .set('Authorization', 'Bearer ' + user.token)
      .send(fakeCauseChanges)
      .expect(200);

    expect(body).to.be.an('object').that.is.not.empty;

    // Check if updated field has been updated
    expect(body)
      .to.have.property('description')
      .that.is.not.deep.equal('Charity for Rami because he needs money.').that
      .is.not.empty.that.is.a.string;
    expect(body.description).to.be.deep.equal(fakeCauseChanges.description);

    // Check rest of the unchanged attributes as regular
    expect(body).to.have.own.property('_id', fakeCause._id, 'id is incorrect')
      .that.is.not.empty.that.is.a.string;
    expect(body)
      .to.have.property('donors')
      .to.deep.equal(fakeCause.donors)
      .to.be.an('array').that.is.empty;
    expect(body).to.have.own.property(
      'name',
      fakeCause.name,
      'name is incorrect'
    ).that.is.not.empty.that.is.a.string;
    expect(body).to.have.own.property(
      'location',
      fakeCause.location,
      'location is incorrect'
    ).that.is.not.empty.that.is.a.string;
    expect(body).to.have.own.property(
      'deleteable',
      fakeCause.deleteable,
      'deleteable is incorrect'
    );
    expect(body)
      .to.have.own.property(
        'createdDate',
        fakeCause.createdDate,
        'createdDate is incorrect'
      )
      .that.is.not.empty.that.is.an.instanceof(Date);
    expect(body)
      .to.have.property('defaultDesign')
      .to.deep.equal(fakeCause.defaultDesign)
      .to.be.an('object').that.is.not.empty;
    expect(body).to.have.own.property(
      'imageID',
      fakeCause.imageID,
      'imageID is incorrect'
    ).that.is.empty.that.is.a.string;
    expect(body).to.have.own.property(
      'mediaURL',
      fakeCause.mediaURL,
      'mediaURL is incorrect'
    ).that.is.empty.that.is.a.string;

    fakeCause = body;
  });

  it('DELETE the new fake cause', async () => {
    const { body } = await request(app)
      .delete('/api/causes/' + fakeCause._id)
      .set('Authorization', 'Bearer ' + user.token)
      .expect(200);

    expect(body).to.be.an('object').that.is.not.empty;

    expect(body).to.have.own.property('_id', fakeCause._id, 'id is incorrect')
      .that.is.not.empty.that.is.a.string;
    expect(body)
      .to.have.property('donors')
      .to.deep.equal(fakeCause.donors)
      .to.be.an('array').that.is.empty;
    expect(body).to.have.own.property(
      'name',
      fakeCause.name,
      'name is incorrect'
    ).that.is.not.empty.that.is.a.string;
    expect(body).to.have.own.property(
      'location',
      fakeCause.location,
      'location is incorrect'
    ).that.is.not.empty.that.is.a.string;
    expect(body).to.have.own.property(
      'deleteable',
      fakeCause.deleteable,
      'deleteable is incorrect'
    );
    expect(body).to.have.own.property(
      'description',
      fakeCause.description,
      'description is incorrect'
    ).that.is.not.empty.that.is.a.string;
    expect(body)
      .to.have.own.property(
        'createdDate',
        fakeCause.createdDate,
        'createdDate is incorrect'
      )
      .that.is.not.empty.that.is.an.instanceof(Date);
    expect(body)
      .to.have.property('defaultDesign')
      .to.deep.equal(fakeCause.defaultDesign)
      .to.be.an('object').that.is.not.empty;
    expect(body).to.have.own.property(
      'imageID',
      fakeCause.imageID,
      'imageID is incorrect'
    ).that.is.empty.that.is.a.string;
    expect(body).to.have.own.property(
      'mediaURL',
      fakeCause.mediaURL,
      'mediaURL is incorrect'
    ).that.is.empty.that.is.a.string;
  });

  after(() => {});
});
