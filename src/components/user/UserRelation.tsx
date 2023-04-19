import { Avatar, AvatarGroup } from '@mui/material';
import { StyledTextButton } from 'components/common/styles';
import { API_BASE_URL } from 'consts/endpoints';
import { ReactElement, useEffect, useState } from 'react';
import { Relation } from 'types/user';

import { RelationBlock } from './styles';

export const UserRelation = ({ relations }: { relations: Relation[] }) => {
  const [relationsUsers, setRelationsUsers] = useState<ReactElement[]>();

  useEffect(() => {
    setRelationsUsers(
      relations.map(relation => (
        <Avatar
          key={relation.id}
          src={
            relation.relation_user.avatar_url == null
              ? undefined
              : `${API_BASE_URL}${relation.relation_user.avatar_url}?width=96`
          }
        />
      )),
    );
  }, [relations]);

  return (
    <RelationBlock>
      <StyledTextButton sx={{ color: 'white' }} fontSize="18px">
        {'Followings'}
      </StyledTextButton>
      <AvatarGroup max={4}>{relationsUsers}</AvatarGroup>
    </RelationBlock>
  );
};
