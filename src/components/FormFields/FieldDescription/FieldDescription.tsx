import { FC } from 'react';
import clsx from 'clsx';

import { TYPE_TO_ARIA_LIVE_MAPPER } from './constatns';
import { FieldDescriptionProps } from './types';

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
    type && TYPE_TO_ARIA_LIVE_MAPPER[type]
      ? TYPE_TO_ARIA_LIVE_MAPPER[type]
      : TYPE_TO_ARIA_LIVE_MAPPER.default;

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
