import { CircularProgress } from '@mui/material';

import { ContainerStyled, DefaultFetchFade } from './styles';

export const LoaderPage = () => {
  return (
    <ContainerStyled maxWidth={false}>
      <DefaultFetchFade in unmountOnExit>
        <CircularProgress color="secondary" size="4rem" />
      </DefaultFetchFade>
    </ContainerStyled>
  );
};
