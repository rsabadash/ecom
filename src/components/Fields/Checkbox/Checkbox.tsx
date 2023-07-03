import { FC } from 'react';
import clsx from 'clsx';
import { CheckboxProps } from './types';
import { ReactComponent as CheckIcon } from '../../../assets/icons/Check.svg';
import classes from './styles/index.module.css';

export const Checkbox: FC<CheckboxProps> = ({
  id,
  name,
  isChecked,
  isValid,
  isReadOnly,
  isRequired,
  isDisabled,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  onBlur,
  onChange,
}) => {
  const handleOnChange = (): void => {
    if (!isDisabled && !isReadOnly) {
      onChange(!isChecked);
    }
  };

  const checkboxClassNames = clsx(classes.checkbox, {
    [classes.checkbox_readOnly]: isReadOnly,
    [classes.checkbox_invalid]: !isValid,
    [classes.checkbox_checked]: isChecked,
  });

  return (
    <div className={classes.checkboxWrapper}>
      <input
        id={id || name}
        name={name}
        type="checkbox"
        checked={isChecked}
        readOnly={isReadOnly}
        required={isRequired}
        disabled={isDisabled}
        onBlur={onBlur}
        onChange={handleOnChange}
        aria-checked={isChecked} // could be avoidable, but in this case used, cause React doesn't show checked attribute and voice doesn't announce that field is isChecked
        aria-required={isRequired} // could be avoidable, but in this case used, cause React doesn't show require attribute and voice doesn't announce that field is isRequired
        aria-invalid={!isValid} // if value invalid
        aria-label={ariaLabel} //  if another description is absent
        aria-labelledby={ariaLabelledBy} // which element has a label for an input
        aria-describedby={ariaDescribedBy} // which element describe input
        className={checkboxClassNames}
        tabIndex={isReadOnly ? -1 : 0}
      />
      {isChecked && (
        <span className={classes.checkboxCheckMark}>
          <CheckIcon />
        </span>
      )}
    </div>
  );
};
