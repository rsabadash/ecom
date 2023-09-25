import { useCallback } from 'react';

import { routes } from '../../../../../common/constants/routes';
import {
  useCustomNavigate,
  useNotification,
} from '../../../../../common/hooks';
import { useTranslation } from '../../../../../components/IntlProvider';
import { deleteVariantApi } from '../../common/api';

type UseDeleteVariantProps = {
  name: string | undefined;
  variantId: string | undefined;
  attributeId: string | undefined;
};

type UseDeleteVariantReturn = {
  deleteVariant: () => Promise<void>;
};

export const useDeleteVariant = ({
  name,
  variantId,
  attributeId,
}: UseDeleteVariantProps): UseDeleteVariantReturn => {
  const { translate } = useTranslation();
  const navigate = useCustomNavigate();
  const { promiseNotification } = useNotification();

  const deleteVariant = useCallback(async () => {
    if (attributeId && variantId) {
      const variantName = name || '';

      try {
        await promiseNotification({
          fetch: () => deleteVariantApi({ attributeId, variantId }),
          pendingContent: translate('variant.deleting', {
            variantName,
          }),
          successContent: translate('variant.deleted', {
            variantName,
          }),
          errorContent: translate('variant.deleting.error', {
            variantName,
          }),
        });

        await navigate(`${routes.attributes.root}/${attributeId}`, {
          replace: true,
        });
      } catch (e) {
        // TODO common error logic
        console.log(e);
      }
    }
  }, [attributeId, name, navigate, promiseNotification, translate, variantId]);

  return { deleteVariant };
};
