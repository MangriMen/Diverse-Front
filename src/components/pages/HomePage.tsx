import { Post } from 'components/post/Post';
import { HomePageLayout } from 'components/post/styles';
import { ReactElement, useEffect, useState } from 'react';

import { StyledContainer } from './styles';
import { useInfinityPostFeed } from 'hooks/useInfinityPostFeed';

export const HomePage = () => {
  const [posts, setPosts] = useState<ReactElement[]>();

  const { data } = useInfinityPostFeed({ type: 'all', count: 5 });

  useEffect(() => {
    if (data?.data !== undefined) {
      setPosts(data?.data.map(post => <Post key={post.id} post={post} />));
    }
  }, [data?.data]);

  return (
    <StyledContainer>
      <HomePageLayout>{posts}</HomePageLayout>
    </StyledContainer>
  );
};
