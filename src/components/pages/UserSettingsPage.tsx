import {
  BoxSettingsNavigation,
  BoxSettingsView,
  StyledContainer,
} from './styles';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { ROUTE_SETTINGS } from 'consts';
import { InformationView } from 'components/user/UserSettings/InformationView';
import { PasswordView } from 'components/user/UserSettings/PasswordView';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ViewButton } from 'components/common/ViewButton';

export const UserSettingsPage = () => {
  const { page } = useParams();
  const { t } = useTranslation('translation', { keyPrefix: 'settings' });

  const navigate = useNavigate();

  const toInformationView = () => {
    navigate(ROUTE_SETTINGS.INFORMATION);
  };

  const toPasswordView = () => {
    navigate(ROUTE_SETTINGS.PASSWORD);
  };

  useEffect(() => {
    if (page === undefined) {
      navigate('information');
    }
  }, [navigate, page]);

  return (
    <StyledContainer maxWidth="lg">
      <BoxSettingsNavigation>
        <ViewButton
          active={page === ROUTE_SETTINGS.INFORMATION}
          onClick={toInformationView}
        >
          {t('information')}
        </ViewButton>
        <ViewButton
          active={page === ROUTE_SETTINGS.PASSWORD}
          onClick={toPasswordView}
        >
          {t('password')}
        </ViewButton>
      </BoxSettingsNavigation>
      <BoxSettingsView>
        <Routes>
          <Route
            path={ROUTE_SETTINGS.INFORMATION}
            element={<InformationView />}
          />
          <Route path={ROUTE_SETTINGS.PASSWORD} element={<PasswordView />} />
        </Routes>
      </BoxSettingsView>
    </StyledContainer>
  );
};
