import { PostProps } from 'components/post';
import { Comment } from 'components/post/Comment';
import { ReactElement, useEffect, useRef, useState } from 'react';

import { PostCardCommentsList } from './styles';

export const PostCardComments = ({ post }: PostProps) => {
  const ref = useRef<HTMLUListElement>(null);

  const [comments, setComments] = useState<ReactElement[]>();

  useEffect(() => {
    setComments(
      post.comments
        .slice()
        .reverse()
        .map(comment => (
          <Comment key={comment.id} post={post} comment={comment} />
        )),
    );
  }, [post, post.comments]);

  useEffect(() => {
    if (ref !== null && ref.current !== null) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [comments]);

  return <PostCardCommentsList ref={ref}>{comments}</PostCardCommentsList>;
};
