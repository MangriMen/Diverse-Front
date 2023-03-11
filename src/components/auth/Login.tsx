import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import { useLoginMutation } from 'ducks/auth/api';
import { LoginValues } from 'ducks/auth/types';
import { conditionalTranslate } from 'helpers/conditionalTranslate';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AuthFormProps } from './interfaces';
import { loginValidator } from './schemas';
import {
  StyledButton,
  StyledFormBox,
  StyledInput,
  StyledSwitchActionBox,
  StyledTextButton,
  StyledWrapperBox,
} from './styles';

const defaultValues = {
  email: '',
  password: '',
};

export const Login: FC<AuthFormProps> = ({ changeFormType }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });
  const [login, { isError }] = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    defaultValues: defaultValues,
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
                helperText={conditionalTranslate(t, errors.email?.message)}
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
                helperText={conditionalTranslate(t, errors.password?.message)}
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
          <Typography align="center" color="error" fontSize="12px">
            {isError && t('notFound')}
          </Typography>
        </StyledFormBox>
      </form>
      <StyledSwitchActionBox>
        <Typography>{t('dontHaveAnAccount')}</Typography>

        <StyledTextButton variant="text" disableRipple onClick={changeFormType}>
          {t('signUp')}
        </StyledTextButton>
      </StyledSwitchActionBox>
    </StyledWrapperBox>
  );
};
