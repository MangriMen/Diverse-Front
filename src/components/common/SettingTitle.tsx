import {
  Box,
  Divider,
  Typography,
  TypographyProps,
  styled,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

export const BoxStyle = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SettingTitle = ({
  title,
  size,
}: {
  title: string;
  size: TypographyProps['variant'];
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'settings' });

  return (
    <BoxStyle>
      <Typography variant={size}>{t(title)}</Typography>
      <Divider />
    </BoxStyle>
  );
};
