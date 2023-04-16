import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import { useSendCommentMutation } from 'ducks/comment/api';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import { PostProps } from './interfaces';
import { StyledInputBase, StyledPaper } from './styles';

export const PostCardInput = ({ post }: PostProps) => {
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
    <StyledPaper component="form" onSubmit={handleSendComment} elevation={24}>
      <StyledInputBase
        placeholder="Написать комментарий..."
        value={commentText}
        onChange={handleInputChange}
      />
      <IconButton type="submit" disableRipple disabled={isSendDisabled}>
        <SendIcon />
      </IconButton>
    </StyledPaper>
  );
};
