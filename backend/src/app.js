import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

const app = express();

/* ======================
   MIDDLEWARE
====================== */
app.use(cors());
app.use(express.json());

/* ======================
   ROUTES
====================== */
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

/* ======================
   HEALTH CHECK
====================== */
app.get('/', (req, res) => {
  res.send('todoMern backend running');
});

export default app;