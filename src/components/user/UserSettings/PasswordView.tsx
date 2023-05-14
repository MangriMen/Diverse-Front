import { SettingTitle } from 'components/common/SettingTitle';
// import { useUpdatePasswordMutation } from 'ducks/user/api';
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

  // const [changePassword] = useUpdatePasswordMutation();

  return (
    <BoxSettings>
      <SettingTitle title="password" size="h4" />
      <PasswordViewBox>
        <CurrentPasswordInput
          label={t('currentPassword')}
          variant="filled"
          InputProps={{ disableUnderline: true }}
        ></CurrentPasswordInput>
        <NewPasswordInput
          label={t('newPassword')}
          variant="filled"
          InputProps={{ disableUnderline: true }}
        ></NewPasswordInput>
        <NewPasswordConfirmInput
          label={t('newPasswordConfirm')}
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
