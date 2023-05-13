import { ListItem, styled } from '@mui/material';
import { Loader } from 'components/common/LoaderPage';

import { CommentsListLoaderProps } from './interfaces';

const ListItemStyled = styled(ListItem, {
  shouldForwardProp: prop => prop !== 'visible',
})<Pick<CommentsListLoaderProps, 'visible'>>`
  justify-content: center;
  display: ${props => (props.visible ? '' : 'none')};
`;

export const CommentsListLoader = ({
  visible,
  ...props
}: CommentsListLoaderProps) => {
  return (
    <ListItemStyled disablePadding visible={visible}>
      <Loader {...props} />
    </ListItemStyled>
  );
};
