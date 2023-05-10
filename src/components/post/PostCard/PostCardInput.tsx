import SendIcon from '@mui/icons-material/Send';
import { IconButton, InputBase, Paper, styled } from '@mui/material';
import { PostProps } from 'components/post';
import { useSendCommentMutation } from 'ducks/comment/api';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

const PaperStyled = styled(Paper)`
  display: flex;
  align-items: center;
  box-shadow: none;
` as typeof Paper;

const InputStyled = styled(InputBase)`
  margin-left: 1rem;
  flex-grow: 1;
  font-size: 16px;
`;

export const PostCardInput = ({ post }: PostProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'comment' });

  const [isSendDisabled, setIsSendDisabled] = useState(false);

  const [commentText, setCommentText] = useState('');

  const [sendComment] = useSendCommentMutation();

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  }, []);

  const handleSendComment = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      setIsSendDisabled(true);

      await sendComment({
        path: { post: post.id },
        body: { content: commentText },
      });

      setCommentText('');
      setIsSendDisabled(false);
    },
    [commentText, post.id, sendComment],
  );

  return (
    <PaperStyled component="form" onSubmit={handleSendComment} elevation={24}>
      <InputStyled
        placeholder={t('writeComment') ?? ''}
        value={commentText}
        onChange={handleInputChange}
      />
      <IconButton
        type="submit"
        title={t('send') ?? ''}
        disableRipple
        disabled={isSendDisabled}
      >
        <SendIcon />
      </IconButton>
    </PaperStyled>
  );
};
