import CloseIcon from '@mui/icons-material/Close';
import { ModalProps, Typography } from '@mui/material';
import { StyledIconButton, StyledModal } from 'components/post/styles';
import { RELATION_MAX_AVATARS_COUNT } from 'consts';
import { selectUser } from 'ducks/auth/selectors';
import {
  useGetRelationsCountQuery,
  useGetRelationsQuery,
} from 'ducks/user/api';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { AvatarButton } from '../AvatarButton';
import { UserRelationProps } from '../interfaces';
import { ToggleRelationButton } from './ToggleRelationButton';
import {
  getRelationsCountDefaultResponse,
  getRelationsDefaultResponse,
} from './UserRelation';
import {
  CardContentStyled,
  CardStyled,
  HeaderStyled,
  UserRelationListItem,
} from './styles';

export const UserRelationModal = ({
  open,
  onClose,
  user,
  type,
}: Omit<ModalProps, 'children'> & UserRelationProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'user' });

  const localUser = useSelector(selectUser);

  const title = type === 'following' ? 'followings' : 'followers';

  const handleButtonClose = useCallback(() => {
    if (onClose !== undefined) {
      onClose({}, 'escapeKeyDown');
    }
  }, [onClose]);

  const { data: dataCount = getRelationsCountDefaultResponse } =
    useGetRelationsCountQuery({
      path: { user: user.id },
      params: { type },
    });

  const { data = getRelationsDefaultResponse } = useGetRelationsQuery({
    path: { user: user.id },
    params: { count: RELATION_MAX_AVATARS_COUNT * 2, type },
  });

  const [relationsUsers, setRelationsUsers] = useState<ReactNode[]>();

  useEffect(() => {
    setRelationsUsers(
      data?.relations.map(relation => (
        <UserRelationListItem key={relation.id}>
          <AvatarButton user={relation.relation_user} />
          <Typography flex={1}>{relation.relation_user.username}</Typography>
          {localUser?.id !== relation.relation_user.id && (
            <ToggleRelationButton user={relation.relation_user} />
          )}
        </UserRelationListItem>
      )),
    );
  }, [data?.relations, dataCount.count, localUser?.id, user]);

  return (
    <StyledModal open={open} onClose={onClose}>
      <CardStyled elevation={1}>
        <HeaderStyled
          title={t(title, { count: dataCount.count })}
          action={
            <StyledIconButton onClick={handleButtonClose}>
              <CloseIcon />
            </StyledIconButton>
          }
        />
        <CardContentStyled>{relationsUsers}</CardContentStyled>
      </CardStyled>
    </StyledModal>
  );
};
