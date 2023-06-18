import { Loader } from 'components/common/LoaderPage';
import { Post } from 'components/post/Post';
import { POSTS_FETCH_COUNT } from 'consts';
import { useInfinityPostFeed } from 'hooks/useInfinityPostFeed';
import { ReactElement, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { HomePageLayout, StyledContainer } from './styles';

export const HomePage = () => {
  const { data, dataID, isFetching } = useInfinityPostFeed({
    type: 'all',
    count: POSTS_FETCH_COUNT.FEED,
  });

  const [posts, setPosts] = useState<ReactElement[]>([]);
  useEffect(
    () => setPosts(data.map(post => <Post key={post.id} post={post} />)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(dataID)],
  );

  return (
    <StyledContainer>
      <HomePageLayout>
        <Outlet />
        {posts}
        {isFetching && <Loader />}
      </HomePageLayout>
    </StyledContainer>
  );
};
