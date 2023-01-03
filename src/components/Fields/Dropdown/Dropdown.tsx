import { FC, KeyboardEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { EventKeys } from '../../../common/enums/events';
import { LIST_CONTROL_ID, INDEX_ABSENCE_FOCUS } from './constants';
import { DropdownItemId, DropdownItem, DropdownProps, DropdownValue, KeyIndexMap } from './types';
import { useOutsideElementClick } from '../../../hooks';
import { useTranslation } from '../../IntlProvider';
import classes from './styles/index.module.css';

const Dropdown: FC<DropdownProps> = (
    {
        name,
        value ,
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
        ariaDescribedBy
    }
) => {
    const dropdownItems = customItems || items;
    const hasEmptyItem = !isRequired;
    const focusItemsList = hasEmptyItem ? [undefined, ...dropdownItems] : dropdownItems;
    const hasItems = dropdownItems?.length > 0;
    const useCustomValueGetter = !!itemValueGetter;
    const isActive = !isDisabled && !isReadOnly;
    const isListInitialized = isActive && hasItems;

    const [isOpenInternal, setIsOpenInternal] = useState(() => isOpen || false);
    const [isKeyboardControl, setIsKeyboardControl] = useState(false);

    const { translate } = useTranslation();

    const handleOutsideDropdownClick = (): void => {
        closeDropdown();
    };

    const { setCurrentElement } = useOutsideElementClick({
        dependency: isOpenInternal,
        handleClick: handleOutsideDropdownClick
    });

    const getItemValue = (item?: DropdownValue, getId?: boolean): DropdownItemId | null => {
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
                    acc += getItemValue(dropdownItem, getId)
                } else {
                    acc += `, ${getItemValue(dropdownItem, getId)}`
                }

                return acc;
            }, '');
        }

        return getId ? dropdownItem.id : dropdownItem.value.toString();
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
            const index = focusItemsList.findIndex((item) => getItemValue(item, true) === itemId)

            return index !== -1 ? index : 0;
        }

        return 0;
    };

    const getInitialFocusId = (): DropdownItemId | null => {
        return getItemValue(value, true);
    };

    const [focusIndex, setFocusIndex] = useState<number>(INDEX_ABSENCE_FOCUS);
    const [focusItemId, setFocusItemId] = useState<DropdownItemId | null>(null);

    const listRef = useRef<HTMLUListElement>(null);
    const dropdownButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isListInitialized && isKeyboardControl) {
            setFocusIndex(() => getInitialFocusIndex());
            setFocusItemId(() => getInitialFocusId());
        }
    }, [isListInitialized, isKeyboardControl]);

    useEffect(() => {
        if (dropdownButtonRef.current) {
            setCurrentElement(dropdownButtonRef.current);
        }
    }, [setCurrentElement]);

    useLayoutEffect(() => {
        if (isOpenInternal && focusIndex !== INDEX_ABSENCE_FOCUS) {
            listRef.current?.children[focusIndex].scrollIntoView({ block: 'nearest' });
        }
    }, [isOpenInternal, focusIndex]);

    const openDropdown = (): void => {
        setIsOpenInternal(true)
    };

    const resetDropdownState = () => {
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
            const filteredValue = value.filter((current) => getItemValue(current, true) !== idValue);

            return onChange(filteredValue);
        }

        onChange(null);
    };

    const initSingleUnSelection = (): void => {
        if (!isRequired) {
            onChange(null);
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

    const handleListItemClick = (item: DropdownItem, selected: boolean): void => {
        if (selected) {
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
            [EventKeys.ArrowDown]: isInitialIndex || focusIndex === itemsLength - 1 ? 0 : focusIndex + 1,
            [EventKeys.ArrowUp]: isInitialIndex || focusIndex === 0 ? itemsLength - 1 : focusIndex - 1,
            [EventKeys.PageDown]: isInitialIndex || focusIndex === itemsLength - 1 ? 0 : focusIndex + 1,
            [EventKeys.PageUp]: isInitialIndex || focusIndex === 0 ? itemsLength - 1 : focusIndex - 1,
            [EventKeys.Escape]: INDEX_ABSENCE_FOCUS,
            [EventKeys.Tab]: INDEX_ABSENCE_FOCUS,
            [EventKeys.Enter]: INDEX_ABSENCE_FOCUS,
            [EventKeys.Space]: INDEX_ABSENCE_FOCUS
        };

        if (typeof keyIndexPair[key] !== 'undefined') {
            return keyIndexPair[key]!;
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

    const dropdownClassName = clsx(
        classes.dropdown,
        {
            [classes.dropdown_noValue]: !viewValue,
            [classes.dropdown_readOnly]: isReadOnly,
            [classes.dropdown_invalid]: !isValid
        }
    );

    return (
        <div className={classes.dropdownWrapper}>
            <div
                role="combobox"
                aria-disabled={isDisabled}
                aria-required={isRequired}
                aria-haspopup="listbox"
                aria-expanded={isOpenInternal}
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
                tabIndex={isReadOnly ? -1 : 0}
            >
                {viewValue || placeholderValue}
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
                        className={classes.dropdownList}
                    >
                        {/*TODO keyboard navigation for empty item*/}
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
                                        [classes.dropdownList__item_focus]: isKeyboardControl && focusIndex === 0
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
                            const itemIndex = hasEmptyItem ? index + 1 : index;

                            const dropdownListItemClass = clsx(
                                classes.dropdownList__item,
                                {
                                    [classes.dropdownList__item_focus]: isKeyboardControl && focusIndex === itemIndex
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
                                    {hasMultiselect && isSelected && (<span> 🗸</span>)}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
            <input
                value={viewValue || ''}
                name={name}
                type="hidden"
            />
        </div>
    );
};

export { Dropdown };