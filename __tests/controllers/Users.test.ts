import request from 'supertest';
import app from '../../src/app';
import mockingoose from 'mockingoose';
import UsersModel from '../../src/models/Users';
const _docs = {
  _id: '5e89c7cfe6e5ff1027211c88',
  name: 'user-test',
  email: 'test@example.com',
  sexe: 0,
  status: 1,
  privacy: [] as any[],
};

describe('USers Test Suite', () => {
  beforeAll(() => {
    mockingoose(UsersModel).toReturn(_docs, 'findOne');
    // mockingoose(PacketsModel).toReturn(_docs[0], 'findOne');
    // mockingoose(PacketsModel).toReturn(newDoc, 'save');
    // mockingoose(PacketsModel).toReturn(updatedDoc, 'findOneAndUpdate');
  });

  it('GET /user should fetch the user basic profile', (done) => {
    request(app)
      .get('/user')
      .set('x-api-key', process.env.FAKE_TOKEN)
      .expect((res) => {
        const { result } = res.body;

        expect(result).toMatchObject(_docs);
      })
      .expect(200, done);
  });
});
