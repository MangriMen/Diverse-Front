import { Loader } from 'components/common/LoaderPage';
import { Post } from 'components/post/Post';
import { POSTS_FETCH_COUNT } from 'consts';
import { useInfinityPostFeed } from 'hooks/useInfinityPostFeed';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { PostModel } from 'types/post';

import { HomePageLayout, StyledContainer } from './styles';

export const HomePage = () => {
  const ref = useRef<HTMLUListElement>(null);

  const { data, dataID, isFetching } = useInfinityPostFeed(ref, {
    type: 'all',
    count: POSTS_FETCH_COUNT.FEED,
  });

  const [posts, setPosts] = useState<ReactElement[]>([]);
  useEffect(
    () =>
      setPosts(
        data.map((post: PostModel) => <Post key={post.id} post={post} />),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(dataID)],
  );

  return (
    <StyledContainer>
      <HomePageLayout ref={ref}>
        {posts}
        {isFetching && <Loader />}
      </HomePageLayout>
    </StyledContainer>
  );
};
