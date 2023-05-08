import { Typography } from '@mui/material';
import { SkeletonStyled } from 'components/common/SkeletonStyled';
import { AvatarButton } from 'components/user/AvatarButton';
import { RelationBlock } from 'components/user/styles';
import { RELATION_MAX_AVATARS_COUNT } from 'consts';
import {
  useGetRelationsCountQuery,
  useGetRelationsQuery,
} from 'ducks/user/api';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ServerGetRelationsCountResponse,
  ServerGetRelationsResponse,
} from 'types/user';

import { UserRelationModal } from './UserRelationModal';
import { UserRelationsProps } from './interfaces';
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

export const UserRelations = ({ isMe, user, type }: UserRelationsProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'user' });

  const { relation } = useParams();

  const navigate = useNavigate();

  const title = type === 'followings' ? 'followings' : 'followers';
  const notFoundTitle = `${
    type === 'followings' ? 'noFollowings' : 'noFollowers'
  }${isMe ? '' : 'NotMe'}`;

  const typeForQuery = type === 'followings' ? 'following' : 'follower';

  const {
    data: dataCount = getRelationsCountDefaultResponse,
    isFetching: isDataCountFetching,
  } = useGetRelationsCountQuery({
    path: { user: user.id },
    params: { type: typeForQuery },
  });

  const { data = getRelationsDefaultResponse } = useGetRelationsQuery({
    path: { user: user.id },
    params: { count: RELATION_MAX_AVATARS_COUNT, type: typeForQuery },
  });

  const [relationsUsers, setRelationsUsers] = useState<ReactElement[]>();

  useEffect(() => {
    setRelationsUsers(
      data?.relations.map(relation => (
        <AvatarButton key={relation.id} user={relation.relation_user} />
      )),
    );
  }, [data?.relations, dataCount?.count]);

  const open = relation === type;

  const handleOpenModal = useCallback(() => {
    navigate(type);
  }, [navigate, type]);

  const handleCloseModal = useCallback(() => {
    navigate(-1);
  }, [navigate]);

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
