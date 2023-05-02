import { FC, useRef } from 'react';
import { useFormState } from 'react-hook-form';
import { InputWithTooltipAdapter } from '../../components/FormFieldsAdapter';
import { useTranslation } from '../../components/IntlProvider';
import { SupplyProductCellProps } from './types';
import { DECIMAL } from '../../common/constants/regExp';
import { calculateSummary, parseToDecimal } from './utils';
import { supplyFormFields, supplyFormProductsSubfields } from './constants';
import { InputFormValue } from '../../components/Fields/Input';

import bigDecimal from 'js-big-decimal';

export const SupplyProductPriceCell: FC<SupplyProductCellProps> = ({
  index,
  control,
  setValue,
  getValues,
  fieldCommonName,
}) => {
  const prevSummaryTotalCostRef = useRef<string | null>(null);

  const { translate } = useTranslation();

  const { errors } = useFormState({ control });

  const priceFieldName =
    `${fieldCommonName}.${index}.${supplyFormProductsSubfields.price}` as const;
  const totalCostFieldName =
    `${fieldCommonName}.${index}.${supplyFormProductsSubfields.totalCost}` as const;

  const formatPriceValue = (value: string, prevValue: string): string => {
    if (DECIMAL.test(value) || !value) {
      return value;
    }

    return prevValue;
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

    prevSummaryTotalCostRef.current = newSummaryTotalCost;

    setValue(supplyFormFields.productsTotalCost, newSummaryTotalCost, {
      shouldValidate: false,
    });
  };

  const handleInputBlur = (value: InputFormValue): void => {
    if (typeof value === 'string' && value.trim() !== '') {
      const decimalPriceValue = parseToDecimal(value);
      const { quantity, totalCost } = getValues(`products.${index}`) || {};
      const prevTotalCostValue = parseToDecimal(totalCost || '0');

      const fieldArrayErrors = errors.products ? errors.products[index] : {};

      const avoidTotalCostCalculation =
        decimalPriceValue === parseToDecimal('0') || !quantity;

      const newTotalCost = avoidTotalCostCalculation
        ? parseToDecimal('0')
        : parseToDecimal(bigDecimal.multiply(value, quantity));

      initiateSummaryTotalCostCalculation(prevTotalCostValue, newTotalCost);

      setValue(totalCostFieldName, newTotalCost, {
        shouldValidate: !!fieldArrayErrors?.totalCost,
      });
      setValue(priceFieldName, decimalPriceValue, {
        shouldValidate: !!fieldArrayErrors?.price,
      });
    }
  };

  return (
    <InputWithTooltipAdapter
      isRequired
      size="xs"
      name={priceFieldName}
      formatValue={formatPriceValue}
      onBlur={handleInputBlur}
      ariaLabel={translate('supply.product.price')}
      control={control}
    />
  );
};
