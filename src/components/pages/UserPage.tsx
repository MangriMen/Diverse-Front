import { CircularProgress, Typography } from '@mui/material';
import { UserFetchFade } from 'components/common/LoaderPage';
import { Post } from 'components/user/Post';
import {
  StyledProfileAvatar,
  StyledUserInfo,
  StyledUserPosts,
} from 'components/user/styles';
import { selectUser } from 'ducks/auth/selectors';
import { useGetPostsQuery } from 'ducks/post/api';
import { ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';

import { StyledContainer } from './styles';

export const UserPage = () => {
  const user = useSelector(selectUser);

  const { data, isLoading } = useGetPostsQuery({
    params: {
      type: 'all',
      user_id: user?.id ?? '0000-0000-0000-0000',
      count: 20,
    },
  });

  const [userPosts] = useState<ReactNode[]>(() => {
    if (data?.posts == undefined) {
      return [];
    }

    return data?.posts.map(value => (
      <Post key={value.id} description={value.description} />
    ));
  });

  // useEffect(() => {});

  return (
    <StyledContainer>
      <StyledUserInfo>
        <StyledProfileAvatar src={user?.avatar_url} />
        <Typography fontSize="24px">{`@${user?.username}`}</Typography>
        <Typography>{user?.name}</Typography>
      </StyledUserInfo>
      {isLoading && (
        <UserFetchFade>
          <CircularProgress color="secondary" size="4rem" />
        </UserFetchFade>
      )}
      {!isLoading && <StyledUserPosts>{userPosts}</StyledUserPosts>}
    </StyledContainer>
  );
};
