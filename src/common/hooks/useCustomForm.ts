import { BaseSyntheticEvent, useCallback, useEffect, useRef } from 'react';
import {
  DefaultValues,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';

export type YupSchemaKey<V> = Partial<Record<keyof V, any>>;

export type UseCustomFormProps<V extends Record<string, any>> = {
  formProps: UseFormProps<V>;
  shouldReset?: boolean;
  submitHandler: SubmitHandler<V>;
};

export type UseCustomFormReturn<V extends Record<string, any>> = Omit<
  UseFormReturn<V>,
  'handleSubmit'
> & {
  handleSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
};

export const useCustomForm = <V extends Record<string, any>>({
  formProps,
  shouldReset,
  submitHandler,
}: UseCustomFormProps<V>): UseCustomFormReturn<V> => {
  const { formState, reset, clearErrors, handleSubmit, ...rest } =
    useForm<V>(formProps);

  const isInitializedRef = useRef<boolean>(false);
  const { isDirty, isSubmitted, errors } = formState;
  const { defaultValues } = formProps;
  const hasError = Object.keys(errors).length > 0;

  useEffect(() => {
    // isInitializedRef - prevent re-initializing the defaultValues on firs render
    if (defaultValues && isInitializedRef.current) {
      reset(defaultValues as DefaultValues<V>);
    }

    isInitializedRef.current = true;
  }, [defaultValues, reset]);

  const handleFormSubmit = useCallback(
    async (e?: BaseSyntheticEvent): Promise<void> =>
      await handleSubmit(submitHandler)(e),
    [handleSubmit, submitHandler],
  );

  useEffect(() => {
    if (shouldReset) {
      if (isDirty && !isSubmitted) {
        reset();
      }

      if (hasError) {
        clearErrors();
      }
    }
  }, [reset, shouldReset, isSubmitted, isDirty, clearErrors, hasError]);

  return {
    ...rest,
    formState,
    reset,
    clearErrors,
    handleSubmit: handleFormSubmit,
  };
};
