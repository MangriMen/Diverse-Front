import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  InputBase,
  List,
  Paper,
  Typography,
  styled,
} from '@mui/material';

import { PostSize } from './interfaces';

export const StyledCard = styled(Card, {
  shouldForwardProp: prop => prop !== 'size',
})<{ size: PostSize }>`
  height: ${props => (props.size == 'default' ? '536px' : '')};
  max-width: ${props => (props.size == 'default' ? '930px' : '300px')};
  display: flex;
  flex-direction: ${props => (props.size == 'default' ? 'row' : 'column')};
  box-shadow: 0 0 0 2px ${props => props.theme.palette.common.third};
  &.MuiPaper-root {
    background-color: ${props => props.theme.palette.primary.dark};
  }
`;

export const StyledCardContent = styled(CardContent, {
  shouldForwardProp: prop => prop !== 'size',
})<{ size: PostSize }>`
  display: flex;
  flex-direction: column;
  max-width: 320px;
  min-width: 320px;
  gap: 0.5rem;
  padding: ${props => (props.size == 'default' ? '' : '4px')};
  &:last-child {
    padding-bottom: ${props => (props.size == 'default' ? '16px' : '4px')};
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

export const StyledTextButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'fontsize',
})<{ fontsize?: string }>`
  font-size: ${props => props.fontsize};
  color: ${props => props.theme.palette.common.dimmed};
  padding: 0 4px;
  &:hover {
    background: #ffffff0f;
  }
  &:focus-visible {
    outline: 2px solid white;
  }
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
  flex: 1;
  font-size: 16px;
`;

export const StyledComment = styled(Typography)`
  float: left;
` as typeof Typography;

export const StyledDescriptionTypography = styled(Typography)`
  font-size: 14px;
  padding: 0 4px;
` as typeof Typography;

export const StyledCardMedia = styled(CardMedia)`
  object-fit: scale-down;
` as typeof CardMedia;

export const StyledCardMediaBox = styled(Box, {
  shouldForwardProp: prop => prop !== 'size',
})<{ size: PostSize }>`
  display: flex;
  /* min-width: ${props => (props.size == 'default' ? '512px' : '')}; */
  /* aspect-ratio: ${props => (props.size == 'default' ? '1/1' : ' ')}; */
`;
