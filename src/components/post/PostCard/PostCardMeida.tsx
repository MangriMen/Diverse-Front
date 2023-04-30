import { Box } from '@mui/material';
import React, { useCallback, useState } from 'react';

import { PostCardMediaProps } from '../interfaces';
import {
  CardMediaSkeleton,
  StyledCardMedia,
  StyledCardMediaBox,
} from '../styles';

export const PostCardMeida = ({ size, image }: PostCardMediaProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoaded = useCallback(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  return (
    <StyledCardMediaBox size={size}>
      <CardMediaSkeleton
        size={size}
        variant="rectangular"
        isLoading={isLoading}
      />
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: isLoading ? 'none' : 'flex',
        }}
      >
        <StyledCardMedia
          component="img"
          onLoad={handleImageLoaded}
          image={image}
        />
      </Box>
    </StyledCardMediaBox>
  );
};
