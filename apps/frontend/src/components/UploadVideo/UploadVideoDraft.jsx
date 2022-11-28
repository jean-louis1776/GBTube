import { useState } from 'react';
import VideoController from '../../controllers/VideoController';
import { useNavigate, useParams } from 'react-router-dom';

const UploadVideoDraft = () => {
  const { idList } = useParams();
  let [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const handleChangeFile = (evt) => {
    setSelectedFile(evt.target.files[0]);
    console.log(evt.target.files);
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (evt.target.title.value === '' || !selectedFile) {
      console.log('title or file not set');
      return;
    }
    const formData = new FormData(evt.target);
    formData.append('idList', idList);
    for(const pair of formData.entries()) {
      console.log(pair);
    }
    try {
      await VideoController.addVideo(formData);
      navigate(-1);
    } catch {
      console.log('Load video failed');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name='title' type='text' placeholder='Title' /><br/>
      <input name='description' type='text' placeholder='Description' /><br/>
      <input name='category' type='text' placeholder='Category' /><br/>
      <input name="videoName" onChange={handleChangeFile} type='file' accept="video/*,.3gp,.avi,.flv,.m4v,.mkv,.mov,.mp4,.mpeg,.mpg,.wmv,.swf,.webm" /><br/>
      <p style={{color: 'white'}}>{selectedFile ? selectedFile.name : 'No videos chosen'}</p>
      <button>Отправить</button>
    </form>
  );
}

export default UploadVideoDraft;
