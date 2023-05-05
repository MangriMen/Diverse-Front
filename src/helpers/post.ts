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
