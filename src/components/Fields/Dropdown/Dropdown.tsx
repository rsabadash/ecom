import {
  FC,
  KeyboardEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';

import { ReactComponent as ChevronDownIcon } from '../../../assets/icons/ChevronDown.svg';
import { ReactComponent as ChevronUpIcon } from '../../../assets/icons/ChevronUp.svg';
import { DEFAULT_ICON_SIZE } from '../../../common/constants/icons';
import { EventKeys } from '../../../common/enums/events';
import { useOutsideElementClick } from '../../../common/hooks';
import { useTranslation } from '../../IntlProvider';
import { DEFAULT_DROPDOWN_SIZE, INDEX_ABSENCE_FOCUS } from './constants';
import {
  DropdownItem,
  DropdownItemId,
  DropdownProps,
  DropdownValue,
  KeyIndexMap,
} from './types';

import classes from './styles/index.module.css';

const LIST_CONTROL_ID = Date.now().toString();

export const Dropdown: FC<DropdownProps> = ({
  id,
  name,
  value,
  size = DEFAULT_DROPDOWN_SIZE,
  items = [],
  customItems,
  placeholder,
  isOpen,
  isValid,
  isReadOnly,
  isRequired,
  isDisabled,
  hasMultiselect,
  // onBlur,
  onChange,
  itemValueGetter,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
}) => {
  const dropdownItems = customItems || items;
  const hasEmptyItem = !isRequired;
  const focusItemsList = hasEmptyItem
    ? [undefined, ...dropdownItems]
    : dropdownItems;
  const hasItems = dropdownItems?.length > 0;
  const useCustomValueGetter = !!itemValueGetter;
  const isActive = !isDisabled && !isReadOnly;
  const isListInitialized = isActive && hasItems;

  const listRef = useRef<null | HTMLUListElement>(null);
  const dropdownButtonRef = useRef<null | HTMLDivElement>(null);

  const [isOpenInternal, setIsOpenInternal] = useState<boolean>(
    () => isOpen || false,
  );
  const [isKeyboardControl, setIsKeyboardControl] = useState<boolean>(false);

  const { translate } = useTranslation();

  const handleOutsideDropdownClick = (): void => {
    closeDropdown();
  };

  useOutsideElementClick({
    ref: listRef,
    dependency: isOpenInternal,
    listenInteraction: true,
    handleClick: handleOutsideDropdownClick,
  });

  const getItemValue = (
    item?: DropdownValue,
    getId?: boolean,
  ): DropdownItemId | null => {
    const dropdownItem = useCustomValueGetter ? itemValueGetter(item) : item;

    if (!dropdownItem) {
      return null;
    }

    if (typeof dropdownItem === 'string' || typeof dropdownItem === 'number') {
      return dropdownItem.toString();
    }

    if (Array.isArray(dropdownItem)) {
      return dropdownItem.reduce<string>((acc, dropdownItem, index) => {
        if (index === 0) {
          acc += getItemValue(dropdownItem, getId);
        } else {
          acc += `, ${getItemValue(dropdownItem, getId)}`;
        }

        return acc;
      }, '');
    }

    return getId ? dropdownItem.id : dropdownItem.value?.toString();
  };

  const getInitialFocusIndex = (): number => {
    if (value) {
      let item: DropdownItem;

      if (Array.isArray(value)) {
        item = value[0];
      } else {
        item = value;
      }

      const itemId = getItemValue(item, true);
      const index = focusItemsList.findIndex(
        (item) => getItemValue(item, true) === itemId,
      );

      return index !== -1 ? index : 0;
    }

    return 0;
  };

  const getInitialFocusId = (): DropdownItemId | null => {
    return getItemValue(value, true);
  };

  const [focusIndex, setFocusIndex] = useState<number>(INDEX_ABSENCE_FOCUS);
  const [focusItemId, setFocusItemId] = useState<DropdownItemId | null>(null);

  useEffect(() => {
    if (isListInitialized && isKeyboardControl) {
      setFocusIndex(() => getInitialFocusIndex());
      setFocusItemId(() => getInitialFocusId());
    }
  }, [isListInitialized, isKeyboardControl]);

  useLayoutEffect(() => {
    if (isOpenInternal && focusIndex !== INDEX_ABSENCE_FOCUS) {
      listRef.current?.children[focusIndex].scrollIntoView({
        block: 'nearest',
      });
    }
  }, [isOpenInternal, focusIndex]);

  const openDropdown = (): void => {
    setIsOpenInternal(true);
  };

  const resetDropdownState = (): void => {
    setIsKeyboardControl(false);

    if (value === undefined || value === null) {
      setFocusIndex(0);
      setFocusItemId(null);
    }
  };

  const closeDropdown = (): void => {
    setIsOpenInternal(false);
    resetDropdownState();
  };

  const toggleDropdownList = (): void => {
    if (isOpenInternal) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const setFocusData = (index: number): void => {
    const id = getItemValue(focusItemsList[index], true);
    setFocusItemId(id);
    setFocusIndex(index);
  };

  const handleDropdownClick = (): void => {
    if (!isActive) {
      return;
    }

    toggleDropdownList();
  };

  const initMultiSelection = (item: DropdownItem): void => {
    if (value) {
      if (Array.isArray(value)) {
        return onChange && onChange([...value, item], true);
      } else {
        return onChange && onChange([value, item], true);
      }
    }

    return onChange && onChange([item], true);
  };

  const initSingleSelection = (item: DropdownItem): void => {
    onChange && onChange(item, true);
    closeDropdown();
  };

  const initSelection = (item: DropdownItem): void => {
    if (hasMultiselect) {
      initMultiSelection(item);
    } else {
      initSingleSelection(item);
    }
  };

  const initMultiUnSelection = (item: DropdownItem): void => {
    const notLastItemUnselected = Array.isArray(value) && value.length > 1;
    const idValue = getItemValue(item, true);

    if (notLastItemUnselected) {
      const filteredValue = value.filter(
        (current) => getItemValue(current, true) !== idValue,
      );

      return onChange && onChange(filteredValue, false);
    }

    onChange && onChange([], false);
  };

  const initSingleUnSelection = (): void => {
    if (!isRequired) {
      const emptyValue = hasMultiselect ? [] : null;

      onChange && onChange(emptyValue, false);
    }

    closeDropdown();
  };

  const initUnSelection = (item: DropdownItem): void => {
    if (hasMultiselect) {
      initMultiUnSelection(item);
    } else {
      closeDropdown();
    }
  };

  const handleListItemClick = (
    item: DropdownItem,
    isSelected: boolean,
  ): void => {
    if (isSelected) {
      initUnSelection(item);
    } else {
      initSelection(item);
    }
  };

  const defineFocusIndexByKey = (key: EventKeys): number | undefined => {
    const itemsLength = focusItemsList.length;
    const isInitialIndex = focusIndex === INDEX_ABSENCE_FOCUS;

    const keyIndexPair: KeyIndexMap = {
      [EventKeys.Home]: 0,
      [EventKeys.End]: itemsLength - 1,
      [EventKeys.ArrowDown]:
        isInitialIndex || focusIndex === itemsLength - 1 ? 0 : focusIndex + 1,
      [EventKeys.ArrowUp]:
        isInitialIndex || focusIndex === 0 ? itemsLength - 1 : focusIndex - 1,
      [EventKeys.PageDown]:
        isInitialIndex || focusIndex === itemsLength - 1 ? 0 : focusIndex + 1,
      [EventKeys.PageUp]:
        isInitialIndex || focusIndex === 0 ? itemsLength - 1 : focusIndex - 1,
      [EventKeys.Escape]: INDEX_ABSENCE_FOCUS,
      [EventKeys.Tab]: INDEX_ABSENCE_FOCUS,
      [EventKeys.Enter]: INDEX_ABSENCE_FOCUS,
      [EventKeys.Space]: INDEX_ABSENCE_FOCUS,
    };

    if (typeof keyIndexPair[key] !== 'undefined') {
      return keyIndexPair[key];
    }

    return undefined;
  };

  const keyboardListNavigation = (index: number): void => {
    if (!isOpenInternal) {
      openDropdown();
    }

    if (!isKeyboardControl) {
      setIsKeyboardControl(true);
    }

    setFocusData(index);
  };

  const keyboardItemSelection = (): void => {
    const currentItem = focusItemsList[focusIndex];
    const id = getItemValue(currentItem, true);

    if (id) {
      const isSelected = checkIsSelected(id);
      handleListItemClick(currentItem, isSelected);
    } else {
      hasEmptyItem && initSingleUnSelection();
    }
  };

  const keyboardDropdownOpen = (): void => {
    openDropdown();
    setIsKeyboardControl(true);
  };

  const handleDropdownKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (!isActive) {
      return;
    }

    e.stopPropagation();
    const key = e.key as EventKeys;
    const index = defineFocusIndexByKey(key);

    if (typeof index === 'undefined') {
      return;
    }

    if (index !== INDEX_ABSENCE_FOCUS) {
      e.preventDefault();
      return keyboardListNavigation(index);
    }

    if (isOpenInternal) {
      if (key === EventKeys.Escape || key === EventKeys.Tab) {
        return closeDropdown();
      }

      if (key === EventKeys.Enter || key === EventKeys.Space) {
        return keyboardItemSelection();
      }
    }

    if (!isOpenInternal) {
      if (key === EventKeys.Enter || key === EventKeys.Space) {
        keyboardDropdownOpen();
      }
    }
  };

  const handleListMouseMove = (): void => {
    if (focusIndex !== INDEX_ABSENCE_FOCUS) {
      setIsKeyboardControl(false);
    }
  };

  const checkIsSelected = (id: DropdownItemId): boolean => {
    if (Array.isArray(value)) {
      return !!value.find((current) => getItemValue(current, true) === id);
    }

    return getItemValue(value, true) === id;
  };

  const viewValue = getItemValue(value);
  const placeholderValue = isReadOnly ? '' : placeholder;
  const emptyValue = (
    <span className={classes.dropdownEmptyValue}>
      {translate('notSelected')}
    </span>
  );

  const dropdownClassNames = clsx(classes.dropdown, {
    [classes.dropdown_noValue]: !viewValue,
    [classes.dropdown_readOnly]: isReadOnly,
    [classes.dropdown_invalid]: isValid !== undefined && !isValid,
    [classes[`dropdown_${size}`]]: size,
  });

  const dropdownListClassNames = clsx(classes.dropdownList, {
    [classes[`dropdownList_${size}`]]: size,
  });

  return (
    <div className={classes.dropdownWrapper}>
      <div
        id={id || name}
        role="combobox"
        aria-disabled={isDisabled}
        aria-required={isRequired}
        aria-haspopup="listbox"
        aria-expanded={isOpenInternal}
        aria-controls={LIST_CONTROL_ID}
        aria-activedescendant={focusItemId || undefined}
        aria-label={ariaLabel} //  if another description is absent
        aria-labelledby={ariaLabelledBy} // which element has a label for an input
        aria-describedby={ariaDescribedBy || placeholder} // which element describe input
        aria-valuetext={viewValue || undefined}
        onClick={handleDropdownClick}
        onKeyDown={handleDropdownKeyDown}
        ref={dropdownButtonRef}
        className={dropdownClassNames}
        tabIndex={isActive ? 0 : -1}
      >
        <div>{viewValue || placeholderValue || emptyValue}</div>
        <div className={classes.dropdownIcon}>
          {isOpenInternal ? (
            <ChevronUpIcon
              width={DEFAULT_ICON_SIZE}
              height={DEFAULT_ICON_SIZE}
            />
          ) : (
            <ChevronDownIcon
              width={DEFAULT_ICON_SIZE}
              height={DEFAULT_ICON_SIZE}
            />
          )}
        </div>
      </div>
      {isOpenInternal && isListInitialized && (
        <div className={classes.dropdownListWrapper}>
          <ul
            id={LIST_CONTROL_ID}
            role="listbox"
            aria-labelledby={ariaLabelledBy}
            aria-multiselectable={hasMultiselect}
            onMouseMove={handleListMouseMove}
            ref={listRef}
            className={dropdownListClassNames}
          >
            {/*TODO keyboard navigation for empty item*/}
            {hasEmptyItem && (
              <li
                role="option"
                id="emptyItem"
                onClick={initSingleUnSelection}
                aria-selected={false}
                className={clsx(
                  classes.dropdownList__item,
                  classes.dropdown_noValue,
                  {
                    [classes.dropdownList__item_focus]:
                      isKeyboardControl && focusIndex === 0,
                  },
                )}
              >
                {translate('reset')}
              </li>
            )}
            {dropdownItems.map((item, index) => {
              const idValue = getItemValue(item, true);
              const itemValue = getItemValue(item);
              const isSelected = !!idValue && checkIsSelected(idValue);
              const itemIndex = hasEmptyItem ? index + 1 : index;

              const dropdownListItemClass = clsx(classes.dropdownList__item, {
                [classes.dropdownList__item_focus]:
                  isKeyboardControl && focusIndex === itemIndex,
              });

              return (
                <li
                  role="option"
                  id={idValue || undefined}
                  key={idValue}
                  onClick={() => handleListItemClick(item, isSelected)}
                  aria-selected={isSelected}
                  className={dropdownListItemClass}
                >
                  {itemValue}
                  {hasMultiselect && isSelected && <span> 🗸</span>}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <input value={viewValue || ''} name={name} type="hidden" />
    </div>
  );
};
