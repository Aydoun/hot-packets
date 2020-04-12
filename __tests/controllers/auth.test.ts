import request from 'supertest';
import app from '../../src/app';
import mockingoose from 'mockingoose';
import UsersModel from '../../src/models/Users.model';

const user = {
  name: 'user-test',
  email: 'user-test@gmail.com',
  password: 'password1234',
};

describe('Auth Test Suite', () => {
  beforeAll(() => {
    mockingoose(UsersModel).toReturn({}, 'save');
    mockingoose(UsersModel).toReturn({ password: 'password1234' }, 'findOne');
    // mockingoose(PacketsModel).toReturn(newDoc, 'save');
    // mockingoose(PacketsModel).toReturn(updatedDoc, 'findOneAndUpdate');
  });

  it('POST /auth/register should register a new user', (done) => {
    request(app)
      .post('/auth/register')
      .send({
        name: 'user-test',
        email: 'user-testgmail.com',
        password: 'password1234',
      })
      .expect(500, done);
  });

  it('POST /auth/login should register a new user', (done) => {
    request(app)
      .post('/auth/login')
      .send({ email: 'user@gmail.com', password: 'password1234' })
      .expect((res) => {
        expect(res.body).toHaveProperty('token');
      })
      .expect(200, done);
  });
});
