import { CircularProgress } from '@mui/material';
import { ContainerStyled, UserFetchFade } from './styles';

export const LoaderPage = () => {
  return (
    <ContainerStyled maxWidth={false}>
      <UserFetchFade in unmountOnExit>
        <CircularProgress color="secondary" size="4rem" />
      </UserFetchFade>
    </ContainerStyled>
  );
};
