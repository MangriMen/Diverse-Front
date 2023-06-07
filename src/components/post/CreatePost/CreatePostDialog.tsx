import { Dialog, DialogProps, useMediaQuery, useTheme } from '@mui/material';
import { DIALOG_ELEVATION } from 'consts/style';

import { CreatePostForm } from './CreatePostForm';

export const CreatePostDialog = ({ ...props }: DialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    if (props?.onClose) {
      props.onClose({}, 'escapeKeyDown');
    }
  };

  return (
    <Dialog
      fullWidth
      fullScreen={fullScreen}
      PaperProps={{
        elevation: fullScreen ? 0 : DIALOG_ELEVATION,
        sx: {
          justifyContent: 'center',
          backgroundColor: 'transparent',
          maxWidth: fullScreen ? 'none' : '904px',
        },
      }}
      {...props}
    >
      <CreatePostForm onClose={handleClose} />
    </Dialog>
  );
};
