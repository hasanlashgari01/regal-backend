import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { extname } from 'path';
import { BadRequestMessage, InternalServerMessage } from 'src/common/enums/message.enum';

@Injectable()
export class S3Service {
  private readonly s3: S3;

  constructor() {
    this.s3 = new S3({
      region: 'default',
      endpoint: process.env.S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      },
    });
  }

  async uploadFile(file: Express.Multer.File, folderName: string) {
    if (!file) throw new BadRequestException(BadRequestMessage.File);
    if (typeof file.originalname !== 'string' || !file.buffer || !Buffer.isBuffer(file.buffer)) {
      throw new BadRequestException(BadRequestMessage.FileName);
    }

    const ext = extname(file.originalname);
    const key = `${folderName}/${Date.now()}${ext}`;

    try {
      return await this.s3
        .upload({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: key,
          Body: file.buffer,
        })
        .promise();
    } catch (error: unknown) {
      if (error) throw new InternalServerErrorException(InternalServerMessage.File);
      throw new InternalServerErrorException(InternalServerMessage.File);
    }
  }

  async deleteFile(key: string) {
    return await this.s3
      .deleteObject({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: decodeURI(key),
      })
      .promise();
  }
}
