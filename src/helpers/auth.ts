export const replaceWhitespaces = (value: string) =>
  value.replace(/^ +/g, '').replace(/( |_)+/g, '_');

export const removeWhitespace = (value: string) => value.replace(/ +/g, '');
