import {
  AvatarGroup,
  Box,
  Card,
  CardContent,
  CardHeader,
  styled,
} from '@mui/material';
import { StyledTextButton } from 'components/common/styles';

export const CardStyled = styled(Card)`
  min-height: 25rem;
  width: 25rem;

  &.MuiPaper-root {
    background-color: ${props => props.theme.palette.primary.dark};
  }

  ${props => props.theme.breakpoints.down('mobile')} {
    height: 100%;
    width: 100%;
  }
`;

export const CardContentStyled = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  height: 100%;

  overflow: auto;
`;

export const HeaderStyled = styled(CardHeader)`
  & .MuiCardHeader-title {
    text-align: center;
    font-size: 20px;
  }

  & .MuiCardHeader-action {
    margin: 0;
  }
`;

export const UserRelationListItem = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  align-items: center;
`;

export const RelationInfo = styled(Box)`
  display: flex;
  justify-content: center;

  width: 200px;

  ${props => props.theme.breakpoints.down('sm')} {
    display: none;
  }
`;

export const RelationInfoText = styled(StyledTextButton)`
  text-align: center;

  font-size: 1.125rem;

  ${props => props.theme.breakpoints.down('sm')} {
    font-size: 1rem;
    word-spacing: 1000rem;
  }
`;

export const AvatarGroupStyled = styled(AvatarGroup)`
  cursor: pointer;
`;
