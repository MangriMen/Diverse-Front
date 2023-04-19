import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  CollapseProps,
  IconButton,
  InputBase,
  List,
  ListItemAvatar,
  Paper,
  Typography,
  styled,
} from '@mui/material';

import { PostSize } from './interfaces';

export const StyledCard = styled(Card, {
  shouldForwardProp: prop => prop !== 'size',
})<{ size: PostSize }>`
  height: ${props => (props.size === 'default' ? '536px' : '')};
  width: ${props => (props.size === 'default' ? '930px' : '352px')};
  display: flex;
  flex-direction: ${props => (props.size === 'default' ? 'row' : 'column')};
  box-shadow: 0 0 0 2px ${props => props.theme.palette.common.third};

  &.MuiPaper-root {
    background-color: ${props => props.theme.palette.primary.dark};
  }
`;

export const StyledCardContent = styled(CardContent, {
  shouldForwardProp: prop => prop !== 'size',
})<{ size: PostSize }>`
  padding: ${props => (props.size === 'default' ? '' : '4px')};
  display: flex;
  flex-direction: column;
  min-width: 320px;
  max-width: 320px;
  gap: 0.5rem;

  &:last-child {
    padding-bottom: ${props => (props.size === 'default' ? '16px' : '4px')};
  }
`;

export const StyledPostCardHeaderBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0 1rem;
`;

export const StyledAvatar = styled(Avatar)`
  width: 48px;
  height: 48px;
`;

export const StyledLikeBox = styled(Box)`
  display: flex;
  gap: 0 0.2rem;
  align-items: center;
`;

export const StyledActionBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding-right: 4px;
`;

export const StyledIconButton = styled(IconButton)`
  padding: 0px;
`;

export const StyledList = styled(List)`
  overflow: auto;
  height: 100%;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: ${props => props.theme.palette.common.dimmed};
  }
`;

export const StyledCommentHeaderBox = styled(Box)`
  display: flex;
  gap: 0 1rem;
  align-items: flex-end;
`;

export const StyledPaper = styled(Paper)`
  display: flex;
  align-items: center;
  box-shadow: none;
` as typeof Paper;

export const StyledInputBase = styled(InputBase)`
  margin-left: 1rem;
  flex-grow: 1;
  font-size: 16px;
`;

export const StyledComment = styled(Typography)`
  float: left;
` as typeof Typography;

export const PostCardDescriptionText = styled(Typography)`
  font-size: 14px;
  padding: 0 4px;
` as typeof Typography;

export const StyledCardMedia = styled(CardMedia)`
  object-fit: contain;
  pointer-events: none;
` as typeof CardMedia;

export const StyledCardMediaBox = styled(Box, {
  shouldForwardProp: prop => prop !== 'size',
})<{ size: PostSize }>`
  display: flex;
  flex-grow: ${props => (props.size === 'default' ? 1 : 0)};
  height: 100%;
`;

export const PostCardDescriptionCollapse = styled(Collapse)<{
  in: CollapseProps['in'];
}>`
  overflow: ${props => (props.in ? 'scroll' : 'hidden')};
  max-height: 86%;
  scroll-behavior: smooth;
`;

export const ListItemAvatarStyled = styled(ListItemAvatar)`
  min-width: 48px;
`;
