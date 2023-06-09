import { DataValues } from 'ducks/data/types';
import { PostValues } from 'ducks/post/types';

export interface CreatePostFormProps {
  onClose: () => void;
}

export type PostForm = PostValues & DataValues;
