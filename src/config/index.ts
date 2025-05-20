import { registerAs } from '@nestjs/config';
import 'dotenv/config';

export default registerAs('config', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    typeormConfig: {
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
    },
  },
  auth0: {
    issuerUrl: process.env.ISSUER_BASE_URL,
    audence: process.env.AUTH0_AUDIENCE,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  s3: {
    region: process.env.AWS_BUCKET_REGION,
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY,
  },
}));
