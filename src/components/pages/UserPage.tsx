import { CircularProgress, Typography } from '@mui/material';
import { UserFetchFade } from 'components/common/LoaderPage';
import { Post } from 'components/post/Post';
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
import { PostModel } from 'types/post';

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
    if (data?.data != undefined) {
      setUserPosts(
        data?.data.map(value => {
          const preparedPost: PostModel = {
            ...value,
            content: `${API_BASE_URL}${value.content}?width=200`,
          };
          return <Post key={value.id} post={preparedPost} size="small" />;
        }),
      );
    }
  }, [data?.data]);

  return (
    <StyledContainer>
      <StyledUserInfo>
        <StyledProfileAvatar
          src={`${API_BASE_URL}${user?.avatar_url}?width=256`}
        />
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
