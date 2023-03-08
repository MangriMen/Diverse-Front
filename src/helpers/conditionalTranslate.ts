import { TFunction } from 'i18next';

export function conditionalTranslate(t: TFunction, errors: string | undefined) {
  return errors == undefined ? ' ' : t(errors);
}
