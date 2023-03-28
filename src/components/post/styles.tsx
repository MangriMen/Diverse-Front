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
  Modal,
  Paper,
  TextField,
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

export const StyledCardContent = styled(CardContent, {
  shouldForwardProp: prop => prop !== 'gap',
})<{ gap: string }>`
  display: flex;
  flex-direction: column;
  max-width: 320px;
  min-width: 320px;
  gap: ${props => props.gap};
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

export const StyledCardMedia = styled(CardMedia)`
  object-fit: scale-down;
` as typeof CardMedia;

export const StyledCardMediaBox = styled(Box)`
  display: flex;
  min-width: 500px;
  min-height: 500px;
`;
