/* eslint-disable no-useless-catch */
import { createSimpleMediaStream } from './create-simple-media-stream.js';
import { createVideoStreamByRange } from './create-video-stream-by-range.js';

export const sendVideoFile = (req, res, pathToVideo) => {
  try {
    const range = req.headers.range;
    if (!range) {
        createSimpleMediaStream(req, res, pathToVideo);
        return;
    }
    createVideoStreamByRange(res, range, pathToVideo);
  } catch (e) {
    throw e;
  }
}
