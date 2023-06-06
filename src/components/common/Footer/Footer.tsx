import { Box, styled } from '@mui/material';

const BoxStyled = styled(Box)`
  margin-bottom: 1rem;
` as typeof Box;

export const Footer = () => {
  return <BoxStyled component="footer" />;
};
