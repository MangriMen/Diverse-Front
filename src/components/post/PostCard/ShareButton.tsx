import { getShareUrl } from 'helpers/post';
import { useModal } from 'mui-modal-provider';
import { useTranslation } from 'react-i18next';

import { ShareDialog } from '../ShareDialog';
import { PostProps } from '../interfaces';
import { PostButton } from '../styles';

export const ShareButton = ({ post }: Pick<PostProps, 'post'>) => {
  const { t } = useTranslation('translation', { keyPrefix: 'post' });

  const { showModal } = useModal({ disableAutoDestroy: true });

  const postURL = getShareUrl(post);

  const handleOpenShareDialog = () =>
    showModal(
      ShareDialog,
      {
        value: postURL,
      },
      { destroyOnClose: false },
    );

  return <PostButton onClick={handleOpenShareDialog}>{t('share')}</PostButton>;
};
