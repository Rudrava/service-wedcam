import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getApp, initializeApp } from 'firebase-admin/app';
import { credential, ServiceAccount, apps } from 'firebase-admin';

export const FirebaseClientToken = Symbol();

export const FirebaseClientProvider: Provider = {
  provide: FirebaseClientToken,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const adminConfig: ServiceAccount = {
      projectId: configService.get<string>('firebase.projectId'),
      privateKey: configService.get<string>('firebase.privateKey'),
      clientEmail: configService.get<string>('firebase.clientEmail'),
    };
    if (!apps.length)
      return initializeApp({
        credential: credential.cert(adminConfig),
        storageBucket: configService.get<string>('firebase.storageBucket'),
      });
    else return getApp();
  },
};
