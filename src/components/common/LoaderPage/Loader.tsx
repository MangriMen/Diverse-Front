import { CircularProgress } from '@mui/material';

import { DefaultFetchFade } from './styles';

export const Loader = () => {
  return (
    <DefaultFetchFade in unmountOnExit>
      <CircularProgress color="secondary" size="4rem" />
    </DefaultFetchFade>
  );
};
