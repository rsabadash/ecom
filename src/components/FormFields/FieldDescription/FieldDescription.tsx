import { FC } from 'react';
import clsx from 'clsx';
import { FieldDescriptionProps } from './types';
import { typeToAriaLiveMapper } from './constatns';
import classes from './styles/index.module.css';

export const FieldDescription: FC<FieldDescriptionProps> = ({
  id,
  type,
  message,
  descriptionClassName,
}) => {
  const fieldDescriptionClassNames = clsx(
    classes.fieldDescription,
    {
      [classes[`fieldDescription_${type}`]]: type,
    },
    descriptionClassName,
  );

  const ariaLiveType =
    type && typeToAriaLiveMapper[type]
      ? typeToAriaLiveMapper[type]
      : typeToAriaLiveMapper.default;

  return (
    <div
      id={id}
      className={fieldDescriptionClassNames}
      aria-live={ariaLiveType}
    >
      {message}
    </div>
  );
};
