import { User } from 'types/auth';

export interface UserRelationProps {
  user: User | undefined;
  type: string;
}
