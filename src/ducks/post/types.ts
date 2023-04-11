export interface PostValues {
  content: string;
  description: string;
}

export interface GetPostsParams {
  type: string;
  user_id: string;
  count?: number;
}

export interface GetPostsValues {
  params?: GetPostsParams;
}
