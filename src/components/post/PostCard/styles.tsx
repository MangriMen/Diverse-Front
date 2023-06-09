import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Collapse,
  CollapseProps,
  List,
  Typography,
  TypographyProps,
  styled,
} from '@mui/material';
import { SkeletonStyled } from 'components/common';

import { PostProps } from '../interfaces';
import { CardMediaBoxProps, CardMediaSkeletonProps } from './interfaces';

export const PostCardStyled = styled(Card, {
  shouldForwardProp: prop => prop !== 'size',
})<Pick<PostProps, 'size'>>`
  height: ${props => (props.size === 'default' ? '546px' : '')};
  width: 100%;
  max-width: ${props => (props.size === 'default' ? '904px' : '')};
  display: flex;
  flex-direction: ${props => (props.size === 'default' ? 'row' : 'column')};

  border: 1px solid ${props => props.theme.palette.common.third};

  &.MuiPaper-root {
    background-color: ${props => props.theme.palette.primary.dark};
  }

  ${props => props.theme.breakpoints.down('md')} {
    height: auto;
    width: 100%;
    max-width: 512px;
    flex-direction: column;
  }
`;

export const PostCardActionArea = styled(CardActionArea)`
  width: 100%;
  height: 100%;
`;

export const CardMediaSkeleton = styled(SkeletonStyled, {
  shouldForwardProp: prop => prop !== 'isLoading' && prop !== 'size',
})<CardMediaSkeletonProps>`
  display: ${props => (props.isLoading ? '' : 'none')};
  width: 100%;
  height: auto;
  aspect-ratio: ${props => (props.size === 'default' ? '' : '2/1')};
`;

export const CardMediaSkeletonLoaderBox = styled(Box)`
  width: 100%;
  height: 100%;
`;

export const CardMediaStyled = styled(CardMedia)`
  object-fit: contain;
  pointer-events: none;
` as typeof CardMedia;

export const CardMediaBox = styled(Box, {
  shouldForwardProp: prop => prop !== 'size',
})<CardMediaBoxProps>`
  position: relative;
  display: flex;
  justify-content: center;
  height: 100%;
  max-height: ${props => (props.size === 'default' ? '544px' : '756px')};
  flex-grow: ${props => (props.size === 'default' ? '1' : '')};
`;

export const PostHeader = styled(Box)`
  display: grid;
  align-items: center;
  justify-items: flex-start;
  grid-template-rows: 1.5rem 1rem;
  grid-template-columns: 2.5rem auto auto;
  gap: 0 0.25rem;
`;

export const PostUsername = styled(({ ...props }: TypographyProps) => (
  <Typography variant="h6" {...props} />
))``;

export const PostCardContent = styled(CardContent, {
  shouldForwardProp: prop => prop !== 'size',
})<Pick<PostProps, 'size'>>`
  --fixed-width: 360px;

  padding: ${props => (props.size === 'default' ? '' : '4px')};
  display: flex;
  flex-direction: column;

  min-width: var(--fixed-width);
  max-width: var(--fixed-width);

  gap: 0.5rem;

  &:last-child {
    padding-bottom: ${props => (props.size === 'default' ? '16px' : '4px')};
  }

  ${props => props.theme.breakpoints.down('md')} {
    --fixed-width: auto;
  }
`;

export const PostCardDescriptionCollapse = styled(Collapse)<
  Pick<CollapseProps, 'in'>
>`
  overflow-y: ${props => (props.in ? 'scroll' : 'hidden')};
  max-height: 86%;
  scroll-behavior: smooth;
`;

export const PostCardDescriptionText = styled(Typography)`
  overflow-wrap: break-word;
  font-size: 14px;
  padding: 0 4px;
` as typeof Typography;

export const PostCardCommentsList = styled(List)`
  overflow-y: scroll;
  padding-right: 0.4rem;
  flex: 1;
  max-height: none;

  ${props => props.theme.breakpoints.down('md')} {
    padding-right: 0;
    max-height: 256px;
  }
`;

export const PostCardHidingContent = styled(Box, {
  shouldForwardProp: prop => prop !== 'visible',
})<{ visible: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  gap: inherit;
`;
