import { Box, InputAdornment } from '@mui/material';
import { StyledInput } from 'components/auth/styles';
import { AvatarUpload } from 'components/common/FileUpload/AvatarUpload';
import { SettingTitle } from 'components/common/SettingTitle';
import { StyledButton } from 'components/common/styles';
import { AT_THE_RATE_SIGN, SHAPE_CONSTRAINTS } from 'consts';
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

import { BoxSettings, InformationViewBox, InputViewBox } from '../styles';

type UserForm = User & DataValues;

export const InformationView = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'settings' });
  const user = useSelector(selectUser);

  const form = useForm<UserForm>({
    defaultValues: {
      name: user?.name,
      username: user?.username,
      about: user?.about,
    },
  });

  const [sendSettings] = useUpdateUserInformationMutation();
  const [sendData] = useDataMutation();

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

  return (
    <FormProvider {...form}>
      <Box component="form" onSubmit={form.handleSubmit(onSubmitHandler)}>
        <BoxSettings>
          <SettingTitle title="profile" />
          <InformationViewBox>
            <AvatarUpload image={user?.avatar_url} />
            <InputViewBox>
              <Controller
                control={form.control}
                name="name"
                render={({ field }) => (
                  <StyledInput
                    {...field}
                    variant="filled"
                    label={t('name')}
                    InputProps={{ disableUnderline: true }}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="username"
                render={({ field }) => (
                  <StyledInput
                    {...field}
                    label={t('username')}
                    variant="filled"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {AT_THE_RATE_SIGN}
                        </InputAdornment>
                      ),
                      disableUnderline: true,
                    }}
                  />
                )}
              />
            </InputViewBox>
            <Box display="flex" flexDirection="column" width="100%">
              <Controller
                control={form.control}
                name="about"
                render={({ field }) => (
                  <StyledInput
                    {...field}
                    label={t('aboutMe')}
                    variant="filled"
                    multiline
                    maxRows={7.19}
                    InputProps={{ disableUnderline: true }}
                    inputProps={{
                      maxLength: SHAPE_CONSTRAINTS.DESCRIPTION_MAX,
                    }}
                  />
                )}
              />
            </Box>
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
