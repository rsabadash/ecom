import { useCallback } from 'react';

import { routes } from '../../../../common/constants/routes';
import {
  useKeepDataBetweenNavigation,
  useNotification,
} from '../../../../common/hooks';
import { useTranslation } from '../../../../components/IntlProvider';
import { createSupplyApi } from '../../common/api';
import { SupplyPostData, SupplyStateFromRouter } from '../../common/types';

type UseCreateSupplyReturn = {
  createSupply: (data: SupplyPostData) => Promise<void>;
};

export const useCreateSupply = (): UseCreateSupplyReturn => {
  const { translate } = useTranslation();
  const { promiseNotification } = useNotification();
  const { navigateWithData } = useKeepDataBetweenNavigation();

  const createSupply = useCallback(
    async (data: SupplyPostData) => {
      // TODO When createAt will be managed on FE add additional checking
      // (createdAt && `${translate('supply.from')} ${formatDate(createdAt)}`);
      const supplyName = data.name || '';

      try {
        const createdSupply = await promiseNotification({
          fetch: () => createSupplyApi(data),
          pendingContent: translate('supply.creating', {
            supplyName,
          }),
          successContent: translate('supply.created', {
            supplyName,
          }),
          errorContent: translate('supply.creating.error', {
            supplyName,
          }),
        });

        if (createdSupply) {
          await navigateWithData<SupplyStateFromRouter>({
            to: `${routes.supplies.root}/${createdSupply._id}`,
            data: createdSupply,
          });
        }
      } catch (e) {
        // TODO common error logic
        console.log(e);
      }
    },
    [navigateWithData, promiseNotification, translate],
  );

  return { createSupply };
};
