import { Avatar, Box, Typography, styled } from '@mui/material';
import { BaseLayout } from 'components/pages/styles';
import { StyledIconButton } from 'components/post';

export const UserPageLayout = styled(BaseLayout)`
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
`;

export const StyledProfileAvatar = styled(Avatar)`
  width: 192px;
  height: 192px;

  ${props => props.theme.breakpoints.down('sm')} {
    width: 80px;
    height: 80px;
  }
`;

export const UserInfo = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const MainUserInfo = styled(Box)`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: space-evenly;
  align-items: center;

  ${props => props.theme.breakpoints.down('mobile')} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }
`;

export const UserDescription = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  word-break: break-all;
`;

export const UserDescriptionText = styled(Typography)`
  width: 65%;
  text-align: center;
  text-align-last: center;
  font-size: 14px;

  color: ${props => props.theme.palette.common.dimmed};

  ${props => props.theme.breakpoints.down('sm')} {
    width: 100%;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const StyledUserPosts = styled(Box)`
  width: 100%;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(
    auto-fill,
    clamp(17.5rem, 15.533rem + 11.239vw, 23.625rem)
  );
  gap: 0.5rem;
`;

export const RelationBlock = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.5rem;
`;

export const UsersHorizontalList = styled(Box)`
  display: flex;
  gap: 1rem;
`;

export const Username = styled(Typography)`
  font-size: 1.5rem;
`;

export const Name = styled(Typography)`
  font-size: 1rem;
`;

export const ProfileAvatarWithAction = styled(Box)`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;

  position: relative;
  grid-column: 2;

  :hover * {
    opacity: 1;
  }

  ${props => props.theme.breakpoints.down('mobile')} {
    grid-column: 1;
    grid-row: 1/3;
  }
`;

export const ProfileAvatarButtonBox = styled(Box)`
  position: absolute;
  bottom: 0;
  right: 0;

  ${props => props.theme.breakpoints.down('sm')} {
    position: unset;
  }
`;

export const ProfileAvatarSettingsButton = styled(StyledIconButton)`
  opacity: 0;

  transition: visibility 0.3s ease-out, opacity 0.3s ease-out;

  ${props => props.theme.breakpoints.down('sm')} {
    opacity: unset;
  }
`;

export const FollowerRelation = styled(Box)`
  grid-column: 1;

  ${props => props.theme.breakpoints.down('mobile')} {
    grid-column: 2;
    grid-row: 1;
  }
`;

export const FollowingRelation = styled(Box)`
  grid-column: 3;

  ${props => props.theme.breakpoints.down('mobile')} {
    grid-column: 2;
    grid-row: 2;
  }
`;
