import '@mui/material';
import { Box, Modal } from '@mui/material';
import { FC } from 'react';

export const CreatePostForm: FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  console.log(isOpen);
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box></Box>
    </Modal>
  );
};
