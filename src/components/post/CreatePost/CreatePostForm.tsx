import '@mui/material';
import { Box, CardMedia } from '@mui/material';
import { FC } from 'react';
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

export const CreatePostForm: FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'post' });

  return (
    <StyledModal open={isOpen} onClose={onClose}>
      <StyledCard>
        <StyledCardMediaBox>
          <StyledCardMedia
            component="img"
            image="src/assets/images/searchPic.svg"
          />
        </StyledCardMediaBox>
        <StyledCardContent gap="2rem">
          <StyledCardCreateInput
            variant="filled"
            label="Описание к посту"
            multiline
            maxRows="15"
            autoComplete="off"
            InputProps={{ disableUnderline: true }}
            inputProps={{
              maxLength: 2048,
            }}
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
              type="submit"
              onClick={onClose}
            >
              {t('cancel')}
            </StyledButton>
          </Box>
        </StyledCardContent>
      </StyledCard>
    </StyledModal>
  );
};
