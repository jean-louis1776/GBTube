import { ApiError } from '../errors/apiError.js'; 
import { clientVideo } from './grpc-client.js';

export const createSimpleMediaStream = (req, res, pathToMedia) => {
  try {
    clientVideo.callMediaInfo({ pathToMedia }, (err, resGrpc) => {
      if (err) {
        throw ApiError.InternalServerError('Remote Server Error');
      }
      const stream = clientVideo.callMediaSimple({ pathToMedia });
      const headers = {
        'Content-Length': resGrpc.fileSize,
        'Content-Type': resGrpc.mime,
      };
      res.writeHead(200, headers);
      stream.on('data', (chunk) => {
        res.write(chunk.mediaStream);
      });
      stream.on('end', () => {
        res.end();
      });
    });
  } catch (e) {
    console.log(e.message);
    throw e;
  }
}
