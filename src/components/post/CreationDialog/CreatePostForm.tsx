import '@mui/material';
import { Box, InputAdornment, TextField, styled } from '@mui/material';
import { StyledButton } from 'components/common';
import { ImageUpload } from 'components/common/FileUpload/ImageUpload';
import { PostCardContent, PostCardStyled } from 'components/post/PostCard';
import {
  POST_DESCRIPTION_MAX_ROWS,
  SHAPE_CONSTRAINTS,
  SUBMIT_TIMEOUT,
} from 'consts';
import { useDataMutation } from 'ducks/data/api';
import { useCreatePostMutation } from 'ducks/post/api';
import { BaseEmoji } from 'emoji-mart/dist-es';
import { OptionsObject, useSnackbar } from 'notistack';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EmojiButton } from '../EmojiButton';
import { CreatePostFormProps, PostForm } from './interfaces';

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

const postSize = 'default';

const DescriptionInput = styled(TextField)`
  & .MuiFilledInput-root {
    border-radius: 4;
    background-color: ${props => props.theme.palette.common.third};
    border-bottom: 2px solid;
    border-color: ${props => props.theme.palette.secondary.main};
    &.Mui-Focused {
      background-color: ${props => props.theme.palette.primary.dark};
    }
  }
  & .MuiFormLabel-root.Mui-focused {
    color: ${props => props.theme.palette.secondary.main};
  }
`;

export const CreatePostForm = ({ onClose }: CreatePostFormProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'post' });

  const form = useForm<PostForm>({ defaultValues: defaultValues });

  const [sendPost] = useCreatePostMutation();
  const [sendData] = useDataMutation();

  const [disable, setDisable] = useState(false);

  const [aboutLength, setAboutLength] = useState(0);

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

  const handleEmojiSelect = (emoji: BaseEmoji) => {
    form.setValue(
      'description',
      `${form.getValues('description')}${emoji.native}`,
    );
  };

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
    } catch {
      enqueueSnackbar(
        t(PostSnackOptions.error.title),
        PostSnackOptions.error.options,
      );
    }
  };

  const handleChangeAbout = (event: ChangeEvent<HTMLInputElement>): string => {
    setAboutLength(event.target.value.length);
    return event.target.value;
  };

  return (
    <FormProvider {...form}>
      <Box
        display="flex"
        justifyContent="center"
        component="form"
        onSubmit={form.handleSubmit(onSubmitHandler)}
      >
        <PostCardStyled elevation={0} size={postSize}>
          <ImageUpload name="file" />
          <PostCardContent size={postSize}>
            <Controller
              control={form.control}
              name="description"
              render={({ field }) => (
                <DescriptionInput
                  {...field}
                  variant="filled"
                  label={t('postDescription')}
                  multiline
                  maxRows={POST_DESCRIPTION_MAX_ROWS}
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <InputAdornment
                        style={{ alignSelf: 'flex-start' }}
                        position="end"
                      >
                        <EmojiButton
                          value="emoji"
                          onEmojiSelect={handleEmojiSelect}
                        />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    maxLength: SHAPE_CONSTRAINTS.DESCRIPTION_MAX,
                  }}
                  helperText={`${aboutLength}/${SHAPE_CONSTRAINTS.DESCRIPTION_MAX}`}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    field.onChange(handleChangeAbout(event))
                  }
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
          </PostCardContent>
        </PostCardStyled>
      </Box>
    </FormProvider>
  );
};
