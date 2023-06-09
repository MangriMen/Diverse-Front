import Picker from '@emoji-mart/react';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import {
  IconButton,
  IconButtonProps,
  Popover,
  PopoverProps,
} from '@mui/material';
import { BaseEmoji } from 'emoji-mart/dist-es';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const EmojiButton = ({
  onEmojiSelect,
  PopoverProps,
  ...props
}: {
  onEmojiSelect: (emoji: BaseEmoji) => void;
  PopoverProps?: Omit<PopoverProps, 'open'>;
} & IconButtonProps) => {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'comment' });

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton title={t('emoji') ?? ''} {...props} onClick={handleClick}>
        <SentimentSatisfiedOutlinedIcon />
      </IconButton>
      <Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{ style: { background: 'transparent' } }}
        {...PopoverProps}
      >
        <Picker locale={i18n.language} onEmojiSelect={onEmojiSelect} />
      </Popover>
    </>
  );
};
