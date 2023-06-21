import SettingsIcon from '@mui/icons-material/Settings';
import { Loader } from 'components/common/LoaderPage';
import { StyledContainer } from 'components/pages/styles';
import { StyledIconButton } from 'components/post';
import { Post } from 'components/post/Post';
import { UserRelations } from 'components/user/UserRelations';
import { ToggleRelationButton } from 'components/user/UserRelations/ToggleRelationButton';
import {
  FollowerRelation,
  FollowingRelation,
  MainUserInfo,
  Name,
  ProfileAvatarButtonBox,
  ProfileAvatarWithAction,
  StyledProfileAvatar,
  StyledUserPosts,
  UserDescription,
  UserDescriptionText,
  UserInfo,
  UserPageLayout,
  Username,
} from 'components/user/styles';
import { AT_THE_RATE_SIGN, POSTS_FETCH_COUNT, ROUTE } from 'consts';
import { userLoader } from 'helpers';
import { LoaderData } from 'helpers/types';
import { useInfinityPostFeed } from 'hooks/useInfinityPostFeed';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { PostModel } from 'types/post';

export const UserPage = () => {
  const { isMe, user } = useLoaderData() as LoaderData<typeof userLoader>;

  const ref = useRef<HTMLDivElement>(null);

  const { data, dataID, isFetching } = useInfinityPostFeed({
    type: 'user',
    count: POSTS_FETCH_COUNT.FEED,
    user_id: user.id,
  });

  const [posts, setPosts] = useState<ReactElement[]>([]);
  useEffect(
    () =>
      setPosts(
        data.map((post: PostModel) => (
          <Post key={post.id} post={post} size="small" />
        )),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(dataID)],
  );
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
              <UserRelations isMe={isMe} user={user} type="followers" />
            </FollowerRelation>
            <ProfileAvatarWithAction>
              <StyledProfileAvatar src={`${user.avatar_url}?width=256`} />
              <ProfileAvatarButtonBox>
                {isMe && (
                  <StyledIconButton onClick={toSettings}>
                    <SettingsIcon />
                  </StyledIconButton>
                )}
                {!isMe && <ToggleRelationButton user={user} />}
              </ProfileAvatarButtonBox>
            </ProfileAvatarWithAction>
            <FollowingRelation>
              <UserRelations isMe={isMe} user={user} type="followings" />
            </FollowingRelation>
          </MainUserInfo>
          <UserDescription>
            <Username>{`${AT_THE_RATE_SIGN}${user.username}`}</Username>
            <Name>{user.name}</Name>
            <UserDescriptionText>{user.about}</UserDescriptionText>
          </UserDescription>
        </UserInfo>
        <StyledUserPosts ref={ref}>{posts}</StyledUserPosts>
        {isFetching && <Loader />}
      </UserPageLayout>
    </StyledContainer>
  );
};
