import { Avatar, AvatarGroup, Typography } from '@mui/material';
import { StyledTextButton } from 'components/common/styles';
import { selectUser } from 'ducks/auth/selectors';
import {
  useGetRelationsCountQuery,
  useGetRelationsQuery,
} from 'ducks/user/api';
import { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { UserRelationProps } from './interfaces';
import { RelationBlock } from './styles';

export const UserRelation = ({ type }: UserRelationProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'user' });

  const user = useSelector(selectUser);

  const { data: dataCount } = useGetRelationsCountQuery({
    path: { user: user?.id ?? '' },
    params: { type: type },
  });

  const { data } = useGetRelationsQuery({
    path: { user: user?.id ?? '' },
    params: { count: 5, type: type },
  });

  const [realCount, setRealCount] = useState(0);

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

    setRealCount(dataCount?.count ?? 0);
  }, [data?.relations, dataCount?.count]);

  return (
    <RelationBlock>
      <StyledTextButton sx={{ color: 'white' }} fontSize="18px">
        {t(type === 'following' ? 'followings' : 'followers')}
        {realCount > 0 && ` (${realCount})`}
      </StyledTextButton>
      {realCount > 0 && <AvatarGroup max={4}>{relationsUsers}</AvatarGroup>}
      {realCount === 0 && (
        <Typography fontSize="14px" color="common.dimmed">
          {t(type === 'following' ? 'noFollowings' : 'noFollowers')}
        </Typography>
      )}
    </RelationBlock>
  );
};
