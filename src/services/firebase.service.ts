// firebase-storage.service.ts
import { Injectable } from '@nestjs/common';
import { firebaseStorage } from 'src/firebase/firebase';

@Injectable()
export class FirebaseStorageService {
  async uploadFile(file: any, uuid: any, folderName?: string): Promise<any> {
    const fileName = uuid || file.originalName;
    const destination = folderName ? `${folderName}/${fileName}` : fileName;

    const blob = firebaseStorage.file(destination);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype || file.fileType?.mime,
      },
    });

    await new Promise((resolve, reject) => {
      blobStream.on('error', (err) => reject(err));
      blobStream.on('finish', resolve);
      blobStream.end(file.buffer);
    });

    return {
      uuid: fileName,
      originalName: file.originalName,
      fileType: file.fileType,
      size: file.size,
      encoding: file.encoding,
    };
  }

  getPublicUrl(filePath: string): string {
    return `https://storage.googleapis.com/${firebaseStorage.name}/${filePath}`;
  }

  async getSignedUrl(filePath: string): Promise<string> {
    const file = firebaseStorage.file(filePath);
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });
    return url;
  }
}
