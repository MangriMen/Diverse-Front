import { selectUser } from 'ducks/auth/selectors';
import { useGetRelationsQuery } from 'ducks/user/api';
import { useSelector } from 'react-redux';

import { UserRelation } from './UserRelation';

export const UserFollowers = () => {
  const user = useSelector(selectUser);

  const { data } = useGetRelationsQuery({
    path: { user: user?.id ?? '' },
    params: { count: 20, type: 'follower' },
  });

  return <UserRelation relations={data?.relations ?? []} />;
};
