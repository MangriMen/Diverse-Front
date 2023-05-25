import { STORAGE_KEYS } from 'consts';
import { API_BASE_URL } from 'consts/endpoints';
import { User } from 'types/auth';
import { CommentModel, PostModel } from 'types/post';
import { RelationModel } from 'types/user';

import { storageGet } from './localStorage';

export const getAccessToken = () => {
  return getBearerToken(STORAGE_KEYS.TOKEN);
};

export const getBearerToken = (key: string): string => {
  const token = storageGet(key);
  if (token === null) {
    return '';
  }

  return `Bearer ${token}`;
};

export const prepareUrl = (urlPart: string | undefined): string | undefined => {
  if (urlPart === null || urlPart === undefined) {
    return undefined;
  }

  return `${API_BASE_URL}${urlPart}`;
};

export const prepareUser = (user: User): User => {
  user.avatar_url = prepareUrl(user.avatar_url) ?? '';

  return user;
};

export const prepareComment = (comment: CommentModel): CommentModel => {
  comment.user = prepareUser(comment.user);

  return comment;
};

export const preparePost = (post: PostModel): PostModel => {
  post.user = prepareUser(post.user);
  post.content = prepareUrl(post.content) ?? '';
  post.comments = post.comments.map(prepareComment);

  return post;
};

export const prepareRelation = (relation: RelationModel): RelationModel => {
  relation.relation_user.avatar_url = prepareUrl(
    relation.relation_user.avatar_url,
  );

  return relation;
};
