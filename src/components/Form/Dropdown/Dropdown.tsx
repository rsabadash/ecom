import { forwardRef, KeyboardEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { EventKeys } from './enums';
import { LIST_CONTROL_ID, DEFAULT_FOCUS_INDEX } from './constants';
import { DropdownItemId, DropdownItem, DropdownProps, DropdownValue } from './types';
import { useOutsideElementClick } from '../../../hooks';
import { useTranslation } from '../../IntlProvider';
import classes from './styles/index.module.css';

const Dropdown = forwardRef<HTMLInputElement, DropdownProps>((
    {
        name,
        value ,
        items = [],
        customItems,
        placeholder,
        required,
        disabled,
        open,
        multiselect,
        // invalid,
        // onBlur,
        onChange,
        itemValueGetter,
        ariaLabel,
        ariaLabelledBy,
        ariaDescribedBy
    },
    ref
) => {
    const dropdownItems = customItems || items;
    const useCustomValueGetter = customItems && itemValueGetter
    const hasEmptyItem = !required;

    const [isOpen, setIsOpen] = useState(() => open || false);
    const [isKeyboardControl, setIsKeyboardControl] = useState(false);

    const { translate } = useTranslation();

    const closeDropdown = (): void => {
        setIsOpen(false);
    };

    const toggleDropdownList = (): void => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const handleOutsideDropdownClick = (): void => {
        closeDropdown();
    };

    const { setCurrentElement } = useOutsideElementClick({
        dependency: isOpen,
        handleClick: handleOutsideDropdownClick
    });

    const getItemValue = (item?: DropdownValue, getId?: boolean): string | null => {
        const dropdownItem = useCustomValueGetter ? itemValueGetter(item) : item;

        if (!dropdownItem) {
            return null;
        }

        if (typeof dropdownItem === 'string') {
            return dropdownItem;
        }

        if (Array.isArray(dropdownItem)) {
            return dropdownItem.reduce<string>((acc, dropdownItem, index) => {
                if (index === 0) {
                    acc += getItemValue(dropdownItem, getId)
                } else {
                    acc += `, ${getItemValue(dropdownItem, getId)}`
                }

                return acc;
            }, '');
        }

        return getId ? dropdownItem.id : dropdownItem.value;
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
            const index = dropdownItems.findIndex((item) => getItemValue(item, true) === itemId)

            return index !== -1 ? index : DEFAULT_FOCUS_INDEX;
        }

        return DEFAULT_FOCUS_INDEX;
    };

    const [focusIndex, setFocusIndex] = useState<number>(() => getInitialFocusIndex());
    const [focusItemId, setFocusItemId] = useState<DropdownItemId | null>(() => getItemValue(value, true));

    const listRef = useRef<HTMLUListElement>(null);
    const dropdownButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (dropdownButtonRef.current) {
            setCurrentElement(dropdownButtonRef.current);
        }
    }, [setCurrentElement]);

    useLayoutEffect(() => {
        if (isOpen && focusIndex !== DEFAULT_FOCUS_INDEX && listRef.current) {
            listRef.current.children[focusIndex].scrollIntoView({ block: 'center' });
        }
    }, [isOpen, focusIndex]);

    const setFocusData = (index: number): void => {
        const id = getItemValue(dropdownItems[index], true);
        setFocusItemId(id);
        setFocusIndex(index);
    };

    const handleDropdownClick = (): void => {
        if (disabled) {
            return;
        }

        toggleDropdownList();
    }

    const initMultiSelection = (item: DropdownItem): void => {
        if (value) {
            if (Array.isArray(value)) {
                return onChange([...value, item]);
            } else {
                return onChange([value, item]);
            }
        }

        return onChange([item]);
    };

    const initSingleSelection = (item: DropdownItem): void => {
        onChange(item);
        closeDropdown();
    };

    const initSelection = (item: DropdownItem): void => {
        if (multiselect) {
            initMultiSelection(item);
        } else {
            initSingleSelection(item);
        }
    };

    const initMultiUnSelection = (item: DropdownItem): void => {
        const notLastItemUnselected = Array.isArray(value) && value.length > 1;
        const idValue = getItemValue(item, true);

        if (notLastItemUnselected) {
            const filteredValue = value.filter((current) => getItemValue(current, true) !== idValue);

            return onChange(filteredValue);
        }

        onChange(null);
    };

    const initSingleUnSelection = (): void => {
        if (!required) {
            onChange(null);
        }
        closeDropdown();
    };

    const initUnSelection = (item: DropdownItem): void => {
        if (multiselect) {
            initMultiUnSelection(item);
        } else {
            closeDropdown();
        }
    };

    const handleListItemClick = (item: DropdownItem, selected: boolean): void => {
        if (selected) {
            initUnSelection(item);
        } else {
            initSelection(item);
        }
    };

    const defineIndex = (key: EventKeys): number => {
        const keyIndexPair = {
            [EventKeys.Home]: 0,
            [EventKeys.End]: dropdownItems.length - 1,
            [EventKeys.ArrowDown]: focusIndex === DEFAULT_FOCUS_INDEX || focusIndex === dropdownItems.length - 1 ? 0 : focusIndex + 1,
            [EventKeys.ArrowUp]: focusIndex === DEFAULT_FOCUS_INDEX || focusIndex === 0 ? dropdownItems.length - 1 : focusIndex - 1,
            [EventKeys.PageDown]: focusIndex === DEFAULT_FOCUS_INDEX || focusIndex === dropdownItems.length - 1 ? 0 : focusIndex + 1,
            [EventKeys.PageUp]: focusIndex === DEFAULT_FOCUS_INDEX || focusIndex === 0 ? dropdownItems.length - 1 : focusIndex - 1,
            [EventKeys.Escape]: DEFAULT_FOCUS_INDEX,
            [EventKeys.Tab]: DEFAULT_FOCUS_INDEX,
            [EventKeys.Enter]: DEFAULT_FOCUS_INDEX,
            [EventKeys.Space]: DEFAULT_FOCUS_INDEX,
            default: DEFAULT_FOCUS_INDEX
        };

        return key in keyIndexPair ? keyIndexPair[key] : keyIndexPair.default;
    };

    const handleDropdownKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
        if (disabled) {
            return;
        }

        const key = e.key as EventKeys;
        const index = defineIndex(key);

        if (index !== DEFAULT_FOCUS_INDEX) {
            if (!isOpen) {
                handleDropdownClick();
            }

            setIsKeyboardControl(true);
            return setFocusData(index);
        }

        if (isOpen) {
            if (key === EventKeys.Escape || key === EventKeys.Tab) {
                return closeDropdown();
            }

            if (key === EventKeys.Enter) {
                const currentItem = dropdownItems[focusIndex];
                const id = getItemValue(currentItem, true);

                if (id) {
                    const isSelected = checkIsSelected(id);
                    handleListItemClick(currentItem, isSelected);
                }

                return;
            }
        }

        if (!isOpen) {
            if (key === EventKeys.Enter || key === EventKeys.Space) {
                handleDropdownClick();
                setIsKeyboardControl(true);
            }
        }
    };

    const handleListMouseMove = (): void => {
        if (focusIndex !== DEFAULT_FOCUS_INDEX) {
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

    const dropdownClassName = clsx(
        classes.dropdown,
        {
            [classes.dropdown_noValue]: !viewValue
        }
    );

    return (
        <div className={classes.dropdownWrapper}>
            <div
                role="combobox"
                tabIndex={0}
                aria-disabled={disabled}
                aria-required={required}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls={LIST_CONTROL_ID}
                aria-activedescendant={focusItemId || undefined}
                aria-label={ariaLabel} // if other description absent
                aria-labelledby={ariaLabelledBy} // which element has a label for an input
                aria-describedby={ariaDescribedBy || placeholder} // which element describe input
                aria-valuetext={viewValue || undefined}
                onClick={handleDropdownClick}
                onKeyDown={handleDropdownKeyDown}
                ref={dropdownButtonRef}
                className={dropdownClassName}
            >
                {viewValue || placeholder}
            </div>
            {isOpen && (
                <div className={classes.dropdownListWrapper}>
                    <ul
                        id={LIST_CONTROL_ID}
                        role="listbox"
                        aria-labelledby={ariaLabelledBy}
                        aria-multiselectable={multiselect}
                        onMouseMove={handleListMouseMove}
                        ref={listRef}
                        className={classes.dropdownList}
                    >
                        {/*TODO keyboard navigation*/}
                        {hasEmptyItem && (
                            <li
                                role="option"
                                id='emptyItem'
                                onClick={initSingleUnSelection}
                                aria-selected={false}
                                className={clsx(
                                    classes.dropdownList__item,
                                    classes.dropdown_noValue,
                                    {
                                        [classes.dropdownList__item_focus]: isKeyboardControl && focusIndex === -1
                                    }
                                )}
                            >
                                {translate('reset')}
                            </li>
                        )}
                        {dropdownItems.map((item, index) => {
                            const idValue = getItemValue(item, true);
                            const itemValue = getItemValue(item);
                            const isSelected = !!idValue && checkIsSelected(idValue);

                            const dropdownListItemClass = clsx(
                                classes.dropdownList__item,
                                {
                                    [classes.dropdownList__item_focus]: isKeyboardControl && focusIndex === index
                                }
                            );

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
                                    {multiselect && isSelected && (<span> 🗸</span>)}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
            <input
                value={viewValue || ''}
                ref={ref}
                name={name}
                type="hidden"
            />
        </div>
    );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;