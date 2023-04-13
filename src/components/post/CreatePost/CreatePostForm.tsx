import '@mui/material';
import { Alert, Box } from '@mui/material';
import { ImageUpload } from 'components/common/FileUpload/ImageUpload';
import { useDataMutation } from 'ducks/data/api';
import { DataValues } from 'ducks/data/types';
import { usePostsMutation } from 'ducks/post/api';
import { PostValues } from 'ducks/post/types';
import { FC } from 'react';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  StyledButton,
  StyledCard,
  StyledCardContent,
  StyledCardCreateInput,
  StyledModal,
} from '../styles';
import { CreatePostFormProps } from './interfaces';

type PostForm = PostValues & DataValues;

const defaultValues = {
  content: '',
  description: '',
};

export const CreatePostForm: FC<CreatePostFormProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'post' });

  const form = useForm<PostForm>({ defaultValues: defaultValues });

  const [sendPost] = usePostsMutation();
  const [sendData, { isError }] = useDataMutation();

  const onSubmitHandler: SubmitHandler<PostForm> = async data => {
    const formData = new FormData();
    formData.append('file', data.file[0] ?? '');
    try {
      const payload = Object(await sendData(formData).unwrap());
      data.content = payload.id;
      sendPost({ content: data.content, description: data.description });
    } catch {
      return;
    }
  };

  return (
    <StyledModal open={isOpen} onClose={onClose}>
      <Box>
        {isError && <Alert severity="error">{' Err '}</Alert>}
        <FormProvider {...form}>
          <Box component="form" onSubmit={form.handleSubmit(onSubmitHandler)}>
            <StyledCard>
              <ImageUpload name="file" />
              <StyledCardContent gap="2rem">
                <Controller
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <StyledCardCreateInput
                      {...field}
                      variant="filled"
                      label={t('postDescription')}
                      multiline
                      maxRows="15"
                      autoComplete="off"
                      InputProps={{ disableUnderline: true }}
                      inputProps={{
                        maxLength: 2048,
                      }}
                    />
                  )}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <StyledButton
                    variant="contained"
                    color="secondary"
                    disableFocusRipple
                    type="submit"
                  >
                    {t('accept')}
                  </StyledButton>
                  <StyledButton
                    variant="contained"
                    color="secondary"
                    disableFocusRipple
                    onClick={onClose}
                  >
                    {t('cancel')}
                  </StyledButton>
                </Box>
              </StyledCardContent>
            </StyledCard>
          </Box>
        </FormProvider>
      </Box>
    </StyledModal>
  );
};
