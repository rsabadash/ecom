import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';

import { useCustomForm } from '../../../../common/hooks';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
  YupSchemaKey,
} from '../../../../common/hooks/useCustomForm';
import { DropdownItemObject } from '../../../../components/Fields/Dropdown';
import { dropdownItem } from '../../../../validations/dropdown';
import { WarehouseFormDefaultValues, WarehouseFormValues } from '../types';

type UseWarehouseFormProps = Pick<
  UseCustomFormProps<WarehouseFormValues>,
  'shouldReset' | 'submitHandler'
> & {
  defaultValues?: WarehouseFormDefaultValues;
};

type UseWarehouseFormReturn = Pick<
  UseCustomFormReturn<WarehouseFormValues>,
  'control' | 'handleSubmit'
>;

const schema = yup.object().shape<YupSchemaKey<WarehouseFormValues>>({
  name: yup.string().nullable().required('warehouse.name.error.required'),
  type: yup
    .object()
    .nullable()
    .shape<YupSchemaKey<DropdownItemObject>>(dropdownItem)
    .required('warehouse.type.error.required'),
});

export const useWarehouseForm = ({
  shouldReset,
  submitHandler,
  defaultValues,
}: UseWarehouseFormProps): UseWarehouseFormReturn => {
  const { control, handleSubmit } = useCustomForm<WarehouseFormValues>({
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
