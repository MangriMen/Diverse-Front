import { Typography } from '@mui/material';
import { SkeletonStyled } from 'components/common/SkeletonStyled';
import { AvatarButton } from 'components/user/AvatarButton';
import { UserRelationProps } from 'components/user/interfaces';
import { RelationBlock } from 'components/user/styles';
import { RELATION_MAX_AVATARS_COUNT } from 'consts';
import {
  useGetRelationsCountQuery,
  useGetRelationsQuery,
} from 'ducks/user/api';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ServerGetRelationsCountResponse,
  ServerGetRelationsResponse,
} from 'types/user';

import { UserRelationModal } from './UserRelationModal';
import { AvatarGroupStyled, RelationInfo, RelationInfoText } from './styles';

export const getRelationsCountDefaultResponse: ServerGetRelationsCountResponse =
  {
    error: false,
    message: '',
    count: 0,
  };

export const getRelationsDefaultResponse: ServerGetRelationsResponse = {
  error: false,
  message: '',
  count: 0,
  relations: [],
};

export const UserRelation = ({ isMe, user, type }: UserRelationProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'user' });

  const title = type === 'following' ? 'followings' : 'followers';
  const notFoundTitle = `${
    type === 'following' ? 'noFollowings' : 'noFollowers'
  }${isMe ? '' : 'NotMe'}`;

  const {
    data: dataCount = getRelationsCountDefaultResponse,
    isFetching: isDataCountFetching,
  } = useGetRelationsCountQuery({
    path: { user: user.id },
    params: { type },
  });

  const { data = getRelationsDefaultResponse } = useGetRelationsQuery({
    path: { user: user.id },
    params: { count: RELATION_MAX_AVATARS_COUNT, type },
  });

  const [relationsUsers, setRelationsUsers] = useState<ReactElement[]>();

  useEffect(() => {
    setRelationsUsers(
      data?.relations.map(relation => (
        <AvatarButton key={relation.id} user={relation.relation_user} />
      )),
    );
  }, [data?.relations, dataCount?.count]);

  const [open, setOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <UserRelationModal
        open={open}
        onClose={handleCloseModal}
        user={user}
        type={type}
      />
      <RelationBlock>
        {isDataCountFetching && <SkeletonStyled variant="text" width={100} />}
        {!isDataCountFetching && (
          <RelationInfoText onClick={handleOpenModal}>
            {t(title, { count: dataCount.count })}
          </RelationInfoText>
        )}
        <RelationInfo>
          {dataCount.count === 0 && (
            <Typography fontSize="14px" color="common.dimmed">
              {t(notFoundTitle)}
            </Typography>
          )}
          {dataCount.count > 0 && (
            <AvatarGroupStyled
              total={dataCount.count}
              max={RELATION_MAX_AVATARS_COUNT}
              slotProps={{
                additionalAvatar: {
                  onClick: handleOpenModal,
                },
              }}
            >
              {relationsUsers}
            </AvatarGroupStyled>
          )}
        </RelationInfo>
      </RelationBlock>
    </>
  );
};
