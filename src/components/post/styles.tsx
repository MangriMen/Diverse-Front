import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputBase,
  List,
  Paper,
  Typography,
  styled,
} from '@mui/material';

export const StyledCard = styled(Card)`
  max-width: 930px;
  max-height: 536px;
  display: flex;
  box-shadow: 0 0 0 2px ${props => props.theme.palette.common.third};
  justify-content: flex-end;
  & .MuiCardContent-root {
    width: 100%;
    background: ${props => props.theme.palette.primary.dark};
  }
`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  max-width: 320px;
  gap: 0.5rem;
  &:last-child {
    padding-bottom: 16px;
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
})<{ fontsize: string }>`
  font-size: ${props => props.fontsize};
  padding: 0 4px;
  text-align: start;
  color: ${props => props.theme.palette.common.dimmed};
  &:hover {
    background: #ffffff0f;
  }
  &:focus-visible {
    outline: 2px solid;
    outline-color: white;
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
