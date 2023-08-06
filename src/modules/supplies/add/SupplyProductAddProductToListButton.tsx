import { FC } from 'react';

import { Button } from '../../../components/Button';
import { useTranslation } from '../../../components/IntlProvider';
import { Tooltip } from '../../../components/Tooltip';
import { MAX_PRODUCTS_IN_SUPPLY } from './constants';
import { SupplyProductAddProductToListButtonProps } from './types';

import classes from './styles/index.module.css';

export const SupplyProductAddProductToListButton: FC<
  SupplyProductAddProductToListButtonProps
> = ({ handleAddProduct, isMaxProductsNumberReached }) => {
  const { translate } = useTranslation();

  return (
    <Tooltip
      isDisabled={!isMaxProductsNumberReached}
      isChildrenFocusable
      content={translate('supply.products.maxNumber', {
        value: MAX_PRODUCTS_IN_SUPPLY,
      })}
      position="bottom"
      tooltipClassName={classes.supplyProducts__list_buttonAddWrapper}
    >
      <Button
        isDisabled={isMaxProductsNumberReached}
        variant="theme"
        onClick={handleAddProduct}
      >
        {translate('supply.addProduct')}
      </Button>
    </Tooltip>
  );
};
