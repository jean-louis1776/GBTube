/* eslint-disable no-useless-catch */
import fs from 'fs';

import { clientVideo } from './grpc-client.js';
import { ApiError } from '../errors/apiError.js';

export const sendMediaToBack = (fileNameFrom, fileNameTo, callback) => {
  try {
    clientVideo.isFileExist({ fileName: fileNameTo }, (err, resGrpc) => {
      if (err) {
          throw ApiError.InternalServerError(`Remote Server Error: ${err.message}`);
      }
      if (resGrpc.fileExist) {
        throw ApiError.InternalServerError('Remote file already exist');
      }
      const rdStream = fs.createReadStream(fileNameFrom);
      const serviceCall = clientVideo.sendMedia((err) => {
        if(err) {
          throw ApiError.InternalServerError(`Remote Server Error: ${err.message}`);
        }
      });
      rdStream.on('data', (chunk) => {
        serviceCall.write({ fileName: fileNameTo, chunk });
      });
      rdStream.on('error', () => {
        serviceCall.end();
        throw ApiError.InternalServerError('Reading file Error');
      });
      rdStream.on('end', () => {
        serviceCall.end();
      });
      rdStream.on('close', () => {
        try {
          if (callback) return callback();
        } catch (e) {
          throw e;
        }
      });
    });
  } catch (e) {
    console.log(e.message);
    throw e;
  }
}
