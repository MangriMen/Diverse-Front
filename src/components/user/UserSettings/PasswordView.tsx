import { yupResolver } from '@hookform/resolvers/yup';
import { SettingTitle } from 'components/common/SettingTitle';
import { STORAGE_KEYS } from 'consts';
import { useUpdatePasswordMutation } from 'ducks/user/api';
import { UpdatePassword } from 'ducks/user/types';
import {
  conditionalTranslate,
  handleOnChangeNoSpace,
  storageSet,
} from 'helpers';
import { ChangeEvent } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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
  old_password: '',
  password: '',
  passwordConfirm: '',
};

export const PasswordView = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings',
  });

  const [changePassword] = useUpdatePasswordMutation();

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePassword>({
    defaultValues: defaultValues,
    resolver: yupResolver(changePasswordValidation),
  });

  const onSubmitHandler: SubmitHandler<UpdatePassword> = async data => {
    try {
      await changePassword(data).unwrap();
      storageSet(STORAGE_KEYS.IS_PASSWORD_CHANGED_SUCCESSFULLY, true);
    } catch (e) {
      storageSet(STORAGE_KEYS.IS_PASSWORD_CHANGED_SUCCESSFULLY, false);
    } finally {
      navigate(0);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <BoxSettings>
        <SettingTitle title="password" size="h4" />
        <PasswordViewBox>
          <Controller
            control={control}
            name="old_password"
            render={({ field }) => (
              <CurrentPasswordInput
                label={t('currentPassword')}
                error={!!errors.old_password?.message}
                helperText={conditionalTranslate(
                  t,
                  errors.old_password?.message,
                )}
                {...field}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  field.onChange(handleOnChangeNoSpace(event))
                }
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <NewPasswordInput
                label={t('newPassword')}
                error={!!errors.password?.message}
                helperText={conditionalTranslate(t, errors.password?.message)}
                {...field}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  field.onChange(handleOnChangeNoSpace(event))
                }
              />
            )}
          />
          <Controller
            control={control}
            name="passwordConfirm"
            render={({ field }) => (
              <NewPasswordConfirmInput
                label={t('newPasswordConfirm')}
                error={!!errors.passwordConfirm?.message}
                helperText={conditionalTranslate(
                  t,
                  errors.passwordConfirm?.message,
                )}
                {...field}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  field.onChange(handleOnChangeNoSpace(event))
                }
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
