export interface CreatePostBody {
  content: string;
  description?: string;
}

export interface CreatePostRequest {
  body: CreatePostBody;
}

export interface GetPostsParams {
  type: string;
  user_id: string;
  count?: number;
}

export interface GetPostsRequest {
  params: GetPostsParams;
}

export interface GetPostPath {
  post: string;
}
export interface GetPostRequest {
  path: GetPostPath;
}

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

export interface GetPostCountParams {
  type: string;
  user_id?: string;
}

export interface GetPostsCountRequest {
  params?: GetPostCountParams;
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
