import { API_BASE_URL } from 'consts/endpoints';
import { Relation } from 'types/user';

export const prepareUrl = (urlPart: string | null): string | null => {
  if (urlPart === null) {
    return null;
  }

  return `${API_BASE_URL}${urlPart}`;
};

export const prepareRelation = (relation: Relation): Relation => {
  relation.relation_user.avatar_url = prepareUrl(
    relation.relation_user.avatar_url,
  );

  return relation;
};
