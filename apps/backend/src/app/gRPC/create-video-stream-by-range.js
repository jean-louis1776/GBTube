import { ApiError } from '../errors/apiError.js';
import { getChunkData } from './get-chunk-data.js';
import { clientVideo } from './grpc-client.js';

export const createVideoStreamByRange = (res, range, pathToMedia) => {
  try {
    clientVideo.callMediaInfo({ pathToMedia }, (err, resGrpc) => {
      if (err) {
        throw ApiError.InternalServerError('Remote Server Error');
      }
      const { start, end, chunkSize } = getChunkData(range, resGrpc.fileSize);
      const stream = clientVideo.callVideoChunk({ pathToMedia, start, end });
      const headers = {
        'Content-Range': `bytes ${start}-${end}/${resGrpc.fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': resGrpc.mime,
      };
      res.writeHead(206, headers);
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
