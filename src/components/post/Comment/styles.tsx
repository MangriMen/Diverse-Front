import {
  Box,
  ListItem,
  ListItemAvatar,
  Typography,
  styled,
} from '@mui/material';
import { Span } from 'components/common/styles';
import { UsernameLinkButton } from 'components/user/UsernameLinkButton';
import { UsernameLinkButtonProps } from 'components/user/interfaces';

export const ListItemStyled = styled(ListItem)`
  gap: 0.5rem;
`;

export const ListItemAvatarStyled = styled(ListItemAvatar)`
  min-width: 0px;
`;

export const CommentHeader = styled(Box)`
  height: 1.3125rem;
  display: flex;
  gap: 0 0.5rem;
  justify-items: center;
  align-items: center;
`;

export const CommentUsername = styled(
  ({ ...props }: UsernameLinkButtonProps) => (
    <UsernameLinkButton variant="body2" {...props} />
  ),
)`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 0.25rem;
`;

export const CommentBody = styled(Span)`
  display: flex;
  flex-direction: column;
`;

export const CommentText = styled(Typography)`
  float: left;
  overflow-wrap: break-word;
  font-size: ${props => props.theme.typography.body2.fontSize};
  padding: 0 0.25rem;
` as typeof Typography;
