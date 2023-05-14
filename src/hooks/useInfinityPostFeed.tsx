import {
  COMMENT_REFETCH_TIMEOUT,
  POSTS_LOADING_OFFSET_HEIGHT,
  POST_WITHOUT_SCROLL_FETCH_DELAY,
} from 'consts';
import {
  postsAdapter,
  postsSelector,
  useLazyGetPostsCountQuery,
  useLazyGetPostsQuery,
} from 'ducks/post/api';
import { GetPostParams } from 'ducks/post/types';
import { RefObject, useCallback, useEffect } from 'react';

export const useInfinityPostFeed = (
  { type, count, user_id }: Pick<GetPostParams, 'type' | 'count' | 'user_id'>,
  ref?: RefObject<HTMLElement>,
) => {
  const [getPostsCount, { data: postsCount }] = useLazyGetPostsCountQuery();

  const [getPosts, response] = useLazyGetPostsQuery({
    selectFromResult: ({ data, isFetching, ...otherParams }) => ({
      dataID: postsSelector.selectIds(data ?? postsAdapter.getInitialState()),
      data: postsSelector.selectAll(data ?? postsAdapter.getInitialState()),
      isFetching: otherParams.originalArgs?.params?.last_seen_post_created_at
        ? isFetching
        : false,
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
            last_seen_post_id: data[data.length - 1].id,
            last_seen_post_created_at: data[data.length - 1].created_at,
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
        },
      });

      if (!response.isFetching) {
        getPosts({
          params: {
            type,
            user_id,
            count,
          },
        });
      }
    };

    const timerID = setInterval(getCountAndNewPosts, COMMENT_REFETCH_TIMEOUT);
    return () => clearInterval(timerID);
  }, [count, ref, getPosts, type, user_id, getPostsCount, response.isFetching]);

  useEffect(() => {
    const getBottomPosts = async () => {
      if (!ref && window.innerHeight === document.body.offsetHeight) {
        handleScrollBottom();

        setTimeout(getBottomPosts, POST_WITHOUT_SCROLL_FETCH_DELAY);
      }
    };

    getBottomPosts();
  }, [handleScrollBottom, ref]);

  useEffect(() => {
    if (!ref) {
      const onScroll = () => {
        const scrolledToBottom =
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - POSTS_LOADING_OFFSET_HEIGHT;

        if (scrolledToBottom) {
          handleScrollBottom();
        }
      };

      document.addEventListener('scroll', onScroll);

      return () => document.removeEventListener('scroll', onScroll);
    } else {
      if (ref?.current) {
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
    }
  }, [handleScrollBottom, ref]);

  return response;
};
