import { GlobalStyles, useTheme } from '@mui/material';

export const GlobalStylesComponent = () => {
  const theme = useTheme();
  return (
    <GlobalStyles
      styles={{
        '::-webkit-scrollbar': {
          width: '4px',
        },
        '::-webkit-scrollbar-thumb': {
          borderRadius: '4px',
          backgroundColor: theme.palette.common.dimmed,
        },
      }}
    />
  );
};
