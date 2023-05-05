import { useLikePostMutation, useUnlikePostMutation } from 'ducks/post/api';
import React, { useCallback, useState } from 'react';
import { PostModel } from 'types/post';

import { Like } from './Like';

export const PostLike = ({ post }: { post: PostModel }) => {
  const [getPostValues] = useState({ path: { post: post.id } });

  const [isLikeDisabled, setIsLikeDisabled] = useState(false);

  const [likeData, setLikeData] = useState({
    likes: post.likes,
    likedByMe: post.liked_by_me,
  });

  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();

  const handleLike = useCallback(async () => {
    setIsLikeDisabled(true);

    const response = await (likeData.likedByMe ? unlikePost : likePost)(
      getPostValues,
    ).unwrap();

    setLikeData(prevState => ({
      ...prevState,
      likes: response.data.likes,
      likedByMe: response.data.liked_by_me,
    }));

    setIsLikeDisabled(false);
  }, [getPostValues, likeData.likedByMe, likePost, unlikePost]);

  return (
    <Like
      count={likeData.likes}
      liked={likeData.likedByMe}
      onClick={handleLike}
      disabled={isLikeDisabled}
    />
  );
};
