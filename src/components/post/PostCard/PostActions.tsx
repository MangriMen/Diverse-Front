import { StyledTextButton } from 'components/common/styles';
import { useTranslation } from 'react-i18next';

import { PostLike } from '../PostCommentLike/PostLike';
import { PostProps } from '../interfaces';
import { StyledActionBox } from '../styles';

export const PostCardActions = ({ post }: PostProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'post' });

  return (
    <StyledActionBox>
      <StyledTextButton color="dimmed" fontSize="14px">
        {t('share')}
      </StyledTextButton>
      <PostLike post={post} />
    </StyledActionBox>
  );
};
