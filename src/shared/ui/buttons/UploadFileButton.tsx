import {IconButton, useDisclosure} from '@chakra-ui/react';
import {ChangeEvent, ReactElement, useState} from 'react';
import {MdFileUpload} from 'react-icons/md';
import {uploadTaskSchema} from '@/shared/lib/yup/uploadTask.schema';
import {useUploadTasksMutation} from '@/slices/task/task.rtk';
import {ConfirmModal, Input} from '..';

export const UploadFileButton = (): ReactElement => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [uploadTask] = useUploadTasksMutation();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    try {
      const selectedFile = event.target.files?.[0];
      await uploadTaskSchema.validate({file: selectedFile});
      if (selectedFile) {
        setFile(selectedFile);
        setError('');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const onConfirm = async (): Promise<void> => {
    const formData = new FormData();
    formData.append('file', file as File);
    await uploadTask({file: formData});
    setFile(null);
  };

  return (
    <>
      <IconButton variant="primary" aria-label="Upload" icon={<MdFileUpload />} onClick={onOpen} />
      {isOpen && (
        <ConfirmModal
          title="Upload tasks (.xls and .xlsx are allowed)"
          isOpen={isOpen}
          onConfirm={onConfirm}
          onClose={onClose}
          isDisabled={Boolean(error) || !file}
        >
          <Input error={error} variant="primary" type="file" onChange={handleFileChange} />
        </ConfirmModal>
      )}
    </>
  );
};
