/* eslint-disable no-useless-catch */
import fs from 'fs';

import { clientVideo } from './grpcClient.grpc.js';
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
      // Добавить res и смотреть значение status в нём, чтобы понять что загрузка окончена
      const serviceCall = clientVideo.sendMedia((err) => {
        if(err) {
          // Здесь в err покажется ошибка записи на удалённом сервере.
          throw ApiError.InternalServerError(`Remote Server Error: ${err.message}`);
        }
      });
      // Вынести в отдельное сообщение отправку fileName
/*      serviceCall.write({ fileName: fileNameTo });
      rdStream.on('data', (chunk) => {
        serviceCall.write({ chunk });
      });*/
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
      // Полагаю в базу нужно добавить статус завершения загрузки, чтобы до этого момента не показывать клавишу на удаление.
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
