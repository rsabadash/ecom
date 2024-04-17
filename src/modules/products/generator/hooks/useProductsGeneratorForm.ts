import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { UNITS_LIST } from '../../../../common/constants/units';
import { useCustomForm } from '../../../../common/hooks';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
  YupSchemaKey,
} from '../../../../common/hooks/useCustomForm';
import { ProductsGeneratorFormValues } from '../types';

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

const schema = yup.object().shape<YupSchemaKey<ProductsGeneratorFormValues>>({
  name: yup.string().nullable().required('product.name.error.required'),
  unit: yup
    .string()
    .nullable()
    .oneOf(UNITS_LIST, 'error.dropdown.unsupportedValue')
    .required('product.unit.error.required'),
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
