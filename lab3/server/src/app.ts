import express from 'express';
import routes from './routes';
import cookieParser from 'cookie-parser';
import { NODE_ENV } from './config';
import path from 'path';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);

if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', '..', '..', 'client', 'build')));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'client', 'build', 'index.html'));
  });
}

export default app;
