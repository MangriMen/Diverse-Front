import { Box, Divider, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const BoxStyle = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SettingTitle = ({ title }: { title: string }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'settings' });

  return (
    <BoxStyle>
      <Typography typography="h3">{t(title)}</Typography>
      <Divider />
    </BoxStyle>
  );
};
