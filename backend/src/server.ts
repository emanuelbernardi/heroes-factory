import app from './app';
import { AppDataSource } from './database/data-source';

AppDataSource.initialize().then(() => {
  app.listen(3333, () => console.log('🚀 Server running on port 3333'));
});