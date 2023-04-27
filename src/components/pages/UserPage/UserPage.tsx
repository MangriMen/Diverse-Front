import { LoaderPage } from 'components/common/LoaderPage';
import { ROUTE } from 'consts';
import { selectUser } from 'ducks/auth/selectors';
import { useLazyGetUserByUsernameQuery } from 'ducks/user/api';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { UserPageContent } from './UserPageContent';

export const UserPage = () => {
  const { user: username } = useParams();

  const isMe = `/${username}` === ROUTE.ME;

  const localUser = useSelector(selectUser);

  const [user, setUser] = useState(localUser);

  const [getUserByUsername] = useLazyGetUserByUsernameQuery();

  useEffect(() => {
    if (isMe) {
      setUser(localUser);
    } else {
      const fetchUser = async () => {
        const response = await getUserByUsername({
          path: {
            username: username ?? '',
          },
        }).unwrap();

        setUser(response.user);
      };

      fetchUser();
    }
  }, [localUser, username, getUserByUsername, isMe]);

  return (
    <>
      {user === null && <LoaderPage />}
      {user !== null && <UserPageContent isMe={isMe} user={user} />}
    </>
  );
};
