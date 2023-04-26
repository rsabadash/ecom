import { FC, useRef } from 'react';
import { useFormState } from 'react-hook-form';
import { InputWithTooltipAdapter } from '../../components/FormFieldsAdapter';
import { useTranslation } from '../../components/IntlProvider';
import { supplyFormFields, supplyFormProductsSubfields } from './constants';
import { SupplyProductCellProps } from './types';
import { calculateSummary, parseToDecimal } from './utils';
import { InputFormValue } from '../../components/Fields/Input';

import bigDecimal from 'js-big-decimal';

export const SupplyProductQuantityCell: FC<SupplyProductCellProps> = ({
  index,
  control,
  setValue,
  getValues,
  fieldCommonName,
}) => {
  const prevSummaryQuantity = useRef<number | null>(null);

  const { translate } = useTranslation();

  const { errors } = useFormState({ control });

  const priceFieldName =
    `${fieldCommonName}.${index}.${supplyFormProductsSubfields.price}` as const;
  const totalCostFieldName =
    `${fieldCommonName}.${index}.${supplyFormProductsSubfields.totalCost}` as const;

  const initiateSummaryQuantityCalculation = (
    prevValue: number | null,
    currentValue: number,
  ) => {
    const summaryQuantity =
      (getValues(supplyFormFields.productsTotalQuantity) as number) || 0;

    const newSummaryQuantity = calculateSummary<number>(
      prevValue,
      currentValue,
      summaryQuantity,
    );

    setValue(
      supplyFormFields.productsTotalQuantity,
      Number(newSummaryQuantity),
      {
        shouldValidate: false,
      },
    );
  };

  const initiateSummaryTotalCostCalculation = (
    prevValue: string | null,
    currentValue: string,
  ) => {
    const summaryTotalCost =
      (getValues(supplyFormFields.productsTotalCost) as string) ||
      parseToDecimal('0');

    const newSummaryTotalCost = calculateSummary<string>(
      prevValue,
      currentValue,
      summaryTotalCost,
    );

    setValue(supplyFormFields.productsTotalCost, newSummaryTotalCost, {
      shouldValidate: false,
    });
  };

  const handleInputBlur = (value: InputFormValue): void => {
    if (typeof value === 'number') {
      const { price, totalCost } = getValues(`products.${index}`) || {};
      const fieldArrayErrors = errors.products ? errors.products[index] : {};

      initiateSummaryQuantityCalculation(prevSummaryQuantity.current, value);

      if (price) {
        const prevTotalCostValue = parseToDecimal(totalCost || '0');
        const newTotalCostValue = parseToDecimal(
          bigDecimal.multiply(price, value),
        );

        initiateSummaryTotalCostCalculation(
          prevTotalCostValue,
          newTotalCostValue,
        );

        return setValue(totalCostFieldName, newTotalCostValue, {
          shouldValidate: !!fieldArrayErrors?.totalCost,
        });
      }

      if (totalCost) {
        return setValue(
          priceFieldName,
          bigDecimal.divide(totalCost, value, 2),
          { shouldValidate: !!fieldArrayErrors?.price },
        );
      }
    }
  };

  const handleInputFocus = (value: InputFormValue) => {
    if (typeof value === 'number') {
      prevSummaryQuantity.current = value;
    }
  };

  return (
    <InputWithTooltipAdapter
      isRequired
      type="number"
      size="xs"
      name={`${fieldCommonName}.${index}.${supplyFormProductsSubfields.quantity}`}
      ariaLabel={translate('supply.product.quantity')}
      onBlur={handleInputBlur}
      onFocus={handleInputFocus}
      control={control}
    />
  );
};
