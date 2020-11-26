/**
 * Created by erivelto on 24/11/20
 */
import multer from 'multer';
import crypto from 'crypto';
import * as path from 'path';

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tempFolder,
  storage: multer.diskStorage({
    destination: tempFolder,
    filename: function (request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    }
  })
}
