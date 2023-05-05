import { Box, Container, styled } from '@mui/material';

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

export const BaseLayout = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const CenterLayout = styled(BaseLayout)`
  justify-content: center;
  align-items: center;
`;

export const HomePageLayout = styled(BaseLayout)`
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
`;
