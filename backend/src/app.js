import cors from 'cors';
import express from 'express';

import routes from './api/routes/index.js';

const app = express();

// trailing slashes map to different routes
// ex: /apples/ and /apples are different
app.enable('strict routing');
app.use(cors());

// takes incoming req with JSON payloads and makes it available to req.body
app.use(express.json());
app.use(routes);

export default app;
