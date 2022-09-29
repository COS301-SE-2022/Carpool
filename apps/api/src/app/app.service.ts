import { Injectable, Req, Res, Param } from '@nestjs/common';
import * as S3 from 'aws-sdk/clients/s3';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_KEY,
// });
const s3Client = new S3Client({
  region: 'eu-west-3',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const s3 = new S3({
  region: 'eu-west-3',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to api!' };
  }

  async getImage(@Req() req, @Res() res, @Param() params) {
    try {
      const key = params.key;

      const readStream = this.getFileStream(key);

      readStream.pipe(res);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async fileupload(@Req() req, @Res() res) {
    try {
      this.upload(req, res, function (error) {
        if (error) {
          console.log(error);
          return res.status(404).json(`Failed to upload image file: ${error}`);
        }
        console.log(req.files[0]);

        return res.status(201).json(req.files[0]);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(`Failed to upload image file: ${error}`);
    }
  }

  upload = multer({
    storage: multerS3({
      s3: s3Client,
      bucket: AWS_S3_BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      filename: function (req, file, cb) {
        if (file.originalname.includes('.image')) {
          file.originalname.replace('.image', '.png');
        }
        cb(null, new Date().toISOString() + file.originalname);
      },
    }),
  }).array('upload', 1);

  getFileStream = (fileKey: string) => {
    const downloadParams = {
      Key: fileKey,
      Bucket: AWS_S3_BUCKET_NAME,
    };

    try {
      return s3.getObject(downloadParams).createReadStream();
    } catch (error) {
      console.log('error: ', error);
    }
  };
}
