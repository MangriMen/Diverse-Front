import { ChangeEvent } from 'react';

export const replaceWhitespaces = (value: string) =>
  value.replace(/^ +/g, '').replace(/( |_)+/g, '_');

export const removeWhitespace = (value: string) => value.replace(/ +/g, '');

export const handleOnChangeNickname = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => replaceWhitespaces(event.target.value);

export const handleOnChangeNoSpace = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => removeWhitespace(event.target.value);
