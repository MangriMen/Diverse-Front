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
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
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

      const { avatar_url } = data;
      await sendSettings({
        path: { user: user?.id ?? '' },
        body: { avatar_url },
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
            <AvatarUpload />
            <Box display="flex" flexDirection="column" gap="1rem">
              <Typography>{'kek'}</Typography>
              <StyledInput
                label="changeName"
                variant="filled"
                InputProps={{ disableUnderline: true }}
              ></StyledInput>
              <Typography>{'lol'}</Typography>
              <StyledInput
                label="changeNick"
                variant="filled"
                InputProps={{ disableUnderline: true }}
              ></StyledInput>
            </Box>
            <Box display="flex" flexDirection="column" gap="1rem">
              <Typography>{'About'}</Typography>
              <StyledInput
                label="changeNick"
                variant="filled"
                multiline
                maxRows={6}
                InputProps={{ disableUnderline: true }}
                inputProps={{
                  maxLength: SHAPE_CONSTRAINTS.DESCRIPTION_MAX,
                }}
              ></StyledInput>
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
