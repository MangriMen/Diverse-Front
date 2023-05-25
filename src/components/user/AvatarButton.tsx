import { Avatar } from '@mui/material';
import { StyledIconButton } from 'components/post';
import { ROUTE } from 'consts';
import { useNavigate } from 'react-router-dom';

import { UserTooltip } from './UserTooltip';
import { AvatarButtonProps } from './interfaces';

export const AvatarButton = ({ user, ...props }: AvatarButtonProps) => {
  const navigate = useNavigate();

  const navigateToUserPage = () => {
    navigate(`${ROUTE.HOME}${user?.username}`);
  };

  return (
    <UserTooltip user={user}>
      <StyledIconButton onClick={navigateToUserPage} {...props}>
        <Avatar src={`${user?.avatar_url}?width=96`} />
      </StyledIconButton>
    </UserTooltip>
  );
};
