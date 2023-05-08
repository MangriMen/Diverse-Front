import SettingsIcon from '@mui/icons-material/Settings';
import { Loader } from 'components/common/LoaderPage';
import { StyledContainer } from 'components/pages/styles';
import { Post } from 'components/post/Post';
import { ToggleRelationButton } from 'components/user/UserRelation/ToggleRelationButton';
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
import { AT_THE_RATE_SIGN, POSTS_FETCH_COUNT, ROUTE } from 'consts';
import { useInfinityPostFeed } from 'hooks/useInfinityPostFeed';
import { useNavigate } from 'react-router-dom';
import { User } from 'types/auth';

export const UserPageContent = ({
  isMe,
  user,
}: {
  isMe?: boolean;
  user: User;
}) => {
  const { data, isFetching } = useInfinityPostFeed({
    type: 'user',
    count: POSTS_FETCH_COUNT.USER,
    user_id: user.id,
  });

  const navigate = useNavigate();

  const toSettings = () => {
    navigate(ROUTE.SETTINGS);
  };

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
                    <ProfileAvatarSettingsButton onClick={toSettings}>
                      <SettingsIcon />
                    </ProfileAvatarSettingsButton>
                  )}
                  {!isMe && <ToggleRelationButton user={user} />}
                </ProfileAvatarButtonBox>
              </ProfileAvatarWithAction>
              <UsernameAndName>
                <Username>{`${AT_THE_RATE_SIGN}${user.username}`}</Username>
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
