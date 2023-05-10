import { User } from 'types/auth';

export interface UserRelationProps {
  isMe?: boolean;
  user: User;
  type: 'followings' | 'followers';
}
