import {
  useGetCommentsCountQuery,
  useLazyGetCommentsQuery,
} from 'ducks/comment/api';
import { GetCommentsRequest } from 'ducks/comment/types';
import { RefObject, useCallback, useEffect } from 'react';

export const useInfinityCommentFeed = ({
  ref,
  oldFetchBorderLoaderOffset,
  post,
  count,
}: { ref: RefObject<HTMLElement>; oldFetchBorderLoaderOffset: number } & Pick<
  GetCommentsRequest['path'],
  'post'
> &
  Pick<GetCommentsRequest['params'], 'count'>) => {
  const { data: commentsCount } = useGetCommentsCountQuery(
    {
      path: { post },
    },
    { pollingInterval: 10000 },
  );

  const [getComments, response] = useLazyGetCommentsQuery();

  useEffect(() => {
    getComments({
      path: {
        post,
      },
      params: {
        count,
      },
    });
  }, [count, post, getComments]);

  const handleScrollTop = useCallback(
    async (element: HTMLElement) => {
      if (!response.isFetching && response.data) {
        const data = response.data.data;

        if (
          data.length > 0 &&
          data.length < (commentsCount?.count ?? data.length + 1)
        ) {
          const prevScrollHeight = element.scrollHeight;

          await getComments({
            path: {
              post,
            },
            params: {
              last_seen_comment_id: data[data.length - 1].id,
              last_seen_comment_created_at: data[data.length - 1].created_at,
              count,
            },
          });

          element.scrollTop =
            element.scrollHeight -
            prevScrollHeight -
            oldFetchBorderLoaderOffset;
        }
      }
    },
    [
      commentsCount?.count,
      count,
      getComments,
      oldFetchBorderLoaderOffset,
      post,
      response.data,
      response.isFetching,
    ],
  );

  useEffect(() => {
    if (ref.current) {
      const element = ref.current;

      const onScroll = () => {
        const isScrollAtTop = element.scrollTop === 0;

        if (isScrollAtTop) {
          handleScrollTop(element);
        }
      };

      element.addEventListener('scroll', onScroll);

      return () => element.removeEventListener('scroll', onScroll);
    }
  }, [handleScrollTop, ref]);

  return response;
};
