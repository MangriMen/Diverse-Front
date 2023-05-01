import '@mui/material';
import { Box } from '@mui/material';
import { StyledButton } from 'components/auth/styles';
import { ImageUpload } from 'components/common/FileUpload/ImageUpload';
import { useDataMutation } from 'ducks/data/api';
import { DataValues } from 'ducks/data/types';
import { useCreatePostMutation } from 'ducks/post/api';
import { PostValues } from 'ducks/post/types';
import { useSnackbar } from 'notistack';
import { FC, useEffect, useState } from 'react';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  StyledCard,
  StyledCardContent,
  StyledCardCreateInput,
} from '../styles';
import { CreatePostFormProps } from './interfaces';

type PostForm = PostValues & DataValues;

const defaultValues = {
  content: '',
  description: '',
};

export const CreatePostForm: FC<CreatePostFormProps> = ({ onClose }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'post' });

  const form = useForm<PostForm>({ defaultValues: defaultValues });

  const [sendPost] = useCreatePostMutation();
  const [sendData] = useDataMutation();

  const [disable, setDisable] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    console.log(disable);
    if (disable) {
      setDisable(true);
      const timer = setTimeout(() => {
        setDisable(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [disable]);

  const onSubmitHandler: SubmitHandler<PostForm> = async data => {
    setDisable(true);
    const formData = new FormData();
    formData.append('file', data.file[0] ?? '');
    try {
      const payload = Object(await sendData(formData).unwrap());
      data.content = payload.id;
      await sendPost({ content: data.content, description: data.description });
      enqueueSnackbar(t('SuccessSendPost'), {
        variant: 'success',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
      onClose();
    } catch {
      enqueueSnackbar(t('ErrorSendPost'), {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    }
  };

  return (
    <FormProvider {...form}>
      <Box component="form" onSubmit={form.handleSubmit(onSubmitHandler)}>
        <StyledCard elevation={0} size="default">
          <ImageUpload name="file" />
          <StyledCardContent size="default">
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
                disabled={disable}
              >
                {t('accept')}
              </StyledButton>
              <StyledButton
                variant="contained"
                color="third"
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
  );
};
