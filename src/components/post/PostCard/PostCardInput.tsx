import { yupResolver } from '@hookform/resolvers/yup';
import SendIcon from '@mui/icons-material/Send';
import { InputBase, Paper, styled } from '@mui/material';
import { IconButtonStyled } from 'components/common';
import { PostProps } from 'components/post';
import { POST_INPUT_MAX_ROWS } from 'consts';
import { useSendCommentMutation } from 'ducks/comment/api';
import { BaseEmoji } from 'emoji-mart/dist-es';
import { KeyboardEvent, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EmojiButton } from '../EmojiButton';
import { commentValidator } from './schemas';

const PaperStyled = styled(Paper)`
  display: flex;
  align-items: center;
  box-shadow: none;
  padding: 0.25rem;
  gap: 0.25rem;
` as typeof Paper;

const InputStyled = styled(InputBase)`
  margin-left: 1rem;
  flex-grow: 1;
  font-size: 16px;
`;

interface InputValues {
  content: string;
}

const defaultValues = {
  content: '',
};

export const PostCardInput = ({ post }: PostProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'comment' });

  const { control, handleSubmit, reset, getValues, setValue } =
    useForm<InputValues>({
      defaultValues: defaultValues,
      resolver: yupResolver(commentValidator),
    });

  const [isSendDisabled, setIsSendDisabled] = useState(false);

  const [sendComment] = useSendCommentMutation();

  const handleEmojiSelect = (emoji: BaseEmoji) => {
    setValue('content', `${getValues('content')}${emoji.native}`);
  };

  const handleInputEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(handleSendComment)();
      return false;
    }
  };

  const handleSendComment: SubmitHandler<InputValues> = async data => {
    setIsSendDisabled(true);

    await sendComment({
      path: { post: post.id },
      body: data,
    });

    setIsSendDisabled(false);

    reset();
  };

  return (
    <PaperStyled
      component="form"
      onSubmit={handleSubmit(handleSendComment)}
      elevation={24}
    >
      <Controller
        control={control}
        name="content"
        render={({ field }) => (
          <InputStyled
            multiline
            maxRows={POST_INPUT_MAX_ROWS}
            placeholder={t('writeComment') ?? ''}
            {...field}
            onKeyDown={handleInputEnter}
          />
        )}
      />
      <EmojiButton
        disableRipple
        value="emoji"
        style={{ alignSelf: 'flex-end' }}
        onEmojiSelect={handleEmojiSelect}
      />
      <IconButtonStyled
        disableRipple
        type="submit"
        title={t('send') ?? ''}
        disabled={isSendDisabled}
        style={{ alignSelf: 'flex-end' }}
      >
        <SendIcon />
      </IconButtonStyled>
    </PaperStyled>
  );
};
