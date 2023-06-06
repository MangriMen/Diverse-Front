import { Box, Container, styled } from '@mui/material';

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 1rem;
  justify-content: flex-start;

  ${props => props.theme.breakpoints.down('fold')} {
    padding: 0;
  }
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
  ${props => props.theme.breakpoints.down('sm')} {
    flex-direction: row;
  }
`;

export const BoxSettingsView = styled(Box)`
  width: 100%;
`;

export const SettingsContainerStyled = styled(Container)`
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 1rem;
  justify-content: flex-start;
  ${props => props.theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

export const HomePageLayout = styled(BaseLayout)`
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
`;
