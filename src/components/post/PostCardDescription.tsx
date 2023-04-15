import { Box, Collapse, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { PostCardDescriptionProps } from './interfaces';
import { StyledDescriptionTypography, StyledTextButton } from './styles';

export const PostCardDescription: FC<PostCardDescriptionProps> = ({
  expanded,
  handleExpandClick,
  description,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'post' });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
        position: 'relative',
      }}
    >
      <Collapse
        in={expanded}
        collapsedSize="105px"
        sx={{
          overflow: expanded ? 'scroll' : 'hidden',
          maxHeight: '86%',
        }}
      >
        <StyledDescriptionTypography>{description}</StyledDescriptionTypography>
      </Collapse>
      <StyledTextButton
        disableRipple
        sx={{
          alignSelf: 'flex-end',
          position: !expanded ? 'absolute' : '',
          right: 0,
          bottom: 0,
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
        onClick={handleExpandClick}
      >
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Box
            sx={{
              background:
                'linear-gradient(90deg,rgba(26, 28, 31, 0) 0%, rgba(26, 28, 31, 0.99) 87%, rgba(26, 28, 31, 1) 100%)',
              width: '32px',
            }}
          />
          <Box sx={{ backgroundColor: 'primary.dark' }}>
            <Typography color="common.dimmed" fontSize="14px">
              {'...'}
              {!expanded ? t('more') : t('less')}
            </Typography>
          </Box>
        </Box>
      </StyledTextButton>
    </Box>
  );
};
