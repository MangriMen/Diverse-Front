import SettingsIcon from '@mui/icons-material/Settings';
import { Loader } from 'components/common/LoaderPage';
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
import { POSTS_FETCH_COUNT } from 'consts';
import { userLoader } from 'helpers';
import { LoaderData } from 'helpers/types';
import { useInfinityPostFeed } from 'hooks/useInfinityPostFeed';
import { useLoaderData } from 'react-router-dom';

export const UserPage = () => {
  const { isMe, user } = useLoaderData() as LoaderData<typeof userLoader>;

  const { data, isFetching } = useInfinityPostFeed({
    type: 'user',
    count: POSTS_FETCH_COUNT.USER,
    user_id: user.id,
  });

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
            <UserDescriptionText>{user.about}</UserDescriptionText>
          </UserDescription>
        </UserInfo>
        <StyledUserPosts>
          {data.map(post => (
            <Post key={post.id} post={post} size="small" />
          ))}
        </StyledUserPosts>
        {isFetching && <Loader />}
      </UserPageLayout>
    </StyledContainer>
  );
};
