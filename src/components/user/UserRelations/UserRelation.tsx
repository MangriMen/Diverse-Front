import { ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { selectUser } from 'ducks/auth/selectors';
import { useSelector } from 'react-redux';

import { AvatarButton } from '../AvatarButton';
import { UsernameLinkButton } from '../UsernameLinkButton';
import { ToggleRelationButton } from './ToggleRelationButton';
import { UserRelationProps } from './interfaces';

export const UserRelation = ({ relation }: UserRelationProps) => {
  const user = useSelector(selectUser);

  return (
    <ListItem
      disableGutters
      key={relation.id}
      secondaryAction={
        <ToggleRelationButton
          visible={user?.id !== relation.relation_user.id}
          user={relation.relation_user}
        />
      }
    >
      <ListItemAvatar>
        <AvatarButton user={relation.relation_user} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <UsernameLinkButton style={{ flex: 1 }} user={relation.relation_user}>
            {relation.relation_user.username}
          </UsernameLinkButton>
        }
      />
    </ListItem>
  );
};
