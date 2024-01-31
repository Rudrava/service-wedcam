import { Logger } from '@nestjs/common';
import { getStorage } from 'firebase-admin/storage';

export class FirebaseService {
  private logger = new Logger(FirebaseService.name);

  async uploadFile(
    file: Express.Multer.File,
    directory: string,
    fileName: string,
  ) {
    const storage = getStorage();
    const bucket = storage.bucket();

    const fullPath = `${directory}/${fileName}`;
    const bucketFile = bucket.file(fullPath);
    await bucketFile.save(file.buffer, {
      contentType: file.mimetype,
      gzip: true,
    });

    const [url] = await bucketFile.getSignedUrl({
      action: 'read',
      expires: '01-01-2050',
    });
    return url;
  }
}
