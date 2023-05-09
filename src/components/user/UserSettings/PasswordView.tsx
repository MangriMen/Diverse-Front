import { SettingTitle } from 'components/common/SettingTitle';
import { StyledButton } from 'components/common/styles';
import { useTranslation } from 'react-i18next';

import {
  BoxSettings,
  CurrentPasswordInput,
  NewPasswordConfirmInput,
  NewPasswordInput,
  PasswordViewBox,
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
      <StyledButton variant="contained" color="secondary" disableFocusRipple>
        {t('saveChanges')}
      </StyledButton>
    </BoxSettings>
  );
};
