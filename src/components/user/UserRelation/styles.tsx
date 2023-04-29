import { Box, Card, CardHeader, styled } from '@mui/material';

export const CardStyled = styled(Card)`
  max-height: 80%;
  min-height: 25rem;
  min-width: 25rem;

  &.MuiPaper-root {
    background-color: ${props => props.theme.palette.primary.dark};
  }
`;

export const HeaderStyled = styled(CardHeader)`
  & .MuiCardHeader-title {
    text-align: center;
    font-size: 20px;
  }
`;

export const UserRelationListItem = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  align-items: center;
`;
