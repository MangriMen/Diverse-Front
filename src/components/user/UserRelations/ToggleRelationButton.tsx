import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip, Typography } from '@mui/material';
import { StyledIconButton } from 'components/post/styles';
import { selectUser } from 'ducks/auth/selectors';
import {
  useCreateRelationMutation,
  useDeleteRelationMutation,
  useGetRelationStatusQuery,
} from 'ducks/user/api';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ServerGetRelationStatusResponse } from 'types/user';

import { ToggleRelationButtonProps } from './interfaces';

const getRelationStatusDefaultResponse: ServerGetRelationStatusResponse = {
  error: false,
  message: '',
  follower: false,
  following: false,
  blocked: false,
};

export const ToggleRelationButton = ({
  user,
  visible,
}: ToggleRelationButtonProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'user' });

  const localUser = useSelector(selectUser);

  const localUserID = localUser?.id ?? '';

  const relationMutationArgs = useMemo(
    () => ({
      path: { user: localUserID, relationUser: user.id },
      params: {
        type: 'following',
      },
    }),
    [localUserID, user.id],
  );

  const { data = getRelationStatusDefaultResponse } = useGetRelationStatusQuery(
    {
      path: { user: localUserID, relationUser: user.id },
    },
  );

  const [createRelation] = useCreateRelationMutation();
  const [deleteRelation] = useDeleteRelationMutation();

  const handleFollow = useCallback(() => {
    createRelation(relationMutationArgs);
  }, [createRelation, relationMutationArgs]);

  const handleUnfollow = useCallback(() => {
    deleteRelation(relationMutationArgs);
  }, [deleteRelation, relationMutationArgs]);

  return (
    <Tooltip
      placement="right"
      title={
        <Typography fontSize="14px">
          {t(data.following ? 'unfollow' : 'follow')}
        </Typography>
      }
    >
      <StyledIconButton
        style={{
          visibility: visible ?? true ? 'visible' : 'hidden',
        }}
        onClick={data.following ? handleUnfollow : handleFollow}
      >
        {data.following ? <CloseIcon /> : <AddIcon />}
      </StyledIconButton>
    </Tooltip>
  );
};
