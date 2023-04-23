export interface PostValues {
  content: string;
  description: string;
}

export interface GetPostParams {
  type: string;
  user_id?: string;
  count: number;
  last_seen_post_id?: string;
  last_seen_post_created_at?: string;
}

export interface GetPostsValues {
  params?: GetPostParams;
}
export interface CreatePostBody {
  content: string;
  description?: string;
}

export interface CreatePostsRequest {
  body: CreatePostBody;
}

export interface GetPostPath {
  post: string;
}

export interface GetPostRequest {
  path: GetPostPath;
}
