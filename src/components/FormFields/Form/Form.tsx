import { FC } from 'react';

import { FormProps } from './types';

export const Form: FC<FormProps> = ({ children, onSubmit }) => {
  return (
    <form noValidate onSubmit={onSubmit}>
      {children}
    </form>
  );
};
