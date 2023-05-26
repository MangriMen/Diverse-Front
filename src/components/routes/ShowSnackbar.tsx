import { STORAGE_KEYS } from 'consts';
import { SettingsSnackOptions } from 'consts/snackbar';
import { storageGet, storageRemove } from 'helpers';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

export const ShowSnackbar = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'settings' });

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const isPasswordChangedSuccess = storageGet(
      STORAGE_KEYS.IS_PASSWORD_CHANGED_SUCCESSFULLY,
    );
    storageRemove(STORAGE_KEYS.IS_PASSWORD_CHANGED_SUCCESSFULLY);
    if (
      isPasswordChangedSuccess !== undefined &&
      isPasswordChangedSuccess !== null
    ) {
      if (isPasswordChangedSuccess) {
        enqueueSnackbar(
          t(SettingsSnackOptions.success.title),
          SettingsSnackOptions.success.options,
        );
      } else {
        enqueueSnackbar(
          t(SettingsSnackOptions.error.title),
          SettingsSnackOptions.error.options,
        );
      }
    }
  }, [enqueueSnackbar, t]);

  return <Outlet />;
};
