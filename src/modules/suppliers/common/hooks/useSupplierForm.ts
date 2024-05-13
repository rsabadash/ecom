import { yupResolver } from '@hookform/resolvers/yup';
import { object, ObjectSchema, string } from 'yup';

import { useCustomForm } from '../../../../common/hooks';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
} from '../../../../common/hooks/useCustomForm';
import { SupplierFormDefaultValues, SupplierFormValues } from '../types';

type UseSupplierFormProps = Pick<
  UseCustomFormProps<SupplierFormValues>,
  'shouldReset' | 'submitHandler'
> & {
  defaultValues?: SupplierFormDefaultValues;
};

type UseSupplierFormReturn = Pick<
  UseCustomFormReturn<SupplierFormValues>,
  'control' | 'handleSubmit'
>;

const schema: ObjectSchema<SupplierFormValues> = object({
  name: string().required('supplier.name.error.required'),
  address: string().required().nullable(),
  phoneNumber: string().required().nullable(),
});

export const useSupplierForm = ({
  shouldReset,
  submitHandler,
  defaultValues,
}: UseSupplierFormProps): UseSupplierFormReturn => {
  const { control, handleSubmit } = useCustomForm<SupplierFormValues>({
    formProps: {
      resolver: yupResolver(schema),
      defaultValues: defaultValues,
    },
    shouldReset,
    submitHandler,
  });

  return {
    control,
    handleSubmit,
  };
};
