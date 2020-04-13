import request from 'supertest';
import app from '../../src/app';
import mockingoose from 'mockingoose';
import PacketsModel from '../../src/models/Packets.model';
const _docs = [
  {
    _id: '5e89c7cfe6e5ff1027211c88',
    title: 'packet1',
    likes: 0,
    views: 0,
    status: 1,
    comments: [] as any[],
  },
  {
    _id: '5e89c7cfe6e5ff1027211c90',
    title: 'packet2',
    likes: 2,
    views: 0,
    status: 1,
    comments: [] as any[],
  },
];

const newDoc = {
  title: 'new packet',
  creator: '5d206fb4e858920d180a5cc0',
};

const updatedDoc = {
  title: 'new title',
  creator: '5d206fb4e858920d180a5cc0',
};

const apiPrefix = '/api/v1';

describe('Packets Test Suite', () => {
  beforeAll(() => {
    mockingoose(PacketsModel).toReturn(_docs, 'find');
    mockingoose(PacketsModel).toReturn(_docs[0], 'findOne');
    mockingoose(PacketsModel).toReturn(newDoc, 'save');
    mockingoose(PacketsModel).toReturn(updatedDoc, 'findOneAndUpdate');
  });

  test('GET /packets should return list of packets', (done) => {
    request(app)
      .get(apiPrefix + '/packets')
      .set('x-api-key', process.env.FAKE_TOKEN)
      .expect((res) => {
        const { packets } = res.body;
        expect(packets.length).toBe(2);
        expect(packets[0]).toMatchObject(_docs[0]);
      })
      .expect(200, done);
  });

  test('GET /packets/:id should one packet by id', (done) => {
    request(app)
      .get(apiPrefix + '/packets/5e89c7cfe6e5ff1027211c88')
      .set('x-api-key', process.env.FAKE_TOKEN)
      .expect((res) => {
        const { packet } = res.body;
        expect(packet).toMatchObject(_docs[0]);
      })
      .expect(200, done);
  });

  test('POST /packets should add new packet', (done) => {
    request(app)
      .post(apiPrefix + '/packets')
      .send(newDoc)
      .set('x-api-key', process.env.FAKE_TOKEN)
      .expect((res) => {
        const { result } = res.body;
        expect(result).toMatchObject(newDoc);
      })
      .expect(200, done);
  });

  test('POST /packets should fail if required fields are not passed', (done) => {
    request(app)
      .post(apiPrefix + '/packets')
      .set('x-api-key', process.env.FAKE_TOKEN)
      .expect(500, done);
  });

  test('PUT /packets/:id should update packet', (done) => {
    request(app)
      .put(apiPrefix + '/packets/5e89c7cfe6e5ff1027211c88')
      .send(updatedDoc)
      .set('x-api-key', process.env.FAKE_TOKEN)
      .expect((res) => {
        const { result } = res.body;
        expect(result).toMatchObject(updatedDoc);
      })
      .expect(200, done);
  });
  // TODO: later when a request validator is added
  // test("PUT /packets/:id should fail if Id isn't valid", (done) => {
  //   request(app).put("/packets/12345").expect(500, done);
  // });
});
