import { CircularProgress, CircularProgressProps } from '@mui/material';

import { DefaultFetchFade } from './styles';

export const Loader = ({ ...props }: CircularProgressProps) => {
  return (
    <DefaultFetchFade in unmountOnExit>
      <CircularProgress color="secondary" size="4rem" {...props} />
    </DefaultFetchFade>
  );
};
