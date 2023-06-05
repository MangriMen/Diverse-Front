import { PostProps } from 'components/post';
import { Comment } from 'components/post/Comment';
import {
  COMMENTS_FETCH_COUNT,
  COMMENT_INFINITE_FEED_LOADER_SIZE_REM,
} from 'consts';
import { convertRemToPixels } from 'helpers/html';
import { useInfinityCommentFeed } from 'hooks/useInfinityCommentFeed';
import {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import useStayScrolled from 'react-stay-scrolled';

import { CommentsListLoader } from './CommentsListLoader';
import { PostCardCommentsList } from './styles';

const infiniteLoaderSizePx = convertRemToPixels(
  COMMENT_INFINITE_FEED_LOADER_SIZE_REM,
);

export const PostCardComments = ({ post }: PostProps) => {
  const ref = useRef<HTMLUListElement>(null);

  const { data, dataID, isFetching } = useInfinityCommentFeed(
    ref,
    infiniteLoaderSizePx,
    {
      post: post.id,
      count: COMMENTS_FETCH_COUNT.FEED,
    },
  );

  const [comments, setComments] = useState<ReactElement[]>([]);
  useEffect(
    () =>
      setComments(
        data.map(comment => (
          <Comment key={comment.id} post={post} comment={comment} />
        )),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(dataID), post],
  );

  const { stayScrolled } = useStayScrolled(ref);

  useLayoutEffect(() => {
    stayScrolled();
  }, [data, stayScrolled]);

  return (
    <PostCardCommentsList ref={ref}>
      <CommentsListLoader
        visible={isFetching}
        size={`${COMMENT_INFINITE_FEED_LOADER_SIZE_REM}rem`}
      />
      {comments}
    </PostCardCommentsList>
  );
};
