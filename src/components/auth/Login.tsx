import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import { StyledTextButton } from 'components/common/styles';
import { useLoginMutation } from 'ducks/auth/api';
import { LoginValues } from 'ducks/auth/types';
import { removeWhitespace } from 'helpers/auth';
import { conditionalTranslate } from 'helpers/conditionalTranslate';
import { ChangeEvent } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AuthFormProps } from './interfaces';
import { loginValidator } from './schemas';
import {
  StyledButton,
  StyledFormBox,
  StyledInput,
  StyledSwitchActionBox,
  StyledWrapperBox,
} from './styles';

const defaultValues = {
  email: '',
  password: '',
};

export const Login = ({ changeFormType }: AuthFormProps) => {
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

  const handleOnChangeNoSpace = (event: ChangeEvent<HTMLInputElement>) =>
    removeWhitespace(event.target.value);

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
              <StyledInput
                label={t('passwordPlaceholder')}
                variant="filled"
                {...field}
                error={!!errors.password?.message}
                helperText={conditionalTranslate(t, errors.password?.message)}
                type="password"
                InputProps={{ disableUnderline: true }}
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
            {t('logIn')}
          </StyledButton>
          <Typography align="center" color="error" fontSize="12px">
            {isError && t('notFound')}
          </Typography>
        </StyledFormBox>
      </form>
      <StyledSwitchActionBox>
        <Typography>{t('dontHaveAnAccount')}</Typography>

        <StyledTextButton
          disableRipple
          color="secondary"
          onClick={changeFormType}
        >
          {t('signUp')}
        </StyledTextButton>
      </StyledSwitchActionBox>
    </StyledWrapperBox>
  );
};
