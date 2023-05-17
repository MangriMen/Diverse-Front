import {
  ButtonProps,
  IconButtonProps,
  TooltipProps,
  TypographyProps,
} from '@mui/material';
import { User } from 'types/auth';

export interface AvatarButtonProps extends IconButtonProps {
  user: User | null;
}

export interface UsernameLinkButtonProps extends ButtonProps {
  user: User | null;
  typographyProps?: TypographyProps;
}

export interface UserTooltipProps {
  user: User | null;
  children: TooltipProps['children'];
}
