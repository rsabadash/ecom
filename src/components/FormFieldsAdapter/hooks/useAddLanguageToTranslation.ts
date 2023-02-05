import { useCallback } from 'react';
import {
  AddLanguageToTranslationArgs,
  AddLanguageToTranslationReturn,
} from '../types';
import { useTranslation } from '../../IntlProvider';

export const useAddLanguageToTranslation = () => {
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
