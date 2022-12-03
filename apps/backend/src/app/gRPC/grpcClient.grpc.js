import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PROTO_PATH = resolve(__dirname, '..', 'proto', 'video.proto');

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

const videoService = grpc.loadPackageDefinition(packageDefinition).videoService;

const REMOTE_URL = "185.26.120.191:9090";
export const clientVideo = new videoService.VideoService(REMOTE_URL, grpc.credentials.createInsecure());
