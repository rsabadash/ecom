import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
  YupSchemaKey,
} from '../../../../hooks/useCustomForm';
import { useCustomForm } from '../../../../hooks';
import { AttributeFormValues } from '../types';
import { mainTranslationRequired } from '../../../../validations/translations';

type UseAttributeFromProps = Pick<
  UseCustomFormProps<AttributeFormValues>,
  'shouldReset' | 'submitHandler'
> & {
  defaultValues?: Partial<AttributeFormValues>;
};

type UseAttributeFromReturn = Pick<
  UseCustomFormReturn<AttributeFormValues>,
  'control' | 'handleSubmit'
>;

type UseAttributeForm = (
  props: UseAttributeFromProps,
) => UseAttributeFromReturn;

const schema = yup.object().shape<YupSchemaKey<AttributeFormValues>>({
  name: yup
    .object()
    .shape(
      mainTranslationRequired({
        uk: 'attribute.name.error.required',
      }),
    )
    .required(),
});

export const useAttributeForm: UseAttributeForm = ({
  shouldReset,
  submitHandler,
  defaultValues,
}) => {
  const { control, handleSubmit } = useCustomForm<AttributeFormValues>({
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
