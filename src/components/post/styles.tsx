import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  styled,
} from '@mui/material';

export const StyledCard = styled(Card)`
  max-width: 58.125rem;
  max-height: 500px;
  display: flex;
  box-shadow: 0 0 0 2px ${props => props.theme.palette.common.third};
  align: center;
  & .MuiCardContent-root {
    width: 100%;
    background: ${props => props.theme.palette.primary.dark};
  }
`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

export const StyledTextButton = styled(Button)`
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
`;

export const StyledActionBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding-right: 4px;
`;

export const StyledIconButton = styled(IconButton)`
  padding: 0px;
`;
