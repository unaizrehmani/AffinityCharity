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
	

  after(() => {});
});
