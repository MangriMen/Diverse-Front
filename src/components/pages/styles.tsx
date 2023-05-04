import { Box, Container, styled } from '@mui/material';

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: flex-start;
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

export const BoxSettingsNavigation = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 0.5rem;
`;

export const BoxSettingsView = styled(Box)`
  width: 100%;
`;
