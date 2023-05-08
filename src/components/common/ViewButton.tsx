import { Box, ButtonProps, styled } from '@mui/material';

import { StyledButton } from './styles';

export interface ViewButtonProps extends ButtonProps {
  active?: Boolean;
}

export const ButtonStyled = styled(StyledButton, {
  shouldForwardProp: prop => prop !== 'acitve',
})<{ active?: ViewButtonProps['active'] }>`
  overflow: hidden;
  padding: 0 0.25rem;
  width: 10rem;
  height: 2rem;
  font-size: 1rem;
  justify-content: flex-start;
  color: ${props => props.theme.palette.common.white};
  background-color: ${props => (props.active ? '' : 'none')};
  box-shadow: none;
  &:hover {
    box-shadow: none;
  }
`;

export const PickSeparator = styled(Box, {
  shouldForwardProp: prop => prop !== 'active' && prop !== 'opacity',
})<{ active?: ViewButtonProps['active']; opacity: string }>`
  && {
    opacity: ${props => props.opacity};
  }
  width: 0.2rem;
  border-radius: 1rem;
  height: 1rem;
  background-color: ${props => props.theme.palette.secondary.dark};
`;

export const ViewButton = ({ active, ...props }: ViewButtonProps) => {
  return (
    <ButtonStyled
      color="transparentButton"
      variant={active ? 'contained' : 'text'}
      startIcon={
        <PickSeparator
          opacity={active ? '1.0' : '0.0'}
          className={active ? 'animation' : 'animation-reverse'}
          active
        />
      }
      {...props}
    />
  );
};
