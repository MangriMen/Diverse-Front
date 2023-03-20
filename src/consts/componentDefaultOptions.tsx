import { LinkProps } from '@mui/material';
import { forwardRef } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink ref={ref} to={href} {...other} />;
});
LinkBehavior.displayName = 'LinkBehavior';

export const THEME_DEFAULT_OPTIONS = {
  typography: {
    allVariants: {
      color: '#f5f5f5',
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiTextField: {
      defaultProps: {
        inputProps: { maxLength: 90 },
      },
    },
  },
};
