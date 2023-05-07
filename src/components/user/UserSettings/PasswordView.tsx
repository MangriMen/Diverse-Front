import { Box } from '@mui/material';
import { StyledInput } from 'components/auth/styles';
import { SettingTitle } from 'components/common/SettingTitle';
import { StyledButton } from 'components/common/styles';
import { useTranslation } from 'react-i18next';

import { BoxSettings } from '../styles';

export const PasswordView = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'settings' });

  return (
    <BoxSettings>
      <SettingTitle title="password" />
      <Box display="flex" gap="3rem">
        <Box display="flex" flexDirection="column" gap="1rem">
          <StyledInput
            label="currentPassword"
            variant="filled"
            InputProps={{ disableUnderline: true }}
          ></StyledInput>
          <StyledInput
            label="newPassword"
            variant="filled"
            InputProps={{ disableUnderline: true }}
          ></StyledInput>
          <StyledInput
            label="newPasswordConfirm"
            variant="filled"
            InputProps={{ disableUnderline: true }}
          ></StyledInput>
        </Box>
      </Box>
      <StyledButton variant="contained" color="secondary" disableFocusRipple>
        {t('saveChanges')}
      </StyledButton>
    </BoxSettings>
  );
};
