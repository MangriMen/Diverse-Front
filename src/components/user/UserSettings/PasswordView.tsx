import { yupResolver } from '@hookform/resolvers/yup';
import { SettingTitle } from 'components/common/SettingTitle';
import { useUpdatePasswordMutation } from 'ducks/user/api';
import { UpdatePassword } from 'ducks/user/types';
import { conditionalTranslate } from 'helpers';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  BoxSettings,
  CurrentPasswordInput,
  NewPasswordConfirmInput,
  NewPasswordInput,
  PasswordViewBox,
  SaveSettingsButton,
} from '../styles';
import { changePasswordValidation } from './schemas';

const defaultValues = {
  old_password: '' || undefined,
  password: '' || undefined,
  passwordConfirm: '' || undefined,
};

export const PasswordView = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'settings' });

  const [changePassword] = useUpdatePasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePassword>({
    defaultValues: defaultValues,
    resolver: yupResolver(changePasswordValidation),
  });

  const onSubmit: SubmitHandler<UpdatePassword> = data => {
    changePassword(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BoxSettings>
        <SettingTitle title="password" size="h4" />
        <PasswordViewBox>
          <Controller
            control={control}
            name="old_password"
            render={({ field }) => (
              <CurrentPasswordInput
                {...field}
                label={t('currentPassword')}
                error={!!errors.old_password?.message}
                helperText={conditionalTranslate(
                  t,
                  errors.old_password?.message,
                )}
                variant="filled"
                type="password"
                InputProps={{ disableUnderline: true }}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <NewPasswordInput
                {...field}
                label={t('newPassword')}
                error={!!errors.password?.message}
                helperText={conditionalTranslate(t, errors.password?.message)}
                variant="filled"
                type="password"
                InputProps={{ disableUnderline: true }}
              />
            )}
          />
          <Controller
            control={control}
            name="passwordConfirm"
            render={({ field }) => (
              <NewPasswordConfirmInput
                {...field}
                label={t('newPasswordConfirm')}
                error={!!errors.passwordConfirm?.message}
                helperText={conditionalTranslate(
                  t,
                  errors.passwordConfirm?.message,
                )}
                variant="filled"
                type="password"
                InputProps={{ disableUnderline: true }}
              />
            )}
          />
          <SaveSettingsButton
            variant="contained"
            color="secondary"
            disableFocusRipple
            type="submit"
          >
            {t('saveChanges')}
          </SaveSettingsButton>
        </PasswordViewBox>
      </BoxSettings>
    </form>
  );
};
