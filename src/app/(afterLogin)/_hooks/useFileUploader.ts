import { ChangeEvent, useState } from 'react';
import Resizer from 'react-image-file-resizer';

const useFileUploader = () => {
  const [encodedFile, setEncodedFile] = useState('');

  const imgUpload = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      try {
        Resizer.imageFileResizer(file, 500, 500, 'JPEG', 100, 0, (image) => {
          resolve(image as string | PromiseLike<string>);
        });
      } catch (err: any) {
        reject(err);
      }
    });
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      imgUpload(e.target.files[0])
        .then((result) => setEncodedFile(result))
        .catch((error) => {
          console.error('Image upload failed:', error);
          e.target.value = '';
        });
    }
  };

  return { encodedFile, setEncodedFile, onChangeFile };
};

export default useFileUploader;
