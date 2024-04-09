import {useState} from 'react';
import {useUploadTasksMutation} from '@/slices/task/task.rtk';
import {Input} from '..';

export const UploadFileButton = () => {
  const [uploadTask] = useUploadTasksMutation();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    uploadTask({file: selectedFile});
    setFile(selectedFile);
  };

  return <Input variant="primary" type="file" onChange={handleFileChange} />;
};
