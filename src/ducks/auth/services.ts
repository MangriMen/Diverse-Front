import { prepareUser } from 'helpers/api';
import { ServerAuthResponse } from 'types/auth';

export const transformUser = (
  response: ServerAuthResponse,
): ServerAuthResponse => {
  return {
    ...response,
    user: prepareUser(response.user),
  };
};
