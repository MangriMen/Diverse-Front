import { CircularProgress, Container, Fade, styled } from '@mui/material';

const ContainerStyled = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoaderPage = () => {
  return (
    <ContainerStyled maxWidth={false}>
      <Fade
        in
        style={{
          transitionDelay: '110ms',
        }}
        unmountOnExit
      >
        <CircularProgress color="secondary" size="4rem" />
      </Fade>
    </ContainerStyled>
  );
};
