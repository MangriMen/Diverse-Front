import { Typography } from '@mui/material';
import { Post } from 'components/post/Post';
import { UserRelation } from 'components/user/UserRelation';
import {
  AvatarWithName,
  MainUserInfo,
  StyledProfileAvatar,
  StyledUserPosts,
  UserDescription,
  UserDescriptionText,
  UserInfo,
  UsernameAndName,
} from 'components/user/styles';
import { selectUser } from 'ducks/auth/selectors';
import { useGetPostsQuery } from 'ducks/post/api';
import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { StyledContainer } from './styles';

interface LastSeenPost {
  id?: string;
  created_at?: string;
}

const lastSeenPostDefaultValues: LastSeenPost = {};

export const UserPage = () => {
  const user = useSelector(selectUser);

  const [lastSeenPost, setLastSeenPost] = useState(lastSeenPostDefaultValues);
  const [posts, setPosts] = useState<ReactElement[]>();

  const { data, isFetching } = useGetPostsQuery({
    params: {
      type: 'user',
      user_id: user?.id ?? '',
      last_seen_post_id: lastSeenPost.id,
      last_seen_post_created_at: lastSeenPost.created_at,
      count: 10,
    },
  });

  useEffect(() => {
    const onScroll = () => {
      const scrolledToButtom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToButtom && !isFetching) {
        if (data !== undefined) {
          setLastSeenPost({
            id: data.data[data.data.length - 1].id,
            created_at: data.data[data.data.length - 1].created_at,
          });
        }
      }
    };

    document.addEventListener('scroll', onScroll);

    return function () {
      document.removeEventListener('scroll', onScroll);
    };
  }, [data, isFetching]);

  useEffect(() => {
    if (data?.data !== undefined) {
      setPosts(
        data?.data.map(post => <Post key={post.id} post={post} size="small" />),
      );
    }
  }, [data?.data]);

  return (
    <StyledContainer>
      <UserInfo>
        <MainUserInfo>
          <UserRelation type="follower" />
          <AvatarWithName>
            <StyledProfileAvatar src={`${user?.avatar_url}?width=256`} />
            <UsernameAndName>
              <Typography fontSize="24px">{`@${user?.username}`}</Typography>
              <Typography>{user?.name}</Typography>
            </UsernameAndName>
          </AvatarWithName>
          <UserRelation type="following" />
        </MainUserInfo>
        <UserDescription>
          <UserDescriptionText>{user?.about}</UserDescriptionText>
        </UserDescription>
      </UserInfo>
      <StyledUserPosts>{posts}</StyledUserPosts>
    </StyledContainer>
  );
};
