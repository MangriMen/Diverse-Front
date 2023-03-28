import { GlobalStyles } from '@mui/material';

export const GlobalStylesComponent = () => {
  return (
    <GlobalStyles
      styles={{
        '::-webkit-scrollbar': {
          width: '4px',
        },
        '::-webkit-scrollbar-thumb': {
          borderRadius: '4px',
          backgroundColor: '#9e9e9e',
        },
      }}
    />
  );
};
