import { Box, BoxProps } from '@mui/material';
import { AVATAR_SIZE } from 'consts/user';
import { useSnackbar } from 'notistack';
import { BaseSyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FileUpload } from './FileUpload';
import { AvatarSetting } from './styles';

export const AvatarUpload = ({
  image,
  ...props
}: { image?: string } & BoxProps) => {
  const [fileData, setFileData] = useState<string | undefined>(undefined);

  const { enqueueSnackbar } = useSnackbar();

  const { t } = useTranslation('translation', { keyPrefix: 'settings' });

  const handleOnChange = (event: BaseSyntheticEvent) => {
    const file = event.target.files[0];
    if (file === undefined) {
      return;
    }

    if (file.size > AVATAR_SIZE) {
      enqueueSnackbar(t('avatarSizeToLarge'), {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
      setFileData(undefined);
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
