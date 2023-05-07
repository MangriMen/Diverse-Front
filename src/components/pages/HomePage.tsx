import { Loader } from 'components/common/LoaderPage';
import { Post } from 'components/post/Post';
import { HomePageLayout } from 'components/post/styles';
import { POSTS_FETCH_COUNT } from 'consts';
import { useInfinityPostFeed } from 'hooks/useInfinityPostFeed';

import { StyledContainer } from './styles';

export const HomePage = () => {
  const { data, isFetching } = useInfinityPostFeed({
    type: 'all',
    count: POSTS_FETCH_COUNT.FEED,
  });

  return (
    <StyledContainer>
      <HomePageLayout>
        {data.reverse().map(post => (
          <Post key={post.id} post={post} />
        ))}
        {isFetching && <Loader />}
      </HomePageLayout>
    </StyledContainer>
  );
};
