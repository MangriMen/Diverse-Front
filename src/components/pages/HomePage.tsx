import { Box, CircularProgress } from '@mui/material';
import { DefaultFetchFade } from 'components/common/LoaderPage';
import { Post } from 'components/post/Post';
import { API_BASE_URL } from 'consts/endpoints';
import { selectUser } from 'ducks/auth/selectors';
import { useGetPostsQuery } from 'ducks/post/api';
import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PostModel } from 'types/post';

import { StyledContainer } from './styles';

export const HomePage = () => {
  const user = useSelector(selectUser);

  const { data, isLoading } = useGetPostsQuery({
    params: {
      type: 'all',
      user_id: user?.id ?? '',
      count: 20,
    },
  });

  const [userSubscriptionPosts, setUserSubscriptionPosts] =
    useState<ReactNode[]>();

  useEffect(() => {
    if (data?.data != undefined) {
      setUserSubscriptionPosts(
        data?.data.map(value => {
          const preparedPost: PostModel = {
            ...value,
            content: `${API_BASE_URL}${value.content}`,
          };
          return <Post key={value.id} post={preparedPost} />;
        }),
      );
    }
  }, [data?.data]);

  return (
    <StyledContainer>
      {isLoading && (
        <DefaultFetchFade>
          <CircularProgress color="secondary" size="4rem" />
        </DefaultFetchFade>
      )}
      {!isLoading && (
        <Box display="flex" flexDirection="column" gap="2rem">
          {userSubscriptionPosts}
        </Box>
      )}
    </StyledContainer>
  );
};
