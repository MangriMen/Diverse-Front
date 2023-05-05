import '@mui/material';
import { Box } from '@mui/material';
import { StyledButton } from 'components/auth/styles';
import { ImageUpload } from 'components/common/FileUpload/ImageUpload';
import {
  POST_DESCRIPTION_MAX_ROWS,
  SHAPE_CONSTRAINTS,
  SUBMIT_TIMEOUT,
} from 'consts';
import { useDataMutation } from 'ducks/data/api';
import { DataValues } from 'ducks/data/types';
import { useCreatePostMutation } from 'ducks/post/api';
import { PostValues } from 'ducks/post/types';
import { OptionsObject, useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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

interface PostSnackOption {
  title: string;
  options: OptionsObject;
}

const PostSnackOptions: {
  success: PostSnackOption;
  error: PostSnackOption;
} = {
  success: {
    title: 'successSendPost',
    options: {
      variant: 'success',
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
    },
  },
  error: {
    title: 'errorSendPost',
    options: {
      variant: 'error',
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
    },
  },
};

export const CreatePostForm = ({ onClose }: CreatePostFormProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'post' });

  const navigate = useNavigate();

  const form = useForm<PostForm>({ defaultValues: defaultValues });

  const [sendPost] = useCreatePostMutation();
  const [sendData] = useDataMutation();

  const [disable, setDisable] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (disable) {
      setDisable(true);
      const timer = setTimeout(() => {
        setDisable(false);
      }, SUBMIT_TIMEOUT.CREATE_POST);
      return () => clearTimeout(timer);
    }
  }, [disable]);

  const onSubmitHandler: SubmitHandler<PostForm> = async data => {
    setDisable(true);

    const formData = new FormData();
    formData.append('file', data.file[0] ?? '');
    try {
      const { path } = await sendData(formData).unwrap();

      data.content = path;

      const { content, description } = data;
      await sendPost({ content, description });

      enqueueSnackbar(
        t(PostSnackOptions.success.title),
        PostSnackOptions.success.options,
      );

      onClose();

      navigate(0);
    } catch {
      enqueueSnackbar(
        t(PostSnackOptions.error.title),
        PostSnackOptions.error.options,
      );
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
                  maxRows={POST_DESCRIPTION_MAX_ROWS}
                  autoComplete="off"
                  InputProps={{ disableUnderline: true }}
                  inputProps={{
                    maxLength: SHAPE_CONSTRAINTS.DESCRIPTION_MAX,
                  }}
                />
              )}
            />
            <Box display="flex" justifyContent="space-between">
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
