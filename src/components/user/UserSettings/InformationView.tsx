import { yupResolver } from '@hookform/resolvers/yup';
import { Box, styled } from '@mui/material';
import { AvatarUpload } from 'components/common/FileUpload/AvatarUpload';
import { SettingTitle } from 'components/common/SettingTitle';
import { SHAPE_CONSTRAINTS } from 'consts';
import { selectUser } from 'ducks/auth/selectors';
import { useDataMutation } from 'ducks/data/api';
import { DataValues } from 'ducks/data/types';
import { useUpdateUserInformationMutation } from 'ducks/user/api';
import { removeWhitespace } from 'helpers/auth';
import { conditionalTranslate } from 'helpers/conditionalTranslate';
import { OptionsObject, useSnackbar } from 'notistack';
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
  SaveSettingsButton,
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

interface SettingsSnackOption {
  title: string;
  options: OptionsObject;
}

const SettingsSnackOptions: {
  success: SettingsSnackOption;
  error: SettingsSnackOption;
} = {
  success: {
    title: 'successSettingsSave',
    options: {
      variant: 'success',
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
    },
  },
  error: {
    title: 'errorSettingsSave',
    options: {
      variant: 'error',
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
    },
  },
};

export const InformationView = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'settings' });
  const user = useSelector(selectUser);

  const { enqueueSnackbar } = useSnackbar();

  const form = useForm<UserForm>({
    defaultValues: {
      name: user?.name ?? undefined,
      username: user?.username,
      about: user?.about ?? undefined,
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

      enqueueSnackbar(
        t(SettingsSnackOptions.success.title),
        SettingsSnackOptions.success.options,
      );
    } catch (error) {
      enqueueSnackbar(
        t(SettingsSnackOptions.error.title),
        SettingsSnackOptions.error.options,
      );
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
                  variant="filled"
                  label={t('name')}
                  error={!!form.formState.errors.name?.message}
                  helperText={conditionalTranslate(
                    t,
                    form.formState.errors.name?.message,
                  )}
                  InputProps={{ disableUnderline: true }}
                  {...field}
                />
              )}
            />
            <Controller
              control={form.control}
              name="username"
              render={({ field }) => (
                <UsernameInputStyled
                  label={t('username')}
                  error={!!form.formState.errors.username?.message}
                  helperText={conditionalTranslate(
                    t,
                    form.formState.errors.username?.message,
                  )}
                  {...field}
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
                  variant="filled"
                  label={t('aboutMe')}
                  multiline
                  maxRows={7.2}
                  InputProps={{ disableUnderline: true }}
                  inputProps={{
                    maxLength: SHAPE_CONSTRAINTS.DESCRIPTION_MAX,
                  }}
                  helperText={`${value.length}/${SHAPE_CONSTRAINTS.DESCRIPTION_MAX}`}
                  {...field}
                  onChange={handleChange}
                />
              )}
            />
          </InformationViewBox>
          <SaveSettingsButton
            variant="contained"
            color="secondary"
            disableFocusRipple
            type="submit"
          >
            {t('saveChanges')}
          </SaveSettingsButton>
        </BoxSettings>
      </Box>
    </FormProvider>
  );
};
