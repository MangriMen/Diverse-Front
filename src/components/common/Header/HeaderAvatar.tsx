import { IconButtonProps } from '@mui/material';
import { selectUser } from 'ducks/auth/selectors';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import {
  StyledAvatar,
  StyledHeaderAvatarButton,
  StyledUsername,
} from './styles';

export const HeaderAvatar: FC<{ onClick: IconButtonProps['onClick'] }> = ({
  onClick,
}) => {
  const user = useSelector(selectUser);

  return (
    <StyledHeaderAvatarButton
      endIcon={<StyledAvatar src={`${user?.avatar_url}?width=64`} />}
      onClick={onClick}
      variant="contained"
      disableRipple
    >
      <StyledUsername>{user?.username}</StyledUsername>
    </StyledHeaderAvatarButton>
  );
};
