import { Box, CircularProgress, Typography } from '@mui/material';
import { DefaultFetchFade } from 'components/common/LoaderPage';
import { Post } from 'components/post/Post';
import { UserRelation } from 'components/user/UserRelation';
import {
  StyledProfileAvatar,
  StyledUserInfo,
  StyledUserPosts,
} from 'components/user/styles';
import { API_BASE_URL } from 'consts/endpoints';
import { selectUser } from 'ducks/auth/selectors';
import { useGetPostsQuery } from 'ducks/post/api';
import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { StyledContainer } from './styles';

export const UserPage = () => {
  const user = useSelector(selectUser);

  const { data, isLoading } = useGetPostsQuery({
    params: {
      type: 'user',
      user_id: user?.id ?? '',
      count: 20,
    },
  });

  const [userPosts, setUserPosts] = useState<ReactNode[]>();

  useEffect(() => {
    setUserPosts(
      data?.data.map(post => <Post key={post.id} post={post} size="small" />),
    );
  }, [data?.data]);

  return (
    <StyledContainer>
      <StyledUserInfo>
        <UserRelation title="Followers" type="follower" />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap="1rem"
        >
          <StyledProfileAvatar
            src={
              user?.avatar_url == null
                ? undefined
                : `${API_BASE_URL}${user?.avatar_url}?width=256`
            }
          />
          <Typography fontSize="24px">{`@${user?.username}`}</Typography>
          <Typography>{user?.name}</Typography>
        </Box>
        <UserRelation title="Followings" type="following" />
      </StyledUserInfo>
      {isLoading && (
        <DefaultFetchFade>
          <CircularProgress color="secondary" size="4rem" />
        </DefaultFetchFade>
      )}
      {!isLoading && <StyledUserPosts>{userPosts}</StyledUserPosts>}
    </StyledContainer>
  );
};
