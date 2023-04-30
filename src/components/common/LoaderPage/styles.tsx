import styled from '@emotion/styled';
import { Container, Fade } from '@mui/material';

export const ContainerStyled = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const DefaultFetchFade = styled(Fade)`
  transition-delay: '110ms';
`;
