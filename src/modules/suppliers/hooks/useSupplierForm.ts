import { useForm } from 'react-hook-form';
import { SupplierFormValues } from '../types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { supplierFormFields } from '../constants';

const schema = yup.object().shape({
  [supplierFormFields.name]: yup.string().required().min(3).max(50),
  [supplierFormFields.note]: yup.string().max(1024),
  [supplierFormFields.phoneNumber]: yup.string().length(10).nullable(),
});

export const useSupplierForm = (
  formValues: Partial<SupplierFormValues> | undefined,
): UseFormReturn<SupplierFormValues> => {
  return useForm<SupplierFormValues>({
    resolver: yupResolver(schema),
    defaultValues: formValues || undefined,
  });
};
