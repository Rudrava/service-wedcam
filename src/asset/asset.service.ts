import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/features/services';
import { User } from 'src/user/entities';

export type FileType = 'qr' | 'image' | 'avatar';

@Injectable()
export class AssetService {
  constructor(private readonly firebaseService: FirebaseService) {}

  private extractBase64Data(base64URL: string, assetType?: string) {
    const [type, base64] = base64URL.split(',');

    const mime = type.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*;.*/);

    return { type: mime.at(1) || type || assetType || '', base64 };
  }

  async uploadFile(
    file: Express.Multer.File,
    user: User,
    eventId: string,
  ): Promise<string> {
    return this.firebaseService.uploadFile(
      file,
      `${user.id}/${eventId}`,
      file.originalname,
    );
  }
}
