import { SettingTitle } from 'components/common/SettingTitle';
import { useTranslation } from 'react-i18next';

import {
  BoxSettings,
  CurrentPasswordInput,
  NewPasswordConfirmInput,
  NewPasswordInput,
  PasswordViewBox,
  SaveSettingsButton,
} from '../styles';

export const PasswordView = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'settings' });

  return (
    <BoxSettings>
      <SettingTitle title="password" size="h4" />
      <PasswordViewBox>
        <CurrentPasswordInput
          label="currentPassword"
          variant="filled"
          InputProps={{ disableUnderline: true }}
        ></CurrentPasswordInput>
        <NewPasswordInput
          label="newPassword"
          variant="filled"
          InputProps={{ disableUnderline: true }}
        ></NewPasswordInput>
        <NewPasswordConfirmInput
          label="newPasswordConfirm"
          variant="filled"
          InputProps={{ disableUnderline: true }}
        ></NewPasswordConfirmInput>
      </PasswordViewBox>
      <SaveSettingsButton
        variant="contained"
        color="secondary"
        disableFocusRipple
      >
        {t('saveChanges')}
      </SaveSettingsButton>
    </BoxSettings>
  );
};
