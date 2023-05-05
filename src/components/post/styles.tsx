import { Avatar, IconButton, Modal, styled } from '@mui/material';
import { Span, StyledTextButton } from 'components/common/styles';

export const StyledAvatar = styled(Avatar)`
  width: 48px;
  height: 48px;
`;

export const StyledActionBox = styled(Span)`
  display: flex;
  justify-content: space-between;
`;

export const StyledIconButton = styled(IconButton)`
  padding: 0px;
`;

export const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PostCommentButton = styled(StyledTextButton)`
  color: ${props => props.theme.palette.common.dimmed};
`;

export const CommentButton = styled(PostCommentButton)`
  font-size: ${props => props.theme.typography.caption.fontSize};
`;

export const PostButton = styled(PostCommentButton)`
  font-size: ${props => props.theme.typography.body2.fontSize};
`;
