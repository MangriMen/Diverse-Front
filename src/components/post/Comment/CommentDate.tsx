import { Tooltip, Typography } from '@mui/material';
import capitalize from '@mui/utils/capitalize';
import { commentDateFormat } from 'consts';
import { dateDiff } from 'helpers/post';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CommentModel } from 'types/post';

export const CommentDate = ({
  created_at,
}: {
  created_at: CommentModel['created_at'];
}) => {
  const { i18n, t } = useTranslation('translation', { keyPrefix: 'comment' });

  const [commentDate] = useState(new Date(created_at));
  const [commentDateString] = useState(
    commentDate.toLocaleString(i18n.language, commentDateFormat),
  );

  const getDateDiff = useCallback(() => {
    return dateDiff(commentDate, new Date(Date.now()));
  }, [commentDate]);

  const [commentDateDiff, setCommentDateDiff] = useState(getDateDiff());

  const updateDateDiff = useCallback(() => {
    setCommentDateDiff(getDateDiff());
  }, [getDateDiff]);

  return (
    <Tooltip
      arrow
      placement="top"
      title={<Typography fontSize="inherit">{commentDateString}</Typography>}
    >
      <Typography
        onMouseOver={updateDateDiff}
        component="span"
        fontSize="12px"
        color="common.dimmed"
        alignSelf="center"
      >
        {t(`creationTime${capitalize(commentDateDiff.units)}`, {
          count: commentDateDiff.diff,
        })}
      </Typography>
    </Tooltip>
  );
};
