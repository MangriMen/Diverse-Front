import { prepareRelation } from 'helpers/api';
import { ServerGetRelationsResponse } from 'types/user';

export const transformRelations = (
  response: ServerGetRelationsResponse,
): ServerGetRelationsResponse => {
  return {
    ...response,
    relations: response.relations.map(prepareRelation),
  };
};
