import CloseIcon from '@mui/icons-material/Close';
import { List, ModalProps } from '@mui/material';
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

import { UserRelation } from './UserRelation';
import {
  getRelationsCountDefaultResponse,
  getRelationsDefaultResponse,
} from './UserRelations';
import { UserRelationsProps } from './interfaces';
import { CardContentStyled, CardStyled, HeaderStyled } from './styles';

export const UserRelationModal = ({
  open,
  onClose,
  user,
  type,
}: Omit<ModalProps, 'children'> & UserRelationsProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'user' });

  const localUser = useSelector(selectUser);

  const title = type === 'followings' ? 'followings' : 'followers';

  const typeForQuery = type === 'followings' ? 'following' : 'follower';

  const handleButtonClose = useCallback(() => {
    if (onClose !== undefined) {
      onClose({}, 'escapeKeyDown');
    }
  }, [onClose]);

  const { data: dataCount = getRelationsCountDefaultResponse } =
    useGetRelationsCountQuery({
      path: { user: user.id },
      params: { type: typeForQuery },
    });

  const { data = getRelationsDefaultResponse } = useGetRelationsQuery({
    path: { user: user.id },
    params: { count: RELATION_MAX_AVATARS_COUNT * 2, type: typeForQuery },
  });

  const [relationsUsers, setRelationsUsers] = useState<ReactNode[]>();

  useEffect(() => {
    setRelationsUsers(
      data?.relations.map(relation => (
        <UserRelation key={relation.id} relation={relation} />
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
        <CardContentStyled>
          <List>{relationsUsers}</List>
        </CardContentStyled>
      </CardStyled>
    </StyledModal>
  );
};
