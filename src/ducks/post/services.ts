import { preparePost } from 'helpers/api';
import { ServerGetPostsResponse } from 'types/post';

export const transformPosts = (
  response: ServerGetPostsResponse,
): ServerGetPostsResponse => {
  return {
    ...response,
    data: response.data.map(preparePost),
  };
};
