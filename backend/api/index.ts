import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { progressRoutes } from '../src/progress';
import { authRoutes } from '../src/auth';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('*', cors({ origin: '*' }));

app.route('/api/progress', progressRoutes);
app.route('/api/auth', authRoutes);

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
