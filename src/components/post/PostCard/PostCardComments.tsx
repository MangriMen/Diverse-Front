import { PostProps } from 'components/post';
import { Comment } from 'components/post/Comment';
import {
  COMMENTS_FETCH_COUNT,
  COMMENT_INFINITE_FEED_LOADER_SIZE_REM,
} from 'consts';
import { convertRemToPixels } from 'helpers/html';
import { useInfinityCommentFeed } from 'hooks/useInfinityCommentFeed';
import { useLayoutEffect, useRef } from 'react';
import useStayScrolled from 'react-stay-scrolled';
import { CommentModel } from 'types/post';

import { CommentsListLoader } from './CommentsListLoader';
import { PostCardCommentsList } from './styles';

export const PostCardComments = ({ post }: PostProps) => {
  const ref = useRef<HTMLUListElement>(null);

  const { data, isFetching } = useInfinityCommentFeed({
    ref,
    oldFetchBorderLoaderOffset: convertRemToPixels(
      COMMENT_INFINITE_FEED_LOADER_SIZE_REM,
    ),
    post: post.id,
    count: COMMENTS_FETCH_COUNT.FEED,
  });

  const { stayScrolled } = useStayScrolled(ref);

  useLayoutEffect(() => {
    stayScrolled();
  }, [data?.data, stayScrolled]);

  return (
    <PostCardCommentsList ref={ref}>
      <CommentsListLoader
        size={`${COMMENT_INFINITE_FEED_LOADER_SIZE_REM}rem`}
        visible={isFetching}
      />
      {data?.data
        .slice()
        .reverse()
        .map((comment: CommentModel) => (
          <Comment key={comment.id} post={post} comment={comment} />
        ))}
    </PostCardCommentsList>
  );
};
