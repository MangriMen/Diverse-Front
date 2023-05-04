import { ListItem, Typography, styled } from '@mui/material';
import { Span } from 'components/common/styles';

export const ListItemStyled = styled(ListItem)`
  gap: 0.5rem;
`;

export const CommentBody = styled(Span)`
  display: flex;
  flex-direction: column;
`;

export const CommentUsername = styled(Typography)`
  font-size: 14px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 0.25rem;
` as typeof Typography;
