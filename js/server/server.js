import express from 'express';
import path from 'path';
import api from './api/api';
import config from './config/config';

const app = express();

app.use('/api', api);

export default app;
