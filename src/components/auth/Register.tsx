import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import { PasswordInput } from 'components/common/PasswordInput';
import { StyledButton, StyledTextButton } from 'components/common/styles';
import { useRegisterMutation } from 'ducks/auth/api';
import { RegisterValues } from 'ducks/auth/types';
import { handleOnChangeNickname, handleOnChangeNoSpace } from 'helpers/auth';
import { conditionalTranslate } from 'helpers/conditionalTranslate';
import { ChangeEvent, FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AuthFormProps } from './interfaces';
import { registerValidator } from './schemas';
import {
  StyledFormBox,
  StyledInput,
  StyledSwitchActionBox,
  StyledWrapperBox,
} from './styles';

const defaultValues = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

export const Register: FC<AuthFormProps> = ({ changeFormType }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });
  const [register, { isError }] = useRegisterMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    defaultValues: defaultValues,
    resolver: yupResolver(registerValidator),
  });

  const onSubmit: SubmitHandler<RegisterValues> = data => {
    register(data);
  };

  return (
    <StyledWrapperBox>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFormBox>
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <StyledInput
                label={t('usernamePlaceholder')}
                variant="filled"
                error={!!errors.username?.message}
                helperText={conditionalTranslate(t, errors.username?.message)}
                InputProps={{ disableUnderline: true }}
                autoComplete="username"
                {...field}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  field.onChange(handleOnChangeNickname(event))
                }
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <StyledInput
                label={t('emailPlaceholder')}
                variant="filled"
                error={!!errors.email?.message}
                helperText={conditionalTranslate(t, errors.email?.message)}
                InputProps={{ disableUnderline: true }}
                autoComplete="email"
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
              <PasswordInput
                withShow
                label={t('passwordPlaceholder')}
                error={!!errors.password?.message}
                helperText={conditionalTranslate(t, errors.password?.message)}
                autoComplete="new-password"
                {...field}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  field.onChange(handleOnChangeNoSpace(event))
                }
              />
            )}
          />
          <Controller
            name="passwordConfirm"
            control={control}
            render={({ field }) => (
              <PasswordInput
                label={t('passwordConfirm')}
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

          <StyledButton
            variant="contained"
            color="secondary"
            disableFocusRipple
            type="submit"
          >
            {t('signUp')}
          </StyledButton>
          <Typography align="center" color="error" fontSize="12px">
            {isError && t('alreadyTaken')}
          </Typography>
        </StyledFormBox>
        <StyledSwitchActionBox>
          <Typography align="center">{t('alreadyHaveAnAccount')}</Typography>

          <StyledTextButton
            disableRipple
            color="secondary"
            onClick={changeFormType}
          >
            {t('logIn')}
          </StyledTextButton>
        </StyledSwitchActionBox>
      </form>
    </StyledWrapperBox>
  );
};
