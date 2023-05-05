import { useCallback, useState } from 'react';
import { PostCardMediaProps } from './interfaces';
import {
  CardMediaBox,
  CardMediaSkeleton,
  CardMediaSkeletonLoaderBox,
  CardMediaStyled,
} from './styles';

export const PostCardMeida = ({ size, image }: PostCardMediaProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoaded = useCallback(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  return (
    <CardMediaBox size={size}>
      <CardMediaSkeleton
        size={size}
        variant="rectangular"
        isLoading={isLoading}
      />
      <CardMediaSkeletonLoaderBox display={isLoading ? 'none' : 'flex'}>
        <CardMediaStyled
          component="img"
          onLoad={handleImageLoaded}
          image={image}
        />
      </CardMediaSkeletonLoaderBox>
    </CardMediaBox>
  );
};
