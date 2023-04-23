import {
  useLikeCommentMutation,
  useUnlikeCommentMutation,
} from 'ducks/comment/api';
import React, { useCallback, useState } from 'react';
import { CommentModel, PostModel } from 'types/post';

import { PostCommentLike } from './PostCommentLike';

export const CommentLike = ({
  post,
  comment,
}: {
  post: PostModel;
  comment: CommentModel;
}) => {
  const [getCommentValues] = useState({
    path: { post: post.id, comment: comment.id },
  });

  const [isLikeDisabled, setIsLikeDisabled] = useState(false);

  const [likeData, setLikeData] = useState({
    likes: comment.likes,
    likedByMe: comment.liked_by_me,
  });

  const [likeComment] = useLikeCommentMutation();
  const [unlikeComment] = useUnlikeCommentMutation();

  const handleLike = useCallback(async () => {
    setIsLikeDisabled(true);

    const response = await (likeData.likedByMe ? unlikeComment : likeComment)(
      getCommentValues,
    ).unwrap();

    setLikeData(prevState => ({
      ...prevState,
      likes: response.data.likes,
      likedByMe: response.data.liked_by_me,
    }));

    setIsLikeDisabled(false);
  }, [getCommentValues, likeData.likedByMe, likeComment, unlikeComment]);

  return (
    <PostCommentLike
      variant="comment"
      count={likeData.likes}
      liked={likeData.likedByMe}
      onClick={handleLike}
      disabled={isLikeDisabled}
    />
  );
};
