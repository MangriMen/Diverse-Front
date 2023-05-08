import { Box, Typography } from '@mui/material';
import { StyledInput } from 'components/auth/styles';
import { AvatarUpload } from 'components/common/FileUpload/AvatarUpload';
import { SettingTitle } from 'components/common/SettingTitle';
import { StyledButton } from 'components/common/styles';
import { SHAPE_CONSTRAINTS } from 'consts';
import { selectUser } from 'ducks/auth/selectors';
import { useDataMutation } from 'ducks/data/api';
import { DataValues } from 'ducks/data/types';
import { useUpdateUserInformationMutation } from 'ducks/user/api';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { User } from 'types/auth';

import { BoxSettings } from '../styles';

type UserForm = User & DataValues;

const defaultValues = {
  avatar_url: '',
  email: '',
  name: '',
  username: '',
  about: '',
};

export const InformationView = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'settings' });

  const form = useForm<UserForm>({ defaultValues: defaultValues });

  const [sendSettings] = useUpdateUserInformationMutation();
  const [sendData] = useDataMutation();

  const user = useSelector(selectUser);

  const onSubmitHandler: SubmitHandler<UserForm> = async data => {
    const formData = new FormData();
    formData.append('file', data.file[0] ?? '');
    try {
      const { path } = await sendData(formData).unwrap();

      data.avatar_url = path;

      const { avatar_url, name, username, about } = data;
      await sendSettings({
        path: { user: user?.id ?? '' },
        body: { avatar_url, name, username, about },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider {...form}>
      <Box component="form" onSubmit={form.handleSubmit(onSubmitHandler)}>
        <BoxSettings>
          <SettingTitle title="profile" />
          <Box display="flex" gap="3rem">
            <AvatarUpload image={user?.avatar_url} />
            <Box display="flex" flexDirection="column" gap="1rem">
              <Typography>{t('name')}</Typography>
              <Controller
                control={form.control}
                name="name"
                render={({ field }) => (
                  <StyledInput
                    {...field}
                    variant="filled"
                    value={user?.name}
                    label={t('name')}
                    InputProps={{ disableUnderline: true }}
                  />
                )}
              />
              <Typography>{t('username')}</Typography>
              <Controller
                control={form.control}
                name="username"
                render={({ field }) => (
                  <StyledInput
                    {...field}
                    label={t('username')}
                    value={user?.username}
                    variant="filled"
                    InputProps={{ disableUnderline: true }}
                  />
                )}
              />
            </Box>
            <Box display="flex" flexDirection="column" gap="1rem">
              <Typography>{t('aboutMe')}</Typography>
              <Controller
                control={form.control}
                name="about"
                render={({ field }) => (
                  <StyledInput
                    {...field}
                    label={null}
                    variant="filled"
                    multiline
                    maxRows={6}
                    value={user?.about}
                    InputProps={{ disableUnderline: true }}
                    inputProps={{
                      maxLength: SHAPE_CONSTRAINTS.DESCRIPTION_MAX,
                    }}
                  />
                )}
              />
            </Box>
          </Box>
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
