import { Tooltip, Typography } from '@mui/material';
import { dateDiff } from 'helpers/post';
import { useState } from 'react';
import { CommentModel } from 'types/post';

export const CommentDate = ({
  created_at,
}: {
  created_at: CommentModel['created_at'];
}) => {
  const [commentDate] = useState(new Date(created_at));
  const [commentDateString] = useState(
    commentDate.toLocaleString('ru-ru', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }),
  );

  const [commentDateDiff, setCommentDateDiff] = useState(
    dateDiff(commentDate, new Date(Date.now())),
  );

  return (
    <Tooltip
      arrow
      placement="top"
      title={<Typography fontSize="inherit">{commentDateString}</Typography>}
    >
      <Typography
        onMouseOver={() => {
          setCommentDateDiff(dateDiff(commentDate, new Date(Date.now())));
        }}
        component="span"
        fontSize="12px"
        color="common.dimmed"
        alignSelf="center"
      >
        {`${commentDateDiff.diff} ${commentDateDiff.units} назад`}
      </Typography>
    </Tooltip>
  );
};
