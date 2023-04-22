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
import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { StyledContainer } from './styles';

export const UserPage = () => {
  const user = useSelector(selectUser);

  const { data, isFetching } = useGetPostsQuery({
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
      <StyledUserPosts>{!isFetching && userPosts}</StyledUserPosts>
    </StyledContainer>
  );
};
