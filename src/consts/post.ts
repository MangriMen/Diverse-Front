export const commentDateFormat: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
};

export const POSTS_FETCH_COUNT = {
  FEED: 5,
  USER: 9,
};

export const SUBMIT_TIMEOUT = {
  CREATE_POST: 5000,
};

export const SHAPE_CONSTRAINTS = {
  DESCRIPTION_MAX: 2048,
};

export const POST_DESCRIPTION_MAX_ROWS = 18;

export const POSTS_LOADING_OFFSET_HEIGHT = 1000;

export const COMMENT_DATE_TOOLTIP_TIMEOUT = 800;
