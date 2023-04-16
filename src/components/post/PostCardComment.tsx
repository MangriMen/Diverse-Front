import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { StyledTextButton } from 'components/common/styles';
import { useDeleteCommentMutation } from 'ducks/comment/api';
import { dateDiff } from 'helpers/post';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CommentModel, PostModel } from 'types/post';

import {
  ListItemAvatarStyled,
  StyledActionBox,
  StyledComment,
  StyledCommentHeaderBox,
  StyledIconButton,
  StyledLikeBox,
} from './styles';

export const PostCardComment = ({
  post,
  comment,
}: {
  post: PostModel;
  comment: CommentModel;
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'post' });

  const commentDate = new Date(comment.created_at);
  const commentDateString = commentDate.toLocaleString('ru-ru', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  const [commentDateDiff, setCommentDateDiff] = useState(
    dateDiff(commentDate, new Date(Date.now())),
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = useCallback(async () => {
    await deleteComment({
      path: { post: post.id, comment: comment.id },
    });
    handleClose();
  }, [comment.id, deleteComment, post.id]);

  return (
    <ListItem alignItems="flex-start" disablePadding>
      <ListItemAvatarStyled>
        <Avatar src={comment.user.avatar_url} />
      </ListItemAvatarStyled>
      <ListItemText
        primary={
          <StyledCommentHeaderBox>
            <Typography
              component="span"
              fontSize="12px"
              padding="0 4px"
              alignSelf="center"
            >
              {comment.user.username}
            </Typography>
            <Tooltip
              arrow
              placement="top"
              title={
                <Typography fontSize="inherit">{commentDateString}</Typography>
              }
            >
              <Typography
                onMouseOver={() => {
                  setCommentDateDiff(
                    dateDiff(commentDate, new Date(Date.now())),
                  );
                }}
                component="span"
                variant="caption"
                fontSize="11px"
                color="common.dimmed"
                alignSelf="center"
              >
                {`${commentDateDiff.diff} ${commentDateDiff.units} назад`}
              </Typography>
            </Tooltip>
            <IconButton
              disableRipple
              onClick={handleClick}
              sx={{
                marginLeft: 'auto',
                width: '24px',
                height: '24px',
                borderRadius: '4px',
                transition: 'none',
                '&:active': {
                  backgroundColor: 'primary.light',
                },
              }}
            >
              <MoreHorizIcon />
            </IconButton>
            <Menu
              transformOrigin={{ vertical: 'top', horizontal: 5 }}
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
              MenuListProps={{
                sx: {
                  padding: 0,

                  '& .MuiListItemIcon-root': {
                    minWidth: '0px',
                    width: '36px',
                    display: 'flex',
                    justifyContent: 'center',
                  },
                },
              }}
            >
              <MenuItem disableGutters>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
              </MenuItem>
              <MenuItem disableGutters onClick={handleDeleteComment}>
                <ListItemIcon sx={{ minWidth: 0 }}>
                  <DeleteIcon color="error" fontSize="small" />
                </ListItemIcon>
              </MenuItem>
            </Menu>
          </StyledCommentHeaderBox>
        }
        secondary={
          <>
            <StyledComment
              component="span"
              fontSize="12px"
              variant="body2"
              padding="0 4px"
            >
              {comment.content}
            </StyledComment>
            <StyledActionBox component="span">
              <StyledTextButton color="dimmed" fontSize="12px">
                {t('reply')}
              </StyledTextButton>
              <StyledLikeBox component="span">
                <StyledIconButton disableRipple>
                  <FavoriteBorderIcon fontSize="small" />
                </StyledIconButton>
                <Typography component="span" fontSize="12px">
                  {comment.likes}
                </Typography>
              </StyledLikeBox>
            </StyledActionBox>
          </>
        }
      />
    </ListItem>
  );
};
