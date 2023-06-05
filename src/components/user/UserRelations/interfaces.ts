import { User } from 'types/auth';
import { RelationModel } from 'types/user';

export interface ToggleRelationButtonProps {
  user: User;
  visible?: boolean;
}

export interface UserRelationProps {
  relation: RelationModel;
}

export interface UserRelationsProps {
  isMe?: boolean;
  user: User;
  type: 'followings' | 'followers';
}
