import { Box, BoxProps, Button, styled } from '@mui/material';
import { MediaSkeletonProps } from 'components/post/PostCard';

export const StyledTextButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'fontSize',
})<{ fontSize?: string }>`
  color: ${props => props.color ?? props.theme.palette.common.white};
  font-size: ${props => props.fontSize ?? '1rem'};
  padding: 0;

  &:hover {
    background: #ffffff0f;
  }

  &:focus-visible {
    outline: 2px solid white;
  }
`;

export const SkeletonOnLoadBox = styled(Box, {
  shouldForwardProp: prop => prop !== 'isLoading',
})<MediaSkeletonProps>`
  width: 100%;
  height: 100%;
  display: ${props => (props.isLoading ? 'none' : 'flex')};
`;

export const Span = ({ ...props }: BoxProps) => (
  <Box component="span" {...props} />
);
