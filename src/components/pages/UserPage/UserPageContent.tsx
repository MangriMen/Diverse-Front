import SettingsIcon from '@mui/icons-material/Settings';
import { StyledContainer } from 'components/pages/styles';
import { Post } from 'components/post/Post';
import { ToggleRealtionButton } from 'components/user/UserRelation/ToggleRealtionButton';
import { UserRelation } from 'components/user/UserRelation/UserRelation';
import {
  AvatarWithName,
  FollowerRelation,
  FollowingRelation,
  MainUserInfo,
  Name,
  NameInDescription,
  ProfileAvatarButtonBox,
  ProfileAvatarSettingsButton,
  ProfileAvatarWithAction,
  StyledProfileAvatar,
  StyledUserPosts,
  UserDescription,
  UserDescriptionText,
  UserInfo,
  UserPageLayout,
  Username,
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
      <UserPageLayout>
        <UserInfo>
          <MainUserInfo>
            <FollowerRelation>
              <UserRelation isMe={isMe} user={user} type="follower" />
            </FollowerRelation>
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
                <Username>{`@${user.username}`}</Username>
                <Name>{user.name}</Name>
              </UsernameAndName>
            </AvatarWithName>
            <FollowingRelation>
              <UserRelation isMe={isMe} user={user} type="following" />
            </FollowingRelation>
          </MainUserInfo>
          <UserDescription>
            <NameInDescription>{user.name}</NameInDescription>
            <UserDescriptionText>
              {user.about ??
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id pharetra neque, vel convallis purus. Morbi id dictum sem, sed finibus nunc. Vestibulum aliquet felis in nibh venenatis sollicitudin. Proin ullamcorper nunc ac ullamcorper tincidunt. Nam luctus enim vitae quam posuere faucibus. Proin lacus est, ullamcorper at mi vitae, congue efficitur erat. Aenean pulvinar metus sit amet interdum semper. Cras vitae eleifend massa. Nam nec lectus a ex molestie malesuada. Mauris iaculis tortor eget sollicitudin placerat. Etiam mollis lacus nisi, sit amet tempor massa efficitur vitae. Donec in tempus nisl. Cras ultricies magna nec metus condimentum, eget consequat ipsum mattis. Sed venenatis magna venenatis, euismod eros vel, porttitor libero. Pellentesque quis elementum odio. Phasellus elementum sem nulla.`}
            </UserDescriptionText>
          </UserDescription>
        </UserInfo>
        <StyledUserPosts>{!isFetching && userPosts}</StyledUserPosts>
      </UserPageLayout>
    </StyledContainer>
  );
};
