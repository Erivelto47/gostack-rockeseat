/**
 * Created by erivelto on 24/11/20
 */
import multer from 'multer';
import crypto from 'crypto';
import * as path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename: function (request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    }
  })
}
