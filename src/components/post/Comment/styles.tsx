import {
  Box,
  ListItem,
  ListItemAvatar,
  Typography,
  styled,
} from '@mui/material';
import { Span, StyledTextButton } from 'components/common/styles';

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

export const CommentUsername = styled(Typography)`
  font-size: 14px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 0.25rem;
` as typeof Typography;

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

export const CommentButton = styled(StyledTextButton)`
  font-size: ${props => props.theme.typography.caption.fontSize};
  color: ${props => props.theme.palette.common.dimmed};
`;
