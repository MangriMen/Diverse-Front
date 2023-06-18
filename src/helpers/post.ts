import { PostSize } from 'components/post';
import { PostModel } from 'types/post';

export const getLocale = (): string => {
  return navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language;
};

const dateToUTC = (date: Date) => {
  return Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  );
};

export type dateDiffUnits = 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks';

export interface DateDiff {
  diff: number;
  units: dateDiffUnits;
}

export const dateDiff = (a: Date, b: Date): DateDiff => {
  const _MS_PER_SECOND = 1000;
  const _MS_PER_MINUTE = _MS_PER_SECOND * 60;
  const _MS_PER_HOUR = _MS_PER_MINUTE * 60;
  const _MS_PER_DAY = _MS_PER_HOUR * 24;
  const _MS_PER_WEEK = _MS_PER_DAY * 7;

  const diff = dateToUTC(b) - dateToUTC(a);

  if (diff < _MS_PER_MINUTE) {
    return { diff: Math.floor(diff / _MS_PER_SECOND), units: 'seconds' };
  } else if (diff < _MS_PER_HOUR) {
    return { diff: Math.floor(diff / _MS_PER_MINUTE), units: 'minutes' };
  } else if (diff < _MS_PER_DAY) {
    return { diff: Math.floor(diff / _MS_PER_HOUR), units: 'hours' };
  } else if (diff < _MS_PER_WEEK) {
    return { diff: Math.floor(diff / _MS_PER_DAY), units: 'days' };
  } else {
    return { diff: Math.floor(diff / _MS_PER_WEEK), units: 'weeks' };
  }
};

export const getShareUrl = (post: PostModel) => {
  return `${window.location.origin}/post/${post.id}`;
};

export const getHeight = (size?: PostSize) => {
  switch (size) {
    case 'fullscreen':
      return '100%';
    case 'default':
      return '546px';
    default:
      return '';
  }
};

export const getMaxHeight = (size?: PostSize) => {
  switch (size) {
    case 'fullscreen':
      return '';
    case 'default':
      return '544px';
    default:
      return '756px';
  }
};

export const getMaxWidth = (size?: PostSize) => {
  switch (size) {
    case 'fullscreen':
      return '';
    case 'default':
      return '904px';
    default:
      return '';
  }
};

export const getFlexDirection = (size?: PostSize) => {
  switch (size) {
    case 'fullscreen':
    case 'default':
      return 'row';
    default:
      return 'column';
  }
};

export const getFlexGrow = (size?: PostSize) => {
  switch (size) {
    case 'fullscreen':
    case 'default':
      return '1';
    default:
      return '';
  }
};
