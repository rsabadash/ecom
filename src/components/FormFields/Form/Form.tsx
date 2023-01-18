import { FC, PropsWithChildren } from 'react';
import { FormProps } from './types';

export const Form: FC<PropsWithChildren<FormProps>> = ({
  children,
  onSubmit,
}) => {
  return (
    <form noValidate onSubmit={onSubmit}>
      {children}
    </form>
  );
};
