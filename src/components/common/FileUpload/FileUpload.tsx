import { IMAGE_ALLOWED_TYPES } from 'consts/data';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { FileUploadProps } from './interfaces';
import { CircleStyledFileInput, StyledFileInput } from './styles';

export const FileUpload: FC<FileUploadProps> = ({
  name,
  onChange,
  isCircle,
}) => {
  const { register } = useFormContext();

  return (
    <>
      {!isCircle ? (
        <StyledFileInput
          component="input"
          {...register(name, {
            onChange: onChange,
          })}
          accept={IMAGE_ALLOWED_TYPES}
          type="file"
        />
      ) : (
        <CircleStyledFileInput
          component="input"
          {...register(name, {
            onChange: onChange,
          })}
          accept={IMAGE_ALLOWED_TYPES}
          type="file"
        />
      )}
    </>
  );
};
