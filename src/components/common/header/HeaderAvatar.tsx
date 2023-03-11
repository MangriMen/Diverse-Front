import { Button, IconButtonProps, styled } from '@mui/material';
import { selectUser } from 'ducks/auth/selectors';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import { StyledAvatar, StyledUsername } from './styles';

const StyledHeaderAvatarButton = styled(Button)`
  box-shadow: none;
  background-color: transparent;
  padding: 0.25rem 0.75rem;

  &:hover {
    background-color: ${props => props.theme.palette.common.hover};
    box-shadow: none;
  }
`;

export const HeaderAvatar: FC<{ onClick: IconButtonProps['onClick'] }> = ({
  onClick,
}) => {
  const user = useSelector(selectUser);

  return (
    <StyledHeaderAvatarButton
      endIcon={<StyledAvatar src="src/assets/images/lucy.jpg" />}
      onClick={onClick}
      variant="contained"
      disableRipple
    >
      <StyledUsername>{user?.username}</StyledUsername>
    </StyledHeaderAvatarButton>
  );
};
