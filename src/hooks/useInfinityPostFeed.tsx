import { useGetPostsQuery } from 'ducks/post/api';
import { GetPostParams } from 'ducks/post/types';
import { useEffect, useState } from 'react';

const lastSeenPostDefaultValues: Pick<
  GetPostParams,
  'last_seen_post_created_at' | 'last_seen_post_id'
> = {};

const onScrollHandle = (onScroll: () => void) => {
  const scrolledToButtom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight;
  if (scrolledToButtom) {
    onScroll();
  }
};

export const useInfinityPostFeed = ({
  type,
  count,
  user_id,
}: Pick<GetPostParams, 'type' | 'count' | 'user_id'>) => {
  const [lastSeenPost, setLastSeenPost] = useState(lastSeenPostDefaultValues);
  const response = useGetPostsQuery({
    params: {
      ...lastSeenPost,
      type,
      user_id,
      count,
    },
  });

  useEffect(() => {
    const onScroll = () => {
      onScrollHandle(() => {
        if (response.data !== undefined && !response.isFetching) {
          setLastSeenPost({
            last_seen_post_id:
              response.data.data[response.data.data.length - 1].id,
            last_seen_post_created_at:
              response.data.data[response.data.data.length - 1].created_at,
          });
        }
      });
    };

    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [response.data, response.isFetching]);

  return response;
};
