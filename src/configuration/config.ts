import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  const config = {
    mongo: {
      dbURI: process.env.DB_URI,
      dbName: process.env.DB_NAME,
    },
  };

  return config;
});
