import { Dialog, useMediaQuery, useTheme } from '@mui/material';
import { ROUTE } from 'consts';
import { DIALOG_ELEVATION } from 'consts/style';
import { postLoader } from 'helpers';
import { LoaderData } from 'helpers/types';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { Post } from '../Post';

export const FullscreenPost = () => {
  const { post } = useLoaderData() as LoaderData<typeof postLoader>;

  const navigate = useNavigate();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('mobile'));

  const onClose = () => {
    navigate(ROUTE.HOME);
  };

  return (
    <Dialog
      open
      fullScreen={fullScreen}
      onClose={onClose}
      fullWidth
      PaperProps={{
        elevation: DIALOG_ELEVATION,
        style: {
          height: '100%',
          justifyContent: 'center',
          backgroundColor: theme.palette.primary.main,
          maxWidth: theme.breakpoints.values.xl,
        },
      }}
    >
      <Post post={post} size="fullscreen" />
    </Dialog>
  );
};
