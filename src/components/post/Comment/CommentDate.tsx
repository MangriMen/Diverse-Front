import { Tooltip, Typography, styled } from '@mui/material';
import capitalize from '@mui/utils/capitalize';
import { COMMENT_DATE_TOOLTIP_TIMEOUT, commentDateFormat } from 'consts';
import { DateDiff, dateDiff } from 'helpers/post';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CommentModel } from 'types/post';

const CommentDateText = styled(Typography)`
  display: inline;
  font-size: ${props => props.theme.typography.caption.fontSize};
  color: ${props => props.theme.palette.common.dimmed};
` as typeof Typography;

const baseKeyPart = 'creationTime';

export const CommentDate = ({
  timestamp,
}: {
  timestamp: CommentModel['created_at'];
}) => {
  const { i18n, t } = useTranslation('translation', { keyPrefix: 'comment' });

  const { commentDate, localizedDate } = useMemo(() => {
    const date = new Date(timestamp);
    return {
      commentDate: date,
      localizedDate: date.toLocaleString(i18n.language, commentDateFormat),
    };
  }, [i18n.language, timestamp]);

  const getDateDiff = useCallback(
    () => dateDiff(commentDate, new Date()),
    [commentDate],
  );

  const [currentDiff, setCurrentDiff] = useState(getDateDiff());

  const getDisplayDate = useCallback(
    (diff: DateDiff) => {
      return t(`${baseKeyPart}${capitalize(diff.units)}`, { count: diff.diff });
    },
    [t],
  );

  const [displayDate, setDisplayDate] = useState<string | null>(
    getDisplayDate(getDateDiff()),
  );

  const updateDateDiff = useCallback(() => {
    const diff = getDateDiff();
    if (currentDiff.units !== diff.units || currentDiff.diff !== diff.diff) {
      setCurrentDiff(diff);
      setDisplayDate(getDisplayDate(diff));
    }
  }, [currentDiff.diff, currentDiff.units, getDateDiff, getDisplayDate]);

  useEffect(() => {
    updateDateDiff();
  }, [updateDateDiff]);

  return (
    <Tooltip
      arrow
      placement="top"
      enterDelay={COMMENT_DATE_TOOLTIP_TIMEOUT}
      enterNextDelay={COMMENT_DATE_TOOLTIP_TIMEOUT}
      title={
        <Typography onMouseMove={updateDateDiff} fontSize="inherit">
          {localizedDate}
        </Typography>
      }
    >
      <CommentDateText
        component="time"
        dateTime={commentDate.toISOString()}
        onMouseMove={updateDateDiff}
      >
        {displayDate}
      </CommentDateText>
    </Tooltip>
  );
};
