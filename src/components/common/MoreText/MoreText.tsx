import { styled } from '@mui/material';
import { StyledTextButton } from 'components/common/styles';
import { useTranslation } from 'react-i18next';

import { MoreTextButtonProps } from './interfaces';

export const MoreText = styled(
  ({ expanded, onExpand, ...props }: MoreTextButtonProps) => {
    const { t } = useTranslation('translation', { keyPrefix: 'post' });

    return (
      <StyledTextButton
        disableRipple
        color="dimmed"
        fontSize="14px"
        onClick={onExpand}
        {...props}
      >
        {`…${t(!expanded ? 'more' : 'less')}`}
      </StyledTextButton>
    );
  },
)<{}>`
  position: ${props => (!props.expanded ? 'absolute' : 'relative')};
  align-self: flex-end;
  right: 0;
  bottom: 0;
  z-index: 0;
  border-radius: 0;

  &,
  &:hover {
    background-color: ${props => props.theme.palette.primary.dark};
  }

  &:focus {
    border-radius: 4px;
  }

  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    right: 100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(26, 28, 31, 0) 0%,
      rgba(26, 28, 31, 0.95) 75%,
      rgba(26, 28, 31, 1) 100%
    );
  }
`;
