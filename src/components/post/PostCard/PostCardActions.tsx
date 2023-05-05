import {
  StyledActionBox as PostActions,
  PostButton,
  PostProps,
} from 'components/post';
import { PostLike } from 'components/post/Like';
import { getShareUrl } from 'helpers/post';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ShareDialog } from '../ShareDialog';

export const PostCardActions = ({ post }: PostProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'post' });

  const postURL = getShareUrl(post);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <PostActions>
      <ShareDialog
        keepMounted
        open={open}
        onClose={handleClose}
        value={postURL}
      />
      <PostButton onClick={handleOpen}>{t('share')}</PostButton>
      <PostLike post={post} />
    </PostActions>
  );
};
