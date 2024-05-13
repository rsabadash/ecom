import { yupResolver } from '@hookform/resolvers/yup';
import { boolean, object, ObjectSchema, string } from 'yup';

import { useCustomForm } from '../../../common/hooks';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
} from '../../../common/hooks/useCustomForm';
import { SignInFormValues } from '../types';

type UseCategoryFromProps = Pick<
  UseCustomFormProps<SignInFormValues>,
  'submitHandler'
>;

type UseCategoryFromReturn = Pick<
  UseCustomFormReturn<SignInFormValues>,
  'control' | 'handleSubmit'
>;

const schema: ObjectSchema<SignInFormValues> = object({
  email: string()
    .email('signIn.email.invalid')
    .required('signIn.email.required'),
  password: string().required('signIn.password.required'),
  isPersistUser: boolean().required(),
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
