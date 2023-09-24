import { useCallback } from 'react';

import { routes } from '../../../../../common/constants/routes';
import {
  useCustomNavigate,
  useNotification,
} from '../../../../../common/hooks';
import { useTranslation } from '../../../../../components/IntlProvider';
import { deleteAttributeApi } from '../../common/api';
import { Attribute } from '../../common/types';

type UseDeleteAttributeProps = Attribute | undefined;

type UseDeleteAttributeReturn = {
  deleteAttribute: () => Promise<void>;
};

export const useDeleteAttribute = (
  props: UseDeleteAttributeProps,
): UseDeleteAttributeReturn => {
  const { translate, getTranslationByLanguage } = useTranslation();
  const navigate = useCustomNavigate();
  const { promiseNotification } = useNotification();

  const { _id, name } = props || {};

  const deleteAttribute = useCallback(async () => {
    if (_id) {
      const translatedAttributeName = getTranslationByLanguage(name);

      try {
        await promiseNotification({
          fetch: () => deleteAttributeApi(_id),
          pendingContent: translate('attribute.deleting', {
            attributeName: translatedAttributeName,
          }),
          successContent: translate('attribute.deleted', {
            attributeName: translatedAttributeName,
          }),
          errorContent: translate('attribute.deleting.error', {
            attributeName: translatedAttributeName,
          }),
        });

        await navigate(routes.attributes.root, { replace: true });
      } catch (e) {
        // TODO common error logic
        console.log(e);
      }
    }
  }, [
    _id,
    getTranslationByLanguage,
    name,
    navigate,
    promiseNotification,
    translate,
  ]);

  return { deleteAttribute };
};
