/* eslint-disable no-useless-catch */
import { clientVideo } from './grpcClient.grpc.js';

export const removeFile = (fileName) => {
  try {
    clientVideo.deleteFile({ fileName }, (err) => {
      if (err) {
        console.log(err.message);
        return false;
      }
      return true;
    });
  } catch(e) {
    throw e;
  }
}
