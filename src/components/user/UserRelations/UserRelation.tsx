import { ListItem, ListItemAvatar, ListItemText } from '@mui/material';

import { AvatarButton } from '../AvatarButton';
import { UsernameLinkButton } from '../UsernameLinkButton';
import { ToggleRelationButton } from './ToggleRelationButton';
import { UserRelationProps } from './interfaces';

export const UserRelation = ({ relation }: UserRelationProps) => {
  return (
    <ListItem
      disableGutters
      key={relation.id}
      secondaryAction={<ToggleRelationButton user={relation.relation_user} />}
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
