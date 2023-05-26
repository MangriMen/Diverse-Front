import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { IconButtonStyled, InputStyled, StyledButton } from 'components/common';
import { DIALOG_ELEVATION } from 'consts/style';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

export interface ShareDialogProps extends DialogProps {
  value: string;
}

export const ShareDialog = ({ value, ...props }: ShareDialogProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'post' });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { enqueueSnackbar } = useSnackbar();

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    enqueueSnackbar(t('copied'), {
      variant: 'info',
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
    });
  };

  const handleClose = () => {
    if (props?.onClose) {
      props.onClose({}, 'escapeKeyDown');
    }
  };

  return (
    <Dialog
      fullWidth
      fullScreen={fullScreen}
      PaperProps={{ elevation: DIALOG_ELEVATION }}
      {...props}
    >
      <DialogTitle>{t('share')}</DialogTitle>
      <DialogContent>
        <InputStyled
          readOnly
          value={value}
          endAdornment={
            <IconButtonStyled
              onClick={handleCopy}
              title={t('copy') ?? ''}
              disableRipple
              size="small"
            >
              <ContentCopyIcon fontSize="small" />
            </IconButtonStyled>
          }
        />
      </DialogContent>
      <DialogActions>
        <StyledButton
          variant="contained"
          color="secondary"
          disableFocusRipple
          onClick={handleClose}
        >
          {t('close')}
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};
