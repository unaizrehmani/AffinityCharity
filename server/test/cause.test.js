require('dotenv/config');
const app = require('../api/main/app');
const request = require('supertest');
const { expect } = require('chai');

describe('Test Causes API', () => {
	let user = {
		email: 'unaizrehmani@gmail.com',
		password: 'password'
	};

	const fakeCause = {
		name: 'Rami Aid',
		location: 'Ottawa',
		deleteable: true,
		description: 'Charity for Rami because he needs money.'
	}

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
    const response = await request(app)
			.get('/api/causes');
		expect(response.body).to.be.an('array').that.is.not.empty;
	});

	it('Insert a new cause', async () => {
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

		expect(body).to.have.own.property('_id',
			fakeCause._id,
			'id is incorrect');
		expect(body).to.have.own.property('donors',
			fakeCause.donors,
			'donors is incorrect');
		expect(body.donors).to.be.an('array').that.is.empty;
		expect(body).to.have.own.property('name',
			fakeCause.name,
			'name is incorrect');
		expect(body).to.have.own.property('location',
			fakeCause.location,
			'location is incorrect');
		expect(body).to.have.own.property('deleteable',
			fakeCause.deleteable,
			'deleteable is incorrect');
		expect(body).to.have.own.property('description',
			fakeCause.description,
			'description is incorrect');
		expect(body).to.have.own.property('createdDate',
			fakeCause.createdDate,
			'createdDate is incorrect');
		expect(body).to.have.own.property('defaultDesign',
			fakeCause.defaultDesign,
			'defaultDesign is incorrect');
		expect(body.defaultDesign).to.be.an('object').that.is.not.empty;
		expect(body).to.have.own.property('imageID',
			fakeCause.imageID,
			'imageID is incorrect');
		expect(body).to.have.own.property('mediaURL',
			fakeCause.mediaURL,
			'mediaURL is incorrect');
	});
	
	it('GET the new cause by ID', async () => {
		await require('../api/main/db');
		const { body } = await request(app)
			.get('/api/causes/'+fakeCause._id)
			.set('Authorization', 'Bearer ' + user.token)
			.expect(200);

		expect(body).to.be.an('object').that.is.not.empty;

		expect(body).to.have.own.property('_id',
			fakeCause._id,
			'id is incorrect');
		expect(body).to.have.property('donors');
		expect(body.donors).to.deep.equal(fakeCause.donors);
		expect(body.donors).to.be.an('array').that.is.empty;
		expect(body).to.have.own.property('name',
			fakeCause.name,
			'name is incorrect');
		expect(body).to.have.own.property('location',
			fakeCause.location,
			'location is incorrect');
		expect(body).to.have.own.property('deleteable',
			fakeCause.deleteable,
			'deleteable is incorrect');
		expect(body).to.have.own.property('description',
			fakeCause.description,
			'description is incorrect');
		expect(body).to.have.own.property('createdDate',
			fakeCause.createdDate,
			'createdDate is incorrect');
		expect(body).to.have.property('defaultDesign');
		expect(body.defaultDesign).to.deep.equal(fakeCause.defaultDesign);
		expect(body.defaultDesign).to.be.an('object').that.is.not.empty;
		expect(body).to.have.own.property('imageID',
			fakeCause.imageID,
			'imageID is incorrect');
		expect(body).to.have.own.property('mediaURL',
			fakeCause.mediaURL,
			'mediaURL is incorrect');
  });

  after(() => {});
});
