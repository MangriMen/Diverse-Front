import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import { useRegisterMutation } from 'ducks/auth/api';
import { RegisterValues } from 'ducks/auth/types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  StyledFormBox,
  StyledInput,
  StyledTextButton,
  StyledSwitchActionBox,
  StyledWrapperBox,
  StyledButton,
} from './styles';
import { AuthFormProps } from './interfaces';
import { registerValidator } from './schemas';

export const Register: FC<AuthFormProps> = ({ changeFormType }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });
  const [register] = useRegisterMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
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
            name="name"
            render={({ field }) => (
              <StyledInput
                label={t('namePlaceholder')}
                variant="filled"
                {...field}
                helperText={
                  errors.name?.message != undefined
                    ? t(errors.name?.message)
                    : ' '
                }
                InputProps={{ disableUnderline: true }}
              />
            )}
          />
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <StyledInput
                label={t('usernamePlaceholder')}
                variant="filled"
                {...field}
                helperText={
                  errors.username?.message != undefined
                    ? t(errors.username?.message)
                    : ' '
                }
                InputProps={{ disableUnderline: true }}
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
                {...field}
                helperText={
                  errors.email?.message != undefined
                    ? t(errors.email?.message)
                    : ' '
                }
                InputProps={{ disableUnderline: true }}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <StyledInput
                label={t('passwordPlaceholder')}
                variant="filled"
                {...field}
                helperText={
                  errors.password?.message != undefined
                    ? t(errors.password?.message)
                    : ' '
                }
                type="password"
                InputProps={{ disableUnderline: true }}
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
        </StyledFormBox>
        <StyledSwitchActionBox>
          <Typography align="center">{t('alreadyHaveAnAccount')}</Typography>

          <StyledTextButton
            variant="text"
            disableRipple
            onClick={changeFormType}
          >
            {t('logIn')}
          </StyledTextButton>
        </StyledSwitchActionBox>
      </form>
    </StyledWrapperBox>
  );
};
