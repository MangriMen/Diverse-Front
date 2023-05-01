import { Skeleton, SkeletonProps } from '@mui/material';

export const SkeletonStyled = (props: SkeletonProps) => {
  return <Skeleton animation="wave" {...props} />;
};
