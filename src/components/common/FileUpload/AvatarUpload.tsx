import { Box } from '@mui/material';
import { BaseSyntheticEvent, useState } from 'react';

import { FileUpload } from './FileUpload';
import { AvatarSetting } from './styles';

export const AvatarUpload = () => {
  const [fileData, setFileData] = useState<string | undefined>(undefined);

  const handleOnChange = (event: BaseSyntheticEvent) => {
    const file = event.target.files[0];
    if (file === undefined) {
      return;
    }

    const fr = new FileReader();
    fr.onload = onLoadImage;
    fr.readAsDataURL(file);
  };

  function onLoadImage(event: ProgressEvent<FileReader>) {
    if (typeof event.target?.result === 'string') {
      setFileData(event.target.result);
    }
  }

  return (
    <Box display="flex" position="relative">
      {fileData && <AvatarSetting src={fileData} />}
      {!fileData && <AvatarSetting />}
      <FileUpload name="file" onChange={handleOnChange} />
    </Box>
  );
};
