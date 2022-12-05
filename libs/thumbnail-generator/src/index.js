import { useState } from 'react';

import {
  generateVideoThumbnails,
  importFileandPreview,
} from './lib/thumbnail-generator';

const useVideoThumbnailsForm = () => {
  const type = 'file';

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [inputFile, setInputFile] = useState(null);
  const [thumbnails, setThumbnails] = useState();
  const [selectedThumbnail, setSelectedThumbnail] = useState();

  const loadAssync = false;
  const numberOfThumbnails = 2;

  const clearForm = () => {
    setSelectedThumbnail('');
    setInputFile(null);
    setInputUrl('');
    setIsError('');
  };

  const handleInputFileChange = (event) => {
    var _a, _b;
    const selectedFile =
      (_b =
        (_a = event.target) === null || _a === void 0 ? void 0 : _a.files) ===
        null || _b === void 0
        ? void 0
        : _b[0];
    if (
      selectedFile === null || selectedFile === void 0
        ? void 0
        : selectedFile.type.includes('video')
    ) {
      clearForm();
      importFileandPreview(selectedFile).then((url) => {
        setInputFile(selectedFile);
        setInputUrl(url);
      });
    }
  };

  const updateThumbnails = (url, index) => {
    setThumbnails((prev) => {
      const newThumbnails = [...prev];
      newThumbnails[index] = url;
      return newThumbnails;
    });
  };

  const handleGenerateThumbnails = async () => {
    const input = inputFile;
    const callback = loadAssync ? updateThumbnails : undefined;
    setThumbnails(loadAssync ? Array(numberOfThumbnails).fill('') : ['']);
    setIsError('');
    setIsLoading(true);
    generateVideoThumbnails(input, numberOfThumbnails, type, callback)
      .then((res) => {
        setThumbnails(res);
      })
      .catch((err) => {
        setIsError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    handleGenerateThumbnails,
    inputUrl,
    isError,
    isLoading,
    loadAssync,
    numberOfThumbnails,
    selectedThumbnail,
    setInputUrl,
    setIsError,
    setSelectedThumbnail,
    thumbnails,
    handleInputFileChange,
  };
};
export default useVideoThumbnailsForm;
