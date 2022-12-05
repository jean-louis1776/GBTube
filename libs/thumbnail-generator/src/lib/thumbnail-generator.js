/* eslint-disable no-async-promise-executor */
export const importFileandPreview = (file, revoke) => {
  return new Promise((resolve, reject) => {
    window.URL = window.URL || window.webkitURL;
    let preview = window.URL.createObjectURL(file);
    if (revoke) {
      window.URL.revokeObjectURL(preview);
    }
    setTimeout(() => {
      resolve(preview);
    }, 100);
  });
};
export const generateVideoThumbnails = async (
  videoFile,
  numberOfThumbnails,
  type,
  cb
) => {
  let thumbnail = [];
  let fractions = [];
  return new Promise(async (resolve, reject) => {
    var _a;
    if (type === 'file') {
      if (
        !((_a = videoFile.type) === null || _a === void 0
          ? void 0
          : _a.includes('video'))
      ) {
        reject('not a valid video file');
      }
    }
    await getVideoDurationFromVideoFile(videoFile)
      .then(async (duration) => {
        for (let i = 0; i <= duration; i += duration / numberOfThumbnails) {
          fractions.push(Math.floor(i));
        }
        let promiseArray = fractions.map(async (time, index) => {
          const res = await getVideoThumbnail(
            videoFile,
            index >= fractions.length - 1 ? time - 2 : time
          );
          if (cb) cb(res, index);
          return Promise.resolve(res);
        });
        await Promise.all(promiseArray)
          .then((res) => {
            res.forEach((res) => {
              thumbnail.push(res);
            });
            resolve(thumbnail);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => resolve(thumbnail));
      })
      .catch((err) => {
        reject(err);
      });
    reject('something went wrong');
  });
};
const getVideoThumbnail = (file, videoTimeInSeconds) => {
  return new Promise((resolve, reject) => {
    var _a;
    if (
      (_a = file === null || file === void 0 ? void 0 : file.type) === null ||
      _a === void 0
        ? void 0
        : _a.match('video')
    ) {
      importFileandPreview(file).then((urlOfFIle) => {
        getVideoCover(urlOfFIle, videoTimeInSeconds).then((res) => {
          resolve(res);
        });
      });
    } else if (file) {
      getVideoCover(file, videoTimeInSeconds)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      reject('file not valid');
    }
  });
};
export const getVideoCover = (urlOfFIle, seekTo = 0) => {
  return new Promise((resolve, reject) => {
    try {
      const videoPlayer = document.createElement('video');
      videoPlayer.setAttribute('src', urlOfFIle);
      videoPlayer.crossOrigin = 'Anonymous';
      videoPlayer.load();
      videoPlayer.addEventListener('error', (ex) => {
        reject(`error when loading video file ${ex}`);
      });
      videoPlayer.addEventListener('loadedmetadata', () => {
        if (videoPlayer.duration < seekTo) {
          reject('video is too short.');
          return;
        }
        setTimeout(() => {
          videoPlayer.currentTime = seekTo;
        }, 200);
        videoPlayer.addEventListener('seeked', () => {
          const canvas = document.createElement('canvas');
          canvas.width = videoPlayer.videoWidth;
          canvas.height = videoPlayer.videoHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
          ctx.canvas.toBlob(
            (blob) => {
              var reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = function () {
                var base64data = reader.result;
                resolve(base64data);
              };
            },
            'image/jpeg',
            1
          );
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const generateVideoThumbnailViaUrl = (urlOfFIle, videoTimeInSeconds) => {
  return new Promise((resolve, reject) => {
    try {
      var video = document.createElement('video');
      var timeupdate = function () {
        if (snapImage()) {
          video.removeEventListener('timeupdate', timeupdate);
          video.pause();
        }
      };
      video.addEventListener('loadeddata', function () {
        try {
          if (snapImage()) {
            video.removeEventListener('timeupdate', timeupdate);
          }
        } catch (error) {
          reject(error);
        }
      });
      var snapImage = function () {
        var canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas
          .getContext('2d')
          .drawImage(video, 0, 0, canvas.width, canvas.height);
        var image = canvas.toBlob(
          (blob) => {
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
              var base64data = reader.result;
              resolve(base64data);
            };
          },
          'image/jpeg',
          1
        );
        var success =
          (image === null || image === void 0 ? void 0 : image.length) > 1e5;
        if (success) {
          URL.revokeObjectURL(urlOfFIle);
          resolve(image);
        }
        return success;
      };
      video.addEventListener('timeupdate', timeupdate);
      video.preload = 'metadata';
      video.src = urlOfFIle;
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = 'Anonymous';
      video.currentTime = videoTimeInSeconds;
      video
        .play()
        .then()
        .catch((err) => {
          reject({
            status: 500,
            reason: `Access to video at ${urlOfFIle} from origin ${window.location.hostname} has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`,
            message: err,
          });
        });
    } catch (error) {
      reject(error);
    }
  });
};
export const getVideoDurationFromVideoFile = (videoFile) => {
  return new Promise((resolve, reject) => {
    var _a;
    try {
      if (videoFile) {
        if (
          (_a =
            videoFile === null || videoFile === void 0
              ? void 0
              : videoFile.type) === null || _a === void 0
            ? void 0
            : _a.match('video')
        ) {
          importFileandPreview(videoFile).then((url) => {
            generateVideoDurationFromUrl(url).then((res) => {
              resolve(res);
            });
          });
        } else {
          generateVideoDurationFromUrl(videoFile).then((res) => {
            resolve(res);
          });
        }
      } else {
        reject('Cannot generate video duration for this video file.');
      }
    } catch (error) {
      reject(error);
    }
  });
};
const generateVideoDurationFromUrl = (url) => {
  return new Promise((resolve, reject) => {
    let video = document.createElement('video');
    video.addEventListener('loadeddata', function () {
      resolve(video.duration);
      window.URL.revokeObjectURL(url);
    });
    video.preload = 'metadata';
    video.src = url;
    video.muted = true;
    video.crossOrigin = 'Anonymous';
    video.playsInline = true;
    video.play();
  });
};
