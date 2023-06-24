import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SupplyFormValues, SupplyProduct } from '../types';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
  YupSchemaKey,
} from '../../../../hooks/useCustomForm';
import { useCustomForm } from '../../../../hooks';
import { supplyFormFields, supplyFormProductsSubfields } from '../constants';
import { dropdownItem } from '../../../../validations/dropdown';
import { DropdownItemObject } from '../../../../components/Fields/Dropdown';
import { objectErrorMessage } from '../../../../components/FormFieldsAdapter/utils';
import { isUnitSupportDecimal, parseToDecimal } from '../utils';
import {
  DECIMAL_POSITIVE,
  DECIMAL_ZERO_ENDS,
} from '../../../../common/constants/regex';

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
  [supplyFormFields.name]: yup
    .string()
    .nullable()
    .required('supply.name.error.required'),
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

        const DECIMAL_REGEX = isSupportDecimal
          ? DECIMAL_POSITIVE
          : DECIMAL_ZERO_ENDS;
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
  [supplyFormFields.productsTotalQuantity]: yup
    .string()
    .nullable()
    .required('supply.product.totalQuantityProducts.error.required'),
  [supplyFormFields.productsTotalQuantity]: yup
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
