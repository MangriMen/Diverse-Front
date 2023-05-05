import { PostValues } from 'ducks/post/types';
import { DataValues } from 'ducks/data/types';

export interface CreatePostFormProps {
  onClose: () => void;
}

export type PostForm = PostValues & DataValues;
