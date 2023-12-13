import { rest } from 'msw';
import { API_URL } from '../../config/api';
import { LoginInput } from '../../types/auth';
import { responseWrapper } from '../__fixtures__/api';
import { adminFixture, jwtFixture, passingUser } from '../__fixtures__/auth';

export const handlers = [
  rest.post(`${API_URL}auth/login`, async (req, res, ctx) => {
    const { email } = await req.json<LoginInput>();
    if (email === passingUser.email) {
      return res(ctx.status(200), ctx.json(responseWrapper(jwtFixture)));
    }
    return res(
      ctx.status(403),
      ctx.json(responseWrapper(null, 'error', 'Invalid credentials'))
    );
  }),

  rest.get(`${API_URL}auth/me`, async (req, res, ctx) => {
    const Authorization = req.headers.get('Authorization');
    if (Authorization === `Bearer ${jwtFixture.accessToken}`) {
      return res(ctx.status(200), ctx.json(responseWrapper(adminFixture)));
    }
    return res(
      ctx.status(403),
      ctx.json(responseWrapper(null, 'error', 'Invalid credentials'))
    );
  }),

  rest.post(`${API_URL}auth/signup`, async (_req, res, ctx) => {
    return res(ctx.status(201), ctx.json(responseWrapper(jwtFixture)));
  }),
];
