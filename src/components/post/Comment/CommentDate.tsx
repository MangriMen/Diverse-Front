import { Tooltip, Typography, styled } from '@mui/material';
import capitalize from '@mui/utils/capitalize';
import { commentDateFormat } from 'consts';
import { dateDiff } from 'helpers/post';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CommentModel } from 'types/post';

const CommentDateText = styled(Typography)`
  display: inline;
  font-size: ${props => props.theme.typography.caption.fontSize};
  color: ${props => props.theme.palette.common.dimmed};
` as typeof Typography;

export const CommentDate = ({ date }: { date: CommentModel['created_at'] }) => {
  const { i18n, t } = useTranslation('translation', { keyPrefix: 'comment' });

  const [commentDate] = useState(new Date(date));
  const [commentDateString] = useState(
    commentDate.toLocaleString(i18n.language, commentDateFormat),
  );

  const getDateDiff = useCallback(() => {
    return dateDiff(commentDate, new Date(Date.now()));
  }, [commentDate]);

  const [commentDateDiff, setCommentDateDiff] = useState(getDateDiff());
  const [translationKey, setTranslationKey] = useState(
    `creationTime${capitalize(commentDateDiff.units)}`,
  );

  const updateDateDiff = useCallback(() => {
    const dateDiff = getDateDiff();
    setCommentDateDiff(dateDiff);
    setTranslationKey(`creationTime${capitalize(commentDateDiff.units)}`);
  }, [commentDateDiff.units, getDateDiff]);

  return (
    <Tooltip
      arrow
      placement="top"
      title={<Typography fontSize="inherit">{commentDateString}</Typography>}
    >
      <CommentDateText component="span" onMouseOver={updateDateDiff}>
        {t(translationKey, { count: commentDateDiff.diff })}
      </CommentDateText>
    </Tooltip>
  );
};
