import {
  postsAdapter,
  postsSelector,
  useLazyGetPostsCountQuery,
  useLazyGetPostsQuery,
} from 'ducks/post/api';
import { GetPostParams } from 'ducks/post/types';
import { RefObject, useCallback, useEffect } from 'react';

export const useInfinityPostFeed = (
  ref: RefObject<HTMLElement>,
  { type, count, user_id }: Pick<GetPostParams, 'type' | 'count' | 'user_id'>,
) => {
  const [getPostsCount, { data: postsCount }] = useLazyGetPostsCountQuery();

  const [getPosts, response] = useLazyGetPostsQuery({
    selectFromResult: ({ data, ...otherParams }) => ({
      dataID: postsSelector.selectIds(data ?? postsAdapter.getInitialState()),
      data: postsSelector.selectAll(data ?? postsAdapter.getInitialState()),
      ...otherParams,
    }),
  });

  const handleScrollBottom = useCallback(async () => {
    if (!response.isFetching && response.data) {
      const data = response.data;

      if (
        data.length > 0 &&
        data.length < (postsCount?.count ?? data.length + 1)
      ) {
        await getPosts({
          params: {
            last_seen_post_id: data[0].id,
            last_seen_post_created_at: data[0].created_at,
            type,
            user_id,
            count,
          },
        });
      }
    }
  }, [
    count,
    getPosts,
    postsCount?.count,
    response.data,
    response.isFetching,
    type,
    user_id,
  ]);

  useEffect(() => {
    const getCountAndNewPosts = () => {
      getPostsCount({
        params: {
          type,
          user_id,
          count,
        },
      });

      getPosts({
        params: {
          type,
          user_id,
          count,
        },
      });
    };

    getCountAndNewPosts();

    const timerID = setInterval(getCountAndNewPosts, 2000);
    return () => clearInterval(timerID);
  }, [count, ref, getPosts, type, user_id, getPostsCount]);

  useEffect(() => {
    if (ref.current) {
      const element = ref.current;

      const onScroll = () => {
        const scrolledToBottom =
          element.scrollHeight - element.scrollTop - element.clientHeight < 1;

        if (scrolledToBottom) {
          handleScrollBottom();
        }
      };

      element.addEventListener('scroll', onScroll);

      return () => element.removeEventListener('scroll', onScroll);
    }
  }, [handleScrollBottom, ref]);

  return response;
};
