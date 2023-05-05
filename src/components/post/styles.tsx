import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  CollapseProps,
  IconButton,
  InputBase,
  List,
  ListItemAvatar,
  Modal,
  Paper,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { SkeletonStyled } from 'components/common/SkeletonStyled';
import { BaseLayout } from 'components/pages/styles';

import {
  CardMediaSkeletonProps,
  PostSize,
  StyledCardMediaBoxProps,
} from './interfaces';

export const StyledCard = styled(Card, {
  shouldForwardProp: prop => prop !== 'size',
})<{ size: PostSize }>`
  height: ${props => (props.size === 'default' ? '546px' : '')};
  width: ${props => (props.size === 'default' ? '864px' : '')};
  display: flex;
  flex-direction: ${props => (props.size === 'default' ? 'row' : 'column')};

  border: 1px solid ${props => props.theme.palette.common.third};

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
  justify-content: space-between;
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

export const CardMediaSkeleton = styled(SkeletonStyled, {
  shouldForwardProp: prop => prop !== 'isLoading' && prop !== 'size',
})<CardMediaSkeletonProps>`
  display: ${props => (props.isLoading ? '' : 'none')};
  width: 100%;
  height: auto;
  aspect-ratio: ${props => (props.size === 'default' ? '' : '2/1')};
`;

export const StyledCardMedia = styled(CardMedia)`
  object-fit: contain;
  pointer-events: none;
` as typeof CardMedia;

export const StyledCardMediaBox = styled(Box, {
  shouldForwardProp: prop => prop !== 'size',
})<StyledCardMediaBoxProps>`
  position: relative;
  display: flex;
  justify-content: center;
  height: 100%;
  max-height: ${props => (props.size === 'default' ? '1220px' : '756px')};
  flex-grow: ${props => (props.size === 'default' ? '1' : '')};
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

export const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledCardCreateInput = styled(TextField)`
  & .MuiFilledInput-root {
    border-radius: 4;
    background-color: ${props => props.theme.palette.common.third};
    border-bottom: 2px solid;
    border-color: ${props => props.theme.palette.secondary.main};
    &.Mui-Focused {
      background-color: ${props => props.theme.palette.primary.dark};
    }
  }
  & .MuiFormLabel-root.Mui-focused {
    color: ${props => props.theme.palette.secondary.main};
  }
`;

export const StyledButton = styled(Button)`
  padding: 4px 16px;
  font-size: 18px;
  &:focus-visible {
    outline: 2px solid;
  }
`;

export const HomePageLayout = styled(BaseLayout)`
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
`;
