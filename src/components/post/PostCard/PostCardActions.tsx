import { PostLike } from 'components/post/Like';
import {
  StyledActionBox as PostActions,
  PostButton,
  PostProps,
} from 'components/post';
import { useTranslation } from 'react-i18next';

export const PostCardActions = ({ post }: PostProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'post' });

  return (
    <PostActions>
      <PostButton>{t('share')}</PostButton>
      <PostLike post={post} />
    </PostActions>
  );
};
