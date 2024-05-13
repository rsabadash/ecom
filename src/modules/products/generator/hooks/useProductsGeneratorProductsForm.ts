import { yupResolver } from '@hookform/resolvers/yup';
import { array, object, ObjectSchema, string } from 'yup';

import { UNITS_LIST } from '../../../../common/constants/units';
import { useCustomForm } from '../../../../common/hooks';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
} from '../../../../common/hooks/useCustomForm';
import { Unit } from '../../../../common/types/unit';
import { mainTranslationRequired } from '../../../../validations/schemas/translations';
import { ProductsGeneratorProductsFormValues } from '../types';

type UseProductsGeneratorProductsFromProps = Pick<
  UseCustomFormProps<ProductsGeneratorProductsFormValues>,
  'shouldReset' | 'submitHandler'
> & {
  defaultValues?: Partial<ProductsGeneratorProductsFormValues>;
};

type UseProductsGeneratorProductsFromReturn = Pick<
  UseCustomFormReturn<ProductsGeneratorProductsFormValues>,
  'control' | 'setValue' | 'clearErrors' | 'handleSubmit'
>;

const schema: ObjectSchema<ProductsGeneratorProductsFormValues> = object({
  products: array()
    .of(
      object({
        name: string().required('product.generatedName.error.required'),
        unit: string<Unit>()
          .oneOf(UNITS_LIST, 'error.dropdown.unsupportedValue')
          .required(),
        attributes: array()
          .of(
            object({
              attributeId: string().required(),
              variants: array()
                .of(
                  object({
                    variantId: string().required(),
                    name: object(
                      mainTranslationRequired({
                        uk: 'category.name.error.required',
                      }),
                    ).required(),
                  }).required(),
                )
                .required(),
            }).required(),
          )
          .required()
          .nullable(),
        sku: string().required('product.sku.error.required'),
      }),
    )
    .required(),
});

export const useProductsGeneratorProductsForm = ({
  shouldReset,
  submitHandler,
  defaultValues,
}: UseProductsGeneratorProductsFromProps): UseProductsGeneratorProductsFromReturn => {
  const { control, setValue, handleSubmit, clearErrors } =
    useCustomForm<ProductsGeneratorProductsFormValues>({
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
    clearErrors,
    handleSubmit,
  };
};
