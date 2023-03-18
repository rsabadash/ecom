import { useCallback } from 'react';
import { Language, useTranslation } from '../../IntlProvider';

type AddLanguageToTranslationArgs = {
  translation: undefined | string;
  language: Language;
};

type AddLanguageToTranslationReturn = undefined | string;

type UseAddLanguageToTranslationReturn = {
  addLanguageToTranslation: (
    args: AddLanguageToTranslationArgs,
  ) => AddLanguageToTranslationReturn;
};

export const useAddLanguageToTranslation =
  (): UseAddLanguageToTranslationReturn => {
    const { translate } = useTranslation();

    const addLanguageToTranslation = useCallback(
      ({
        translation,
        language,
      }: AddLanguageToTranslationArgs): AddLanguageToTranslationReturn => {
        if (translation) {
          return translate(translation, {
            language: translate(`${language}.adjective`),
          });
        }
      },
      [translate],
    );

    return { addLanguageToTranslation };
  };
