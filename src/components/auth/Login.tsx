import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import { useLoginMutation } from 'ducks/auth/api';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginValues } from 'ducks/auth/types';

import {
  StyledFormBox,
  StyledInput,
  StyledTextButton,
  StyledSwitchActionBox,
  StyledWrapperBox,
  StyledButton,
} from './styles';
import { AuthFormProps } from './interfaces';
import { loginValidator } from './schemas';

export const Login: FC<AuthFormProps> = ({ changeFormType }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });
  const [login] = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginValidator),
  });

  const onSubmit: SubmitHandler<LoginValues> = data => {
    login(data);
  };

  return (
    <StyledWrapperBox>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFormBox>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <StyledInput
                label={t('emailPlaceholder')}
                variant="filled"
                {...field}
                error={!!errors.email?.message}
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
                error={!!errors.password?.message}
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
            {t('logIn')}
          </StyledButton>
        </StyledFormBox>
      </form>
      <StyledSwitchActionBox>
        <Typography align="center">{t('dontHaveAnAccount')}</Typography>

        <StyledTextButton variant="text" disableRipple onClick={changeFormType}>
          {t('signUp')}
        </StyledTextButton>
      </StyledSwitchActionBox>
    </StyledWrapperBox>
  );
};
