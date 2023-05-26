import { OptionsObject } from 'notistack';

interface SettingsSnackOption {
  title: string;
  options: OptionsObject;
}

export const SettingsSnackOptions: {
  success: SettingsSnackOption;
  error: SettingsSnackOption;
} = {
  success: {
    title: 'successChangePassword',
    options: {
      variant: 'success',
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
    },
  },
  error: {
    title: 'errorChangePassword',
    options: {
      variant: 'error',
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
    },
  },
};
