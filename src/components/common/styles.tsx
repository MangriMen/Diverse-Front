import { Button, styled } from '@mui/material';

export const StyledTextButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'fontSize',
})<{ fontSize?: string }>`
  color: ${props => props.color ?? props.theme.palette.common.white};
  font-size: ${props => props.fontSize ?? '1rem'};
  padding: 0 4px;
  &:hover {
    background: #ffffff0f;
  }
  &:focus-visible {
    outline: 2px solid white;
  }
`;
