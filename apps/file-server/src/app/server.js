import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import { stat, /*appendFile,*/ access, constants, rm } from 'node:fs/promises';
import { fileTypeFromFile } from 'file-type';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ENDPOINT = '185.26.120.191:9090';
const PROTO_PATH = resolve(__dirname, 'proto', 'video.proto');
const PATH_TO_MEDIA = resolve(__dirname, '..', 'media');

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);

function callMediaInfo(payload, res) {
  const getData = async () => {
    const resolvedPath = resolve(PATH_TO_MEDIA, payload.request.pathToMedia);
    const { ext, mime } = await fileTypeFromFile(resolvedPath);
    const { size } = await stat(resolvedPath);
    return { size, ext, mime }
  }

  getData()
    .then(({ size, ext, mime }) => {
      res(null, { fileSize: size, ext, mime });
    })
    .catch((err) => {
      res(err, { fileSize: 0, ext: 'none', mime: 'none' });
    });
}

function callVideoChunk(call) {
  const { pathToMedia, start, end } = call.request;
  const resolvedPath = resolve(PATH_TO_MEDIA, pathToMedia);
  const videoStream = fs.createReadStream(resolvedPath, { start, end });

  videoStream.on('error', (err) => {
    call.write({ isError: true, mediaStream: 0 });
    console.log(err);
  });

  videoStream.on('data', (chunk) => {
    call.write({ isError: false, mediaStream: chunk });
  });

  videoStream.on('end', () => {
    call.end();
  });
}

function callMediaSimple(call) {
  const { pathToMedia } = call.request;
  const resolvedPath = resolve(PATH_TO_MEDIA, pathToMedia);
  const mediaStream = fs.createReadStream(resolvedPath);
  mediaStream.on('error', (err) => {
    call.write({ isError: true, mediaStream: 0 });
    console.log(err);
  });
  mediaStream.on('data', (chunk) => {
    call.write({ isError: false, mediaStream: chunk });
  });
  mediaStream.on('end', () => {
    call.end();
  });
}

/*function sendMedia (call, res) {
  call.on('data', (payload) => {
    const fileName = payload.fileName;
    const chunk = payload.chunk;
    const pathToWrite = resolve(PATH_TO_MEDIA, fileName);
    appendFile(pathToWrite, chunk).then().catch((err) => {res(err, {})});
  });

  call.on('error', (err) => {
    console.log(err);
    res(err, {});
  });

  call.on('end', () => {
    console.log('Finished');
    res(null, {});
  });
}*/

function sendMedia(call, res) {
  let file

  call.on('data', (payload) => {
    const chunk = payload.chunk;
    const fileName = payload.fileName;
    if (!chunk) {
      const resolvedPath = resolve(PATH_TO_MEDIA, fileName);
      file = fs.createWriteStream(resolvedPath);
      file.on('error', (err) => {
        console.log('Write file error');
        console.log(err);
        res(err, { status: 'FAILED' });
      });
    } else {
      file.write(chunk);
    }
  });

  call.on('end', () => {
    file.close();
    res(null, { status: 'SUCCESS' });
  });
}

function deleteFile(payload, res) {
  const resolvedPath = resolve(PATH_TO_MEDIA, payload.request.fileName);
  rm(resolvedPath).then(() => {
      res(null, {});
  }).catch((err) => {
      res(err, {});
  });
}

function isFileExist(payload, res) {
  const resolvedPath = resolve(PATH_TO_MEDIA, payload.request.fileName);
  access(resolvedPath, constants.R_OK | constants.W_OK).then(() => {
    res(null, { fileExist: true });
  }).catch(() => {
    res(null, { fileExist: false });
  });
}

const videoService = grpc.loadPackageDefinition(packageDefinition).videoService;

function getServer() {
  const proceduresPack = { callMediaInfo, callVideoChunk, callMediaSimple, sendMedia, isFileExist, deleteFile }
  const server = new grpc.Server();
  server.addService(videoService.VideoService.service, proceduresPack);
  return server;
}

function main() {
  const videoServer = getServer();
  videoServer.bindAsync(ENDPOINT, grpc.ServerCredentials.createInsecure(), () => {
    videoServer.start();
    console.log(`gRPC server has been started on ${ENDPOINT}`);
  });
}

main();
