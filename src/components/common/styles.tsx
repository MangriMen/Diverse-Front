import {
  Box,
  BoxProps,
  Button,
  IconButton,
  ToggleButton,
  styled,
} from '@mui/material';
import { MediaSkeletonProps } from 'components/post/PostCard';

export const IconButtonStyled = styled(IconButton)`
  padding: 0.25rem;
  border-radius: 0.25rem;

  &:hover {
    background: ${props => props.theme.palette.transparentButton.light};
  }

  &:active {
    background: ${props => props.theme.palette.transparentButton.dark};
  }

  &:focus-visible {
    outline: 1px solid white;
  }
`;

export const ToggleButtonStyled = styled(ToggleButton)`
  border: none;
  padding: 0.25rem;
  border-radius: 0.25rem;

  &:hover {
    background: ${props => props.theme.palette.transparentButton.light};
  }

  &:active {
    background: ${props => props.theme.palette.transparentButton.dark};
  }

  &:focus-visible {
    outline: 1px solid white;
  }
`;

export const StyledTextButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'fontSize',
})<{ fontSize?: string }>`
  color: ${props => props.color ?? props.theme.palette.common.white};
  font-size: ${props => props.fontSize ?? '1rem'};
  min-width: 0;
  padding: 0 0.25rem;

  &:hover {
    background: #ffffff0f;
  }

  &:focus-visible {
    outline: 2px solid white;
  }
`;

export const StyledButton = styled(Button)`
  padding: 4px 16px;
  font-size: 18px;
  &:focus-visible {
    outline: 2px solid;
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
