import SettingsIcon from '@mui/icons-material/Settings';
import { Typography } from '@mui/material';
import { StyledContainer } from 'components/pages/styles';
import { Post } from 'components/post/Post';
import { ToggleRealtionButton } from 'components/user/UserRelation/ToggleRealtionButton';
import { UserRelation } from 'components/user/UserRelation/UserRelation';
import {
  AvatarWithName,
  MainUserInfo,
  ProfileAvatarButtonBox,
  ProfileAvatarSettingsButton,
  ProfileAvatarWithAction,
  StyledProfileAvatar,
  StyledUserPosts,
  UserDescription,
  UserDescriptionText,
  UserInfo,
  UsernameAndName,
} from 'components/user/styles';
import { useGetPostsQuery } from 'ducks/post/api';
import { ReactNode, useEffect, useState } from 'react';
import { User } from 'types/auth';

export const UserPageContent = ({
  isMe,
  user,
}: {
  isMe?: boolean;
  user: User;
}) => {
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
          <UserRelation isMe={isMe} user={user} type="follower" />
          <AvatarWithName>
            <ProfileAvatarWithAction>
              <StyledProfileAvatar src={`${user.avatar_url}?width=256`} />
              <ProfileAvatarButtonBox>
                {isMe && (
                  <ProfileAvatarSettingsButton>
                    <SettingsIcon />
                  </ProfileAvatarSettingsButton>
                )}
                {!isMe && <ToggleRealtionButton user={user} />}
              </ProfileAvatarButtonBox>
            </ProfileAvatarWithAction>
            <UsernameAndName>
              <Typography fontSize="24px">{`@${user.username}`}</Typography>
              <Typography>{user.name}</Typography>
            </UsernameAndName>
          </AvatarWithName>
          <UserRelation isMe={isMe} user={user} type="following" />
        </MainUserInfo>
        <UserDescription>
          <UserDescriptionText>{user.about}</UserDescriptionText>
        </UserDescription>
      </UserInfo>
      <StyledUserPosts>{!isFetching && userPosts}</StyledUserPosts>
    </StyledContainer>
  );
};
