import { Menu, MenuProps, styled } from '@mui/material';

export const VerticalMenu = styled(({ ...props }: MenuProps) => {
  return (
    <Menu transformOrigin={{ vertical: 'top', horizontal: 5 }} {...props} />
  );
})<{}>`
  & .MuiMenu-list {
    padding: 0;

    & .MuiListItemIcon-root {
      min-width: 0px;
      width: 36px;
      display: flex;
      justify-content: center;
    }
  }
`;
