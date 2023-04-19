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

export interface GetPostValues {
  params?: GetPostParams;
}
