import { FC } from 'react';
import { SupplyProductSummaryProps } from './types';
import { InputWithTooltipAdapter } from '../../../components/FormFieldsAdapter';
import { supplyFormFields, supplyFormProductsSubfields } from './constants';
import classes from './styles/index.module.css';
import { useTranslation } from '../../../components/IntlProvider';

const columnKeyFieldNameMap = {
  [supplyFormProductsSubfields.quantity]:
    supplyFormFields.productsTotalQuantity,
  [supplyFormProductsSubfields.totalCost]: supplyFormFields.productsTotalCost,
};

export const SupplyProductSummary: FC<SupplyProductSummaryProps> = ({
  columns,
  control,
}) => {
  const { translate } = useTranslation();

  const translations = {
    [supplyFormFields.productsTotalQuantity]: translate(
      'supply.product.totalQuantityProducts',
    ),
    [supplyFormFields.productsTotalCost]: translate(
      'supply.product.totalCostProducts',
    ),
  };

  return (
    <div className={classes.supplyProducts__summary}>
      {columns.map(({ key, width }) => {
        const fieldName = columnKeyFieldNameMap[key];

        return (
          <div
            key={key}
            style={{ width }}
            className={classes.supplyProducts__summaryItem}
          >
            {fieldName && (
              <InputWithTooltipAdapter
                isReadOnly
                isRequired
                size="xs"
                name={fieldName}
                ariaLabel={translations[fieldName]}
                placeholder={translations[fieldName]}
                position="bottom"
                control={control}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
