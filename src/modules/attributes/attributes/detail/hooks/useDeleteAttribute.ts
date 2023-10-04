import { useCallback } from 'react';

import { routes } from '../../../../../common/constants/routes';
import {
  useCustomNavigate,
  useNotification,
} from '../../../../../common/hooks';
import { useTranslation } from '../../../../../components/IntlProvider';
import { deleteAttributeApi } from '../../common/api';

type UseDeleteAttributeProps = {
  id: string | undefined;
  name: string | undefined;
};

type UseDeleteAttributeReturn = {
  deleteAttribute: () => Promise<void>;
};

export const useDeleteAttribute = ({
  id,
  name,
}: UseDeleteAttributeProps): UseDeleteAttributeReturn => {
  const { translate } = useTranslation();
  const navigate = useCustomNavigate();
  const { promiseNotification } = useNotification();

  const deleteAttribute = useCallback(async () => {
    if (id) {
      const attributeName = name || '';

      try {
        await promiseNotification({
          fetch: () => deleteAttributeApi(id),
          pendingContent: translate('attribute.deleting', {
            attributeName,
          }),
          successContent: translate('attribute.deleted', {
            attributeName,
          }),
          errorContent: translate('attribute.deleting.error', {
            attributeName,
          }),
        });

        await navigate(routes.attributes.root, { replace: true });
      } catch (e) {
        // TODO common error logic
        console.log(e);
      }
    }
  }, [id, name, navigate, promiseNotification, translate]);

  return { deleteAttribute };
};
