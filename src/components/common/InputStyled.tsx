import { InputBase, InputBaseProps, Paper, styled } from '@mui/material';
import { INPUT_ELEVATION_ACTIVE } from 'consts/style';

const PaperStyled = styled(Paper)`
  display: flex;
  align-items: center;

  position: relative;
  overflow: hidden;
  box-shadow: none;

  --input-padding: 0.25rem;

  padding: var(--input-padding);

  border: 1px solid ${props => props.theme.palette.common.border};

  &:before {
    content: '';
    position: absolute;

    width: calc(100% + var(--input-padding));
    height: 0.125rem;

    left: calc(-1 * var(--input-padding));
    bottom: 0;

    background-color: ${props => props.theme.palette.secondary.light};
  }
` as typeof Paper;

const InputBaseStyled = styled(InputBase)`
  flex: 1;
  margin-left: 0.5rem;
  gap: 0.5rem;

  & .MuiInputBase-input {
    padding: 0;
  }
`;

export const InputStyled = ({ ...props }: InputBaseProps) => {
  return (
    <PaperStyled
      elevation={INPUT_ELEVATION_ACTIVE}
      sx={{ width: props.fullWidth ? '100%' : 'auto' }}
    >
      <InputBaseStyled {...props} />
    </PaperStyled>
  );
};
