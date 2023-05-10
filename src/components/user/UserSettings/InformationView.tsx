import { yupResolver } from '@hookform/resolvers/yup';
import { Box, InputAdornment, styled } from '@mui/material';
import { AvatarUpload } from 'components/common/FileUpload/AvatarUpload';
import { SettingTitle } from 'components/common/SettingTitle';
import { StyledButton } from 'components/common/styles';
import { AT_THE_RATE_SIGN, SHAPE_CONSTRAINTS } from 'consts';
import { selectUser } from 'ducks/auth/selectors';
import { useDataMutation } from 'ducks/data/api';
import { DataValues } from 'ducks/data/types';
import { useUpdateUserInformationMutation } from 'ducks/user/api';
import { removeWhitespace } from 'helpers/auth';
import { conditionalTranslate } from 'helpers/conditionalTranslate';
import { ChangeEvent, useState } from 'react';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { User } from 'types/auth';

import {
  AboutInputStyled,
  BoxSettings,
  InformationViewBox,
  NameInputStyled,
  UsernameInputStyled,
} from '../styles';
import { settingsValidator } from './schemas';

type UserForm = User & DataValues;

export const AvatarUploadStyled = styled(AvatarUpload)`
  grid-row: 1 / 3;
  grid-column: 1;
  flex-shrink: 1;
  ${props => props.theme.breakpoints.down('md')} {
    grid-column: 1;
    grid-row: 1;
    justify-self: center;
  }
`;

export const InformationView = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'settings' });
  const user = useSelector(selectUser);

  const form = useForm<UserForm>({
    defaultValues: {
      name: user?.name,
      username: user?.username,
      about: user?.about,
    },
    resolver: yupResolver(settingsValidator),
  });

  const [sendSettings] = useUpdateUserInformationMutation();
  const [sendData] = useDataMutation();
  const [value, setValue] = useState('');

  const onSubmitHandler: SubmitHandler<UserForm> = async data => {
    const formData = new FormData();
    formData.append('file', data.file[0] ?? '');
    try {
      if (data.file[0] !== undefined) {
        const { path } = await sendData(formData).unwrap();
        data.avatar_url = path;
      }

      await sendSettings({
        path: { user: user?.id ?? '' },
        body: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChangeNoSpace = (event: ChangeEvent<HTMLInputElement>) =>
    removeWhitespace(event.target.value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <FormProvider {...form}>
      <Box component="form" onSubmit={form.handleSubmit(onSubmitHandler)}>
        <BoxSettings>
          <SettingTitle title="profile" size="h4" />
          <InformationViewBox>
            <AvatarUploadStyled image={user?.avatar_url} />
            <Controller
              control={form.control}
              name="name"
              render={({ field }) => (
                <NameInputStyled
                  {...field}
                  variant="filled"
                  label={t('name')}
                  error={!!form.formState.errors.name?.message}
                  helperText={conditionalTranslate(
                    t,
                    form.formState.errors.name?.message,
                  )}
                  InputProps={{ disableUnderline: true }}
                />
              )}
            />
            <Controller
              control={form.control}
              name="username"
              render={({ field }) => (
                <UsernameInputStyled
                  {...field}
                  label={t('username')}
                  variant="filled"
                  autoComplete="off"
                  error={!!form.formState.errors.username?.message}
                  helperText={conditionalTranslate(
                    t,
                    form.formState.errors.username?.message,
                  )}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {AT_THE_RATE_SIGN}
                      </InputAdornment>
                    ),
                    disableUnderline: true,
                  }}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    field.onChange(handleOnChangeNoSpace(event))
                  }
                />
              )}
            />
            <Controller
              control={form.control}
              name="about"
              render={({ field }) => (
                <AboutInputStyled
                  {...field}
                  label={t('aboutMe')}
                  variant="filled"
                  autoComplete="off"
                  multiline
                  maxRows={7.2}
                  InputProps={{ disableUnderline: true }}
                  inputProps={{
                    maxLength: SHAPE_CONSTRAINTS.DESCRIPTION_MAX,
                  }}
                  helperText={`${value.length}/${SHAPE_CONSTRAINTS.DESCRIPTION_MAX}`}
                  onChange={handleChange}
                />
              )}
            />
          </InformationViewBox>
          <StyledButton
            variant="contained"
            color="secondary"
            disableFocusRipple
            type="submit"
          >
            {t('saveChanges')}
          </StyledButton>
        </BoxSettings>
      </Box>
    </FormProvider>
  );
};
