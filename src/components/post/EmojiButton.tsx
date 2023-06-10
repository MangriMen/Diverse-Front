import Picker from '@emoji-mart/react';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import { IconButton, IconButtonProps, Popper } from '@mui/material';
import { BaseEmoji } from 'emoji-mart/dist-es';
import { MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const EmojiButton = ({
  onEmojiSelect,
  ...props
}: {
  onEmojiSelect: (emoji: BaseEmoji) => void;
} & IconButtonProps) => {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'comment' });

  const [open, setOpen] = useState(false);

  const [timerActive, setTimerActive] = useState('');

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();

  const handleHover = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(prevState => !prevState);
  };

  const handlePopperHover = () => {
    setOpen(true);
    setTimerActive('');
  };

  const handleClose = () => {
    setTimerActive(`${Math.random()}`);
  };

  useEffect(() => {
    if (timerActive) {
      const timerID = setTimeout(() => {
        setOpen(false);
        setTimerActive('');
      }, 1000);

      return () => clearTimeout(timerID);
    } else {
      const timerID = setTimeout(() => {
        setTimerActive('');
      }, 0);

      return () => clearTimeout(timerID);
    }
  }, [timerActive]);

  return (
    <>
      <IconButton
        style={{ background: 'transparent' }}
        title={t('emoji') ?? ''}
        {...props}
        onMouseEnter={handleHover}
        onMouseLeave={handleClose}
        onClick={handleClick}
      >
        <SentimentSatisfiedOutlinedIcon />
      </IconButton>
      <Popper
        open={open}
        onMouseEnter={handlePopperHover}
        onMouseLeave={handleClose}
        anchorEl={anchorEl}
        style={{ zIndex: 100000 }}
      >
        <Picker
          theme="dark"
          navPosition="bottom"
          previewPosition="none"
          locale={i18n.language}
          onEmojiSelect={onEmojiSelect}
        />
      </Popper>
    </>
  );
};
