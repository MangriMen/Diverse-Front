import { COMMENT_WITHOUT_SCROLL_FETCH_DELAY } from 'consts';
import {
  commentsAdapter,
  commentsSelector,
  useLazyGetCommentsCountQuery,
  useLazyGetCommentsQuery,
} from 'ducks/comment/api';
import { GetCommentsRequest } from 'ducks/comment/types';
import { RefObject, useCallback, useEffect } from 'react';

export const useInfinityCommentFeed = (
  ref: RefObject<HTMLElement>,
  topLoaderOffset: number,
  {
    post,
    count,
  }: Pick<GetCommentsRequest['path'], 'post'> &
    Pick<GetCommentsRequest['params'], 'count'>,
) => {
  const [getCommentsCount, { data: commentsCount }] =
    useLazyGetCommentsCountQuery();

  const [getComments, response] = useLazyGetCommentsQuery({
    selectFromResult: ({ data, isFetching, ...otherParams }) => ({
      dataID: commentsSelector.selectIds(
        data ?? commentsAdapter.getInitialState(),
      ),
      data: commentsSelector.selectAll(
        data ?? commentsAdapter.getInitialState(),
      ),
      isFetching: otherParams.originalArgs?.params.last_seen_comment_created_at
        ? isFetching
        : false,
      ...otherParams,
    }),
  });

  const handleScrollTop = useCallback(
    async (element?: HTMLElement) => {
      if (!response.isFetching && response.data) {
        const data = response.data;

        if (
          data.length > 0 &&
          data.length < (commentsCount?.count ?? data.length + 1)
        ) {
          let prevScrollHeight = 0;
          if (element) {
            prevScrollHeight = element.scrollHeight;
          }

          await getComments({
            path: {
              post,
            },
            params: {
              last_seen_comment_id: data[0].id,
              last_seen_comment_created_at: data[0].created_at,
              count,
            },
          });

          if (element) {
            element.addEventListener(
              'DOMNodeInserted',
              function handleInsert() {
                const heightDiff = element.scrollHeight - prevScrollHeight;
                element.scrollTop = heightDiff - topLoaderOffset;

                setTimeout(() => {
                  element.removeEventListener('DOMNodeInserted', handleInsert);
                }, 0);
              },
            );
          }
        }
      }
    },
    [
      commentsCount?.count,
      count,
      getComments,
      post,
      response.data,
      response.isFetching,
      topLoaderOffset,
    ],
  );

  useEffect(() => {
    const getCountAndNewComments = () => {
      getCommentsCount({
        path: { post },
      });

      getComments({
        path: {
          post,
        },
        params: {
          count,
        },
      });
    };

    getCountAndNewComments();

    const timerID = setInterval(getCountAndNewComments, 2000);
    return () => clearInterval(timerID);
  }, [count, post, getComments, getCommentsCount, ref]);

  useEffect(() => {
    let timerID: NodeJS.Timeout;

    const getTopComments = async () => {
      if (
        ref &&
        ref.current &&
        ref.current.scrollHeight === ref.current.clientHeight
      ) {
        await handleScrollTop();

        if (!commentsCount) {
          timerID = setTimeout(
            getTopComments,
            COMMENT_WITHOUT_SCROLL_FETCH_DELAY,
          );
        } else if (
          commentsCount &&
          commentsCount.count > response.data.length
        ) {
          timerID = setTimeout(
            getTopComments,
            COMMENT_WITHOUT_SCROLL_FETCH_DELAY,
          );
        }
      }
    };

    timerID = setTimeout(getTopComments, 0);
    return () => clearTimeout(timerID);
  }, [commentsCount, handleScrollTop, ref, response.data.length]);

  useEffect(() => {
    if (ref.current) {
      const element = ref.current;

      const onScroll = () => {
        if (element.scrollTop <= 1) {
          handleScrollTop(element);
        }
      };

      element.addEventListener('scroll', onScroll);

      return () => element.removeEventListener('scroll', onScroll);
    }
  }, [handleScrollTop, ref]);

  return response;
};
