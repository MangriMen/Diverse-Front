import { Post } from 'components/post/Post';
import { useGetPostsQuery } from 'ducks/post/api';
import { ReactElement, useEffect, useState } from 'react';

import { StyledContainer } from './styles';

interface LastSeenPost {
  id?: string;
  created_at?: string;
}

const lastSeenPostDefaultValues: LastSeenPost = {};

export const HomePage = () => {
  const [lastSeenPost, setLastSeenPost] = useState(lastSeenPostDefaultValues);
  const [posts, setPosts] = useState<ReactElement[]>();
  const { data, isFetching } = useGetPostsQuery({
    params: {
      type: 'user',
      last_seen_post_id: lastSeenPost.id,
      last_seen_post_created_at: lastSeenPost.created_at,
      count: 10,
    },
  });

  useEffect(() => {
    const onScroll = () => {
      const scrolledToButtom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToButtom && !isFetching) {
        if (data !== undefined) {
          setLastSeenPost({
            id: data.data[data.data.length - 1].id,
            created_at: data.data[data.data.length - 1].created_at,
          });
        }
      }
    };

    document.addEventListener('scroll', onScroll);

    return function () {
      document.removeEventListener('scroll', onScroll);
    };
  }, [data, isFetching]);

  useEffect(() => {
    if (data?.data !== undefined) {
      setPosts(data?.data.map(post => <Post key={post.id} post={post} />));
    }
  }, [data?.data]);

  return <StyledContainer>{posts}</StyledContainer>;
};
