import { registerAs } from '@nestjs/config';

export const firebaseConfig = registerAs('firebase', () => ({
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  api_key: process.env.FIREBASE_API_KEY,
  auth_domain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.split(String.raw`\n`).join('\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
}));
