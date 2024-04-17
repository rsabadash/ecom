import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useCustomForm } from '../../../../common/hooks';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
  YupSchemaKey,
} from '../../../../common/hooks/useCustomForm';
import {
  GeneratedProductFieldValue,
  ProductsGeneratorProductsFormValues,
} from '../types';

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

const schema = yup
  .object()
  .shape<YupSchemaKey<ProductsGeneratorProductsFormValues>>({
    products: yup.array().of(
      yup.object().shape<YupSchemaKey<GeneratedProductFieldValue>>({
        name: yup
          .string()
          .nullable()
          .required('product.generatedName.error.required'),
        sku: yup.string().nullable().required('product.sku.error.required'),
      }),
    ),
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
