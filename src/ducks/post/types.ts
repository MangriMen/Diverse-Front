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
