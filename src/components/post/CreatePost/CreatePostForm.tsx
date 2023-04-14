import '@mui/material';
import { Alert, Box, Snackbar } from '@mui/material';
import { ImageUpload } from 'components/common/FileUpload/ImageUpload';
import { useDataMutation } from 'ducks/data/api';
import { DataValues } from 'ducks/data/types';
import { usePostsMutation } from 'ducks/post/api';
import { PostValues } from 'ducks/post/types';
import { FC, useState } from 'react';
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

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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
                    onClick={handleClick}
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
                  {isError && (
                    <Snackbar
                      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                      autoHideDuration={5000}
                      open={open}
                      onClose={handleClose}
                    >
                      <Alert severity="error">{t('ErrorSendPost')}</Alert>
                    </Snackbar>
                  )}
                </Box>
              </StyledCardContent>
            </StyledCard>
          </Box>
        </FormProvider>
      </Box>
    </StyledModal>
  );
};
