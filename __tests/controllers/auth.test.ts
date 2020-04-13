import request from 'supertest';
import app from '../../src/app';
import mockingoose from 'mockingoose';
import UsersModel from '../../src/models/Users.model';

const apiPrefix = '/api/v1';

describe('Auth Test Suite', () => {
  beforeAll(() => {
    mockingoose(UsersModel).toReturn({}, 'save');
    mockingoose(UsersModel).toReturn({ password: 'password1234' }, 'findOne');
  });

  it('POST /auth/register should reject registration due to an incorrect email format', (done) => {
    request(app)
      .post(apiPrefix + '/auth/register')
      .send({
        name: 'user-test',
        email: 'user-testgmail.com',
        password: 'password1234',
      })
      .expect(500, done);
  });

  it('POST /auth/login should register a new user', (done) => {
    request(app)
      .post(apiPrefix + '/auth/login')
      .send({ email: 'user@gmail.com', password: 'password1234' })
      .expect((res) => {
        expect(res.body).toHaveProperty('token');
      })
      .expect(200, done);
  });
});
