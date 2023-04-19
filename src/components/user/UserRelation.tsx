import { Avatar, AvatarGroup } from '@mui/material';
import { StyledTextButton } from 'components/common/styles';
import { selectUser } from 'ducks/auth/selectors';
import { useGetRelationsQuery } from 'ducks/user/api';
import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RelationBlock } from './styles';

export const UserRelation = ({
  title,
  type,
}: {
  title: string;
  type: string;
}) => {
  const user = useSelector(selectUser);

  const { data } = useGetRelationsQuery({
    path: { user: user?.id ?? '' },
    params: { count: 20, type: type },
  });

  const [relationsUsers, setRelationsUsers] = useState<ReactElement[]>();

  useEffect(() => {
    setRelationsUsers(
      data?.relations.map(relation => (
        <Avatar
          key={relation.id}
          src={`${relation.relation_user.avatar_url}?width=96`}
        />
      )),
    );
  }, [data?.relations]);

  return (
    <RelationBlock>
      <StyledTextButton sx={{ color: 'white' }} fontSize="18px">
        {title}
      </StyledTextButton>
      <AvatarGroup max={4}>{relationsUsers}</AvatarGroup>
    </RelationBlock>
  );
};
