import { yupResolver } from '@hookform/resolvers/yup';
import { array, object, ObjectSchema, Schema, string } from 'yup';

import { UNITS_LIST } from '../../../../common/constants/units';
import { useCustomForm } from '../../../../common/hooks';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
} from '../../../../common/hooks/useCustomForm';
import { Unit } from '../../../../common/types/unit';
import { dynamicObject } from '../../../../validations/methods/dynamicObject';
import {
  ProductsGeneratorFormValues,
  VariantVirtualFieldValue,
} from '../types';

type UseProductsGeneratorFromProps = Pick<
  UseCustomFormProps<ProductsGeneratorFormValues>,
  'shouldReset' | 'submitHandler'
> & {
  defaultValues?: Partial<ProductsGeneratorFormValues>;
};

type UseProductsGeneratorFromReturn = Pick<
  UseCustomFormReturn<ProductsGeneratorFormValues>,
  'control' | 'setValue' | 'getValues' | 'handleSubmit'
>;

const dynamicAttributesVirtual: Schema<VariantVirtualFieldValue[]> = array()
  .of(
    object({
      attributeId: string().required(),
      name: string().required(),
      variantId: string().required(''),
    }),
  )
  .required();

const schema: ObjectSchema<Omit<ProductsGeneratorFormValues, 'attributes'>> =
  object({
    name: string().required('product.name.error.required'),
    unit: string<Unit>()
      .oneOf(UNITS_LIST, 'error.dropdown.unsupportedValue')
      .required('product.unit.error.required'),
    attributesVirtual: dynamicObject<typeof dynamicAttributesVirtual>(
      dynamicAttributesVirtual,
    ).optional(),
  });

export const useProductsGeneratorForm = ({
  shouldReset,
  submitHandler,
  defaultValues,
}: UseProductsGeneratorFromProps): UseProductsGeneratorFromReturn => {
  const { control, handleSubmit, setValue, getValues } =
    useCustomForm<ProductsGeneratorFormValues>({
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
