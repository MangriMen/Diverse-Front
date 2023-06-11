import Picker from '@emoji-mart/react';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import {
  Box,
  Fade,
  Popper,
  ToggleButtonProps,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ToggleButtonStyled } from 'components/common';
import { INPUT_EMOJI_FADE_TIMEOUT } from 'consts';
import { BaseEmoji } from 'emoji-mart/dist-es';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const EmojiButton = ({
  onEmojiSelect,
  ...props
}: {
  onEmojiSelect: (emoji: BaseEmoji) => void;
} & ToggleButtonProps) => {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'comment' });

  const theme = useTheme();
  const narrowKeyboard = useMediaQuery(theme.breakpoints.down('mobile'));

  const ref = useRef<HTMLButtonElement | null>(null);

  const [open, setOpen] = useState(false);

  const [timerActive, setTimerActive] = useState(0);

  const handleHover = () => {
    setOpen(true);
    setTimerActive(0);
  };

  const handleClick = () => {
    setOpen(prevState => !prevState);
    setTimerActive(0);
  };

  const handlePopperHover = () => {
    setOpen(true);
    setTimerActive(0);
  };

  const handleClose = () => {
    setTimerActive(Math.random());
  };

  useEffect(() => {
    if (timerActive) {
      const timerID = setTimeout(() => {
        setOpen(false);
        setTimerActive(0);
      }, 0);

      return () => clearTimeout(timerID);
    }
  }, [timerActive]);

  return (
    <>
      <ToggleButtonStyled
        selected={open}
        ref={ref}
        title={t('emoji') ?? ''}
        {...props}
        onMouseEnter={handleHover}
        onMouseLeave={handleClose}
        onClick={handleClick}
      >
        <SentimentSatisfiedOutlinedIcon />
      </ToggleButtonStyled>
      <Popper
        transition
        open={open}
        anchorEl={ref?.current}
        placement="top"
        onMouseEnter={handlePopperHover}
        onMouseLeave={handleClose}
        style={{ zIndex: 100000 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={INPUT_EMOJI_FADE_TIMEOUT}>
            <Box>
              <Picker
                perLine={narrowKeyboard ? 6 : 9}
                theme="dark"
                navPosition="bottom"
                previewPosition="none"
                locale={i18n.language}
                onEmojiSelect={onEmojiSelect}
              />
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};
