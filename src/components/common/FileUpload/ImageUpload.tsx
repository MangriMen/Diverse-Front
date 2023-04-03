import { StyledCardMedia, StyledCardMediaBox } from 'components/post/styles';
import { BaseSyntheticEvent, FC, useState } from 'react';

import { FileUpload } from './FileUpload';
import { FileUploadProps } from './interfaces';

export const ImageUpload: FC<FileUploadProps> = ({ name }) => {
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
    <StyledCardMediaBox>
      <StyledCardMedia
        component="img"
        image={fileData ?? 'src/assets/images/searchPic.svg'}
      />
      <FileUpload name={name} onChange={handleOnChange} />
    </StyledCardMediaBox>
  );
};
