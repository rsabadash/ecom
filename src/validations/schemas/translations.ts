import { string } from 'yup';

import { Translations } from '../../components/IntlProvider';

export const mainTranslationRequired = (translation?: Translations) => ({
  uk: string().required(translation?.uk),
  en: string().notRequired(),
});
