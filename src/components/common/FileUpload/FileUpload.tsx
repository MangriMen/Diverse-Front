import { IMAGE_ALLOWED_TYPES } from 'consts/data';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { FileUploadProps } from './interfaces';
import { StyledFileInput } from './styles';

export const FileUpload: FC<FileUploadProps> = ({ name, onChange }) => {
  const { register } = useFormContext();

  return (
    <StyledFileInput
      component="input"
      {...register(name, {
        onChange: onChange,
      })}
      accept={IMAGE_ALLOWED_TYPES}
      type="file"
    />
  );
};
