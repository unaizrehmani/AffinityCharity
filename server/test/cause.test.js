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
	
	it('GET /api/causes/:causeID', async () => {
		await require('../api/main/db');
		const response = await request(app)
			.get('/api/causes/5daa5d198a52ab254733f272')
			.set('Authorization', 'Bearer ' + user.token)
			.expect(200);

		const cause = response.body;
		// console.log(cause);

		expect(cause).to.be.an('object').that.is.not.empty;
		expect(cause).to.have.own.property('_id',
			'5daa5d198a52ab254733f272',
			'id is incorrect');
		expect(cause).to.have.own.property('name',
			'Zakat',
			'name is incorrect');
		expect(cause).to.have.own.property('location',
			'Global',
			'location is incorrect');
		expect(cause).to.have.own.property('deleteable',
			false,
			'deleteable is incorrect');
		expect(cause).to.have.own.property('createdDate',
			'2019-10-19T00:47:21.600Z',
			'createdDate is incorrect');
		expect(cause).to.have.own.property('imageID',
			'dev/causes/pvr1zdoxkzoginlvisnv',
			'imageID is incorrect');
		expect(cause).to.have.own.property('mediaURL',
			'http://res.cloudinary.com/dmkd2a8op/image/upload/v1571446041/dev/causes/pvr1zdoxkzoginlvisnv.jpg',
			'mediaURL is incorrect');
		expect(cause).to.have.own.property('description',
			'General Zakat donations',
			'description is incorrect');
  });

  after(() => {});
});
