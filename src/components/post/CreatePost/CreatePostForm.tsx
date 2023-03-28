import '@mui/material';
import { Box } from '@mui/material';
import { usePostsMutation } from 'ducks/post/api';
import { PostValues } from 'ducks/post/types';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  StyledButton,
  StyledCard,
  StyledCardContent,
  StyledCardCreateInput,
  StyledCardMedia,
  StyledCardMediaBox,
  StyledModal,
} from '../styles';

const defaultValues = {
  content: '',
  description: '',
};

export const CreatePostForm: FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'post' });

  const [sendPost] = usePostsMutation();

  const { control, handleSubmit } = useForm<PostValues>({
    defaultValues: defaultValues,
  });
  const onSubmit: SubmitHandler<PostValues> = data => {
    sendPost(data);
  };

  return (
    <StyledModal open={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledCard>
          <StyledCardMediaBox>
            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <StyledCardMedia
                  {...field}
                  component="img"
                  image="src/assets/images/searchPic.svg"
                />
              )}
            />
          </StyledCardMediaBox>
          <StyledCardContent gap="2rem">
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <StyledCardCreateInput
                  variant="filled"
                  {...field}
                  label="Описание к посту"
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
      </form>
    </StyledModal>
  );
};
