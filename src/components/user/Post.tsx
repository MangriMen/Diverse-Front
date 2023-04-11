import { Box } from '@mui/material';
import { FC } from 'react';

export const Post: FC<{ description: string }> = ({ description }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center',
        alignItems: 'center',
        border: '2px solid red',
        width: '128px',
        height: '128px',
      }}
    >
      {description}
    </Box>
  );
};
