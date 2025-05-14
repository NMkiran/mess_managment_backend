import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import { App } from '@/app';
import { UserRoute } from '@routes/users.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response findAll Users', async () => {
      const usersRoute = new UserRoute();
      const users = usersRoute.user.user;

      users.findAllUser = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeiruty',
          username: 'user1',
          password: await bcrypt.hash('q1w2e3r4!', 10),
        },
        {
          _id: 'alskdjfhg',
          username: 'user2',
          password: await bcrypt.hash('a1s2d3f4!', 10),
        },
        {
          _id: 'zmxncbv',
          username: 'user3',
          password: await bcrypt.hash('z1x2c3v4!', 10),
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}`).expect(200);
    });
  });

  describe('[GET] /users/:id', () => {
    it('response findOne User', async () => {
      const userId = 'qpwoeiruty';

      const usersRoute = new UserRoute();
      const users = usersRoute.user.user;

      users.findUserById = jest.fn().mockReturnValue({
        _id: 'qpwoeiruty',
        username: 'user1',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}/${userId}`).expect(200);
    });
  });

  describe('[POST] /users', () => {
    it('response Create User', async () => {
      const userData = {
        username: 'testuser',
        password: 'q1w2e3r4',
      };

      const usersRoute = new UserRoute();
      const users = usersRoute.user.user;

      users.createUser = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        username: userData.username,
        password: await bcrypt.hash(userData.password, 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).post(`${usersRoute.path}`).send(userData).expect(201);
    });
  });

  describe('[PUT] /users/:id', () => {
    it('response Update User', async () => {
      const userId = '60706478aad6c9ad19a31c84';
      const userData = {
        username: 'testuser',
        password: 'q1w2e3r4',
      };

      const usersRoute = new UserRoute();
      const users = usersRoute.user.user;

      users.updateUser = jest.fn().mockReturnValue({
        _id: userId,
        username: userData.username,
        password: await bcrypt.hash(userData.password, 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).put(`${usersRoute.path}/${userId}`).send(userData);
    });
  });

  describe('[DELETE] /users/:id', () => {
    it('response Delete User', async () => {
      const userId = '60706478aad6c9ad19a31c84';

      const usersRoute = new UserRoute();
      const users = usersRoute.user.user;

      users.deleteUser = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        username: 'testuser',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).delete(`${usersRoute.path}/${userId}`).expect(200);
    });
  });
});
