import { useState } from 'react';

import { PostCard } from './PostCard/PostCard';
import { PostProps } from './interfaces';

export const Post = ({
  post,
  size = 'default',
}: Omit<PostProps, 'setPost'>) => {
  const [postData, setPostData] = useState(post);

  return <PostCard post={postData} setPost={setPostData} size={size} />;
};
