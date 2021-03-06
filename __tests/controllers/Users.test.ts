import request from 'supertest';
import app from '../../src/app';
import mockingoose from 'mockingoose';
import UsersModel from '../../src/models/Users.model';
import PacketsModel from '../../src/models/Packets.model';

jest.mock('bcrypt', () => {
  return {
    compare: () => true,
    hash: () => 'hash',
  };
});

const _docs = {
  _id: '5e89c7cfe6e5ff1027211c88',
  name: 'user-test',
  email: 'test@example.com',
  sexe: 0,
  status: 1,
  privacy: [] as any[],
};

const packets = [
  {
    _id: '5e89c7cfe6e5ff1027211c88',
    title: 'packet1',
    likes: 0,
    views: 0,
    status: 1,
  },
  {
    _id: '5e89c7cfe6e5ff1027211c90',
    title: 'packet2',
    likes: 2,
    views: 0,
    status: 1,
  },
];

const updatedDoc = {
  name: 'new-name',
};

const apiPrefix = '/api/v1';
const { FAKE_TOKEN } = process.env;

describe('USers Test Suite', () => {
  beforeAll(() => {
    mockingoose(UsersModel).toReturn(_docs, 'findOne');
    mockingoose(PacketsModel).toReturn(packets, 'find');
    mockingoose(UsersModel).toReturn(updatedDoc, 'findOneAndUpdate');
  });

  it('GET /user should fetch the user basic profile', (done) => {
    request(app)
      .get(apiPrefix + '/user')
      .set('x-api-key', FAKE_TOKEN)
      .expect((res) => {
        const { result } = res.body;

        expect(result).toMatchObject(_docs);
      })
      .expect(200, done);
  });

  it('GET /user/packets should fetch the user created Packets', (done) => {
    request(app)
      .get(apiPrefix + '/user/packets')
      .set('x-api-key', FAKE_TOKEN)
      .expect((res) => {
        const { result } = res.body;
        expect(result).toMatchObject(packets);
      })
      .expect(200, done);
  });

  test('PUT /user should update user info', (done) => {
    request(app)
      .put(apiPrefix + '/user')
      .send({ name: 'new-user' })
      .set('x-api-key', FAKE_TOKEN)
      .expect(200, done);
  });

  test('PUT /user/password should update user password', (done) => {
    request(app)
      .put(apiPrefix + '/user/password')
      .send({ name: 'new-user' })
      .set('x-api-key', FAKE_TOKEN)
      .expect(200, done);
  });
});
