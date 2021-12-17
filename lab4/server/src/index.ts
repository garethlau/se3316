import app from './app';
import { PORT } from './config';

(async () => {
  app.listen(PORT, () => {
    console.log('\x1b[32m%s\x1b[0m', `Server Listening on port ${PORT}`);
  });
})();
