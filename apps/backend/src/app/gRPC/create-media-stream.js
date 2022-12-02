import { ApiError } from '../errors/apiError.js';
import { getChunkData } from './get-chunk-data.js';
import { clientVideo } from './grpc-client.js';

export const createMediaStream = (req, res, pathToMedia) => {
  try {
    clientVideo.callMediaInfo({ pathToMedia }, (err, resGrpc) => {
      if (err) {
        throw ApiError.InternalServerError('Remote Server Error');
      }

      const range = req.headers.range;
      let stream, headers, statusCode;
      if (range) {
        const { start, end, chunkSize } = getChunkData(range, resGrpc.fileSize);
        stream = clientVideo.callVideoChunk({ pathToMedia, start, end });
        headers = {
          'Content-Range': `bytes ${start}-${end}/${resGrpc.fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize,
          'Content-Type': resGrpc.mime,
        };
        statusCode = 206;
      } else {
        stream = clientVideo.callMediaSimple({ pathToMedia });
        headers = {
          'Content-Length': resGrpc.fileSize,
          'Content-Type': resGrpc.mime,
        };
        statusCode = 200;
      }

      res.writeHead(statusCode, headers);
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
