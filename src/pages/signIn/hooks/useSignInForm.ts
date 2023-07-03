import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
  YupSchemaKey,
} from '../../../common/hooks/useCustomForm';
import { useCustomForm } from '../../../common/hooks';
import { SignInFormValues } from '../types';

type UseCategoryFromProps = Pick<
  UseCustomFormProps<SignInFormValues>,
  'submitHandler'
>;

type UseCategoryFromReturn = Pick<
  UseCustomFormReturn<SignInFormValues>,
  'control' | 'handleSubmit'
>;

const schema = yup.object().shape<YupSchemaKey<SignInFormValues>>({
  email: yup
    .string()
    .email('signIn.email.invalid')
    .nullable()
    .required('signIn.email.required'),
  password: yup.string().nullable().required('signIn.password.required'),
});

export const useSignInForm = ({
  submitHandler,
}: UseCategoryFromProps): UseCategoryFromReturn => {
  const { control, handleSubmit } = useCustomForm<SignInFormValues>({
    formProps: {
      resolver: yupResolver(schema),
    },
    submitHandler,
  });

  return {
    control,
    handleSubmit,
  };
};
