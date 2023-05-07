import { ViewButton } from 'components/common/ViewButton';
import { ROUTE_SETTINGS } from 'consts';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { BoxSettingsNavigation } from '../styles';

export const ButtonView = () => {
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
  );
};
