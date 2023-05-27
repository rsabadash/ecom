import { FC } from 'react';
import { Tooltip } from '../../Tooltip';
import { Dropdown } from '../../Fields/Dropdown';
import { DropdownWithTooltipFormFieldProps } from './types';
import classes from './styles/index.module.css';

export const DropdownWitTooltipFormField: FC<
  DropdownWithTooltipFormFieldProps
> = ({
  name,
  size,
  value,
  items,
  customItems,
  placeholder,
  isValid,
  isRequired,
  isDisabled,
  isOpen,
  hasMultiselect,
  onBlur,
  onChange,
  itemValueGetter,
  ariaLabel,
  isReadOnly,
  errorMessage,
  position,
}) => {
  const describedById = `${name}Description`;

  return (
    <Tooltip
      isClickable
      isChildrenFocusable
      content={errorMessage || placeholder}
      contentId={describedById}
      position={position}
      tooltipClassName={classes.dropdownTooltip}
    >
      <Dropdown
        name={name}
        size={size}
        value={value}
        items={items}
        customItems={customItems}
        isValid={isValid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        isDisabled={isDisabled}
        isOpen={isOpen}
        hasMultiselect={hasMultiselect}
        ariaLabel={ariaLabel}
        ariaDescribedBy={describedById}
        onBlur={onBlur}
        onChange={onChange}
        itemValueGetter={itemValueGetter}
        ariaLabelledBy={name}
      />
    </Tooltip>
  );
};
