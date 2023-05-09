import { Box, BoxProps } from '@mui/material';
import { BaseSyntheticEvent, useState } from 'react';

import { FileUpload } from './FileUpload';
import { AvatarSetting } from './styles';

export const AvatarUpload = ({
  image,
  ...props
}: { image?: string } & BoxProps) => {
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
    <Box width="200px" display="flex" position="relative" {...props}>
      <AvatarSetting src={fileData ? fileData : image}></AvatarSetting>
      <FileUpload name="file" onChange={handleOnChange} isCircle />
    </Box>
  );
};
