import { BoxSettingsView } from '../styles';
import { Route, Routes } from 'react-router-dom';
import { InformationView } from 'components/user/UserSettings/InformationView';
import { PasswordView } from 'components/user/UserSettings/PasswordView';
import { ROUTE_SETTINGS } from 'consts';

export const SettingsView = () => {
  return (
    <BoxSettingsView>
      <Routes>
        <Route
          path={ROUTE_SETTINGS.INFORMATION}
          element={<InformationView />}
        />
        <Route path={ROUTE_SETTINGS.PASSWORD} element={<PasswordView />} />
      </Routes>
    </BoxSettingsView>
  );
};
