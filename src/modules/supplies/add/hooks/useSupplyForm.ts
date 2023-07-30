import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  DECIMAL_TWO_SIGN_POSITIVE,
  DECIMAL_TWO_SIGN_ZERO,
} from '../../../../common/constants/regex';
import { useCustomForm } from '../../../../common/hooks';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
  YupSchemaKey,
} from '../../../../common/hooks/useCustomForm';
import { DropdownItemObject } from '../../../../components/Fields/Dropdown';
import { objectErrorMessage } from '../../../../components/FormFieldsAdapter/utils';
import { dropdownItem } from '../../../../validations/dropdown';
import { supplyFormFields, supplyFormProductsSubfields } from '../constants';
import { SupplyFormValues, SupplyProduct } from '../types';
import { isUnitSupportDecimal, parseToDecimal } from '../utils';

type UseSupplyFormProps = Pick<
  UseCustomFormProps<SupplyFormValues>,
  'shouldReset' | 'submitHandler'
> & {
  defaultValues?: Partial<SupplyFormValues>;
};

type UseSupplyFormReturn = Pick<
  UseCustomFormReturn<SupplyFormValues>,
  'control' | 'setValue' | 'getValues' | 'handleSubmit'
>;

const schema = yup.object().shape<YupSchemaKey<SupplyFormValues>>({
  [supplyFormFields.name]: yup.string().nullable(),
  [supplyFormFields.supplier]: yup
    .object()
    .nullable()
    .shape<YupSchemaKey<DropdownItemObject>>(dropdownItem)
    .required('supply.supplier.error.required'),
  [supplyFormFields.warehouse]: yup
    .object()
    .nullable()
    .shape<YupSchemaKey<DropdownItemObject>>(dropdownItem)
    .required('supply.warehouse.error.required'),
  [supplyFormFields.products]: yup.array().of(
    yup.object().shape<YupSchemaKey<SupplyProduct>>({
      [supplyFormProductsSubfields.name]: yup
        .object()
        .nullable()
        .shape<YupSchemaKey<DropdownItemObject>>(dropdownItem)
        .required('supply.product.name.error.required'),
      [supplyFormProductsSubfields.quantity]: yup.lazy((value, options) => {
        const { name, unit } = options?.parent || {};

        if (!name) {
          return yup
            .string()
            .nullable()
            .required('supply.product.quantity.error.required');
        }

        const { id, value: unitValue } = unit || {};
        const isSupportDecimal =
          value === parseToDecimal('0') || isUnitSupportDecimal(id);
        console.log(isSupportDecimal);
        const DECIMAL_REGEX = isSupportDecimal
          ? DECIMAL_TWO_SIGN_POSITIVE
          : DECIMAL_TWO_SIGN_ZERO;
        const errorTranslation = isSupportDecimal
          ? 'supply.product.quantity.error.min'
          : 'supply.product.quantity.error.onlyInteger';
        const errorValue = isSupportDecimal ? 1 : unitValue.toLowerCase();

        return yup
          .string()
          .nullable()
          .required('supply.product.quantity.error.required')
          .test(
            'is-support-decimal',
            objectErrorMessage({
              key: errorTranslation,
              value: errorValue,
            }),
            (val: any) => DECIMAL_REGEX.test(val),
          );
      }),
      [supplyFormProductsSubfields.price]: yup
        .string()
        .nullable()
        .required('supply.product.price.error.required'),
      [supplyFormProductsSubfields.totalCost]: yup
        .string()
        .nullable()
        .required('supply.product.totalCost.error.required'),
    }),
  ),
  [supplyFormFields.productsTotalCost]: yup
    .string()
    .nullable()
    .required('supply.product.totalCostProducts.error.required'),
});

export const useSupplyForm = ({
  shouldReset,
  submitHandler,
  defaultValues,
}: UseSupplyFormProps): UseSupplyFormReturn => {
  const { control, setValue, getValues, handleSubmit } =
    useCustomForm<SupplyFormValues>({
      formProps: {
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
      },
      shouldReset,
      submitHandler,
    });

  return {
    control,
    setValue,
    getValues,
    handleSubmit,
  };
};
