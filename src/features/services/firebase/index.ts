import { Provider } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

export const firebaseServiceProvider: Provider = {
  provide: FirebaseService,
  useClass: FirebaseService,
};
