import { Box, Modal, ModalProps, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { UserRelationProps } from '../interfaces';

export const UserRelationModal = ({
  open,
  onClose,
  type,
}: Omit<ModalProps, 'children'> & UserRelationProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'user' });

  const realCount = 0;

  return (
    <Modal open={open} onClose={onClose}>
      <Box>
        <Typography>
          {t(type === 'following' ? 'followings' : 'followers')}
          {realCount > 0 && ` (${realCount})`}
        </Typography>
      </Box>
    </Modal>
  );
};
