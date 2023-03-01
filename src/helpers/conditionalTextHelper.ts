import { TFunction } from 'i18next';

export function conditionalTextHelper(
  t: TFunction,
  errors: string | undefined,
) {
  return errors == undefined ? ' ' : t(errors);
}
