import { ApiError } from '../errors/apiError.js';
import { getChunkData } from './getChunkData.grpc.js';
import { clientVideo } from './grpcClient.grpc.js';

export const createMediaStream = (req, res, pathToMedia, callback) => {
  try {
    let needCallback = true;
    clientVideo.callMediaInfo({ pathToMedia }, (err, resGrpc) => {
      if (err) {
        // err покажет ошибку чтения на удалённом сервере
        throw ApiError.InternalServerError('Remote Server Error');
      }

      const range = req.headers.range;
      let stream, headers, statusCode;
      if (range) {
        const { start, end, chunkSize } = getChunkData(range, resGrpc.fileSize);
        if (start > 0) needCallback = false;
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
        // Тут нужно проверять isError
        res.write(chunk.mediaStream);
      });

      stream.on('end', async () => {
        if (needCallback && callback) await callback(req);
        res.end();
      });
    });
  } catch (e) {
    console.log(e.message);
    throw e;
  }
}
