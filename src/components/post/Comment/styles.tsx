import { Box, ListItem, Typography, styled } from '@mui/material';

export const ListItemStyled = styled(ListItem)`
  gap: 0.5rem;
`;

export const CommentTextStyled = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const CommentUsername = styled(Typography)`
  font-size: 14px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
` as typeof Typography;
