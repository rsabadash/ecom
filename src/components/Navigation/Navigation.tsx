import {KeyboardEvent, useCallback, useLayoutEffect, useMemo, useRef, useState} from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { EventKeys } from '../../common/enums/events';
import { useTranslation } from '../IntlProvider';
import { getMenuItems } from './utils';
import { KeyIndexMap, NavData } from './types';
import { INDEX_ABSENCE_FOCUS } from './constants';
import classes from './styles/index.module.css';

const Navigation = () => {
    const itemsListRef = useRef<HTMLUListElement>(null);

    const initialIndexRef = useRef<number>(INDEX_ABSENCE_FOCUS);

    const [focusIndex, setFocusIndex] = useState<number>(initialIndexRef.current);
    const [isKeyboardControl, setIsKeyboardControl] = useState(false);

    const { translate } = useTranslation();

    const menuItems = useMemo(() => getMenuItems(translate), [translate]);

    const getLiElementByIndex = useCallback((index: number): HTMLLIElement | undefined => {
        if (index !== INDEX_ABSENCE_FOCUS && itemsListRef.current) {
            return itemsListRef.current.children[index] as HTMLLIElement;
        }
    }, []);

    const blurNavItem = (index: number) => {
        const liElement = getLiElementByIndex(index);

        if (liElement) {
            const linkElement = liElement.children[0] as HTMLAnchorElement;

            linkElement.blur();
        }
    };

    useLayoutEffect(() => {
        if (initialIndexRef.current !== null) {
            setFocusIndex(initialIndexRef.current);
        }
    }, []);

    useLayoutEffect(() => {
        if (isKeyboardControl) {
            const liElement = getLiElementByIndex(focusIndex);

            if (liElement) {
                const linkElement = liElement.children[0] as HTMLAnchorElement;

                linkElement.focus();
                liElement.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [focusIndex, getLiElementByIndex, isKeyboardControl]);

    const setInitialIndex = (index: number): void => {
        initialIndexRef.current = index;
    };

    const defineFocusIndexByKey = (key: EventKeys): number | undefined => {
        const itemsLength = menuItems.length;
        const isInitialIndex = focusIndex === INDEX_ABSENCE_FOCUS;

        const keyIndexPair: KeyIndexMap = {
            [EventKeys.Home]: 0,
            [EventKeys.End]: itemsLength - 1,
            [EventKeys.ArrowDown]: isInitialIndex || focusIndex === itemsLength - 1 ? 0 : focusIndex + 1,
            [EventKeys.ArrowUp]: isInitialIndex || focusIndex === 0 ? itemsLength - 1 : focusIndex - 1,
            [EventKeys.PageDown]: isInitialIndex || focusIndex === itemsLength - 1 ? 0 : focusIndex + 1,
            [EventKeys.PageUp]: isInitialIndex || focusIndex === 0 ? itemsLength - 1 : focusIndex - 1,
            [EventKeys.Tab]: INDEX_ABSENCE_FOCUS
        };

        if (typeof keyIndexPair[key] !== 'undefined') {
            return keyIndexPair[key]!;
        }

        return undefined;
    };

    const handleNavigationKeyDown = (e: KeyboardEvent<HTMLUListElement>): void => {
        const key = e.key as EventKeys;
        const index = defineFocusIndexByKey(key);

        if (typeof index === 'undefined') {
            return;
        }

        if (index !== INDEX_ABSENCE_FOCUS) {
            setIsKeyboardControl(true);
            setFocusIndex(index);

            return;
        }

        if (key === EventKeys.Tab) {
            if (initialIndexRef.current !== null) {
                setFocusIndex(initialIndexRef.current);
            }
        }

    };

    const handleNavigationMouseMove = (): void => {
        if (isKeyboardControl && initialIndexRef.current !== null && itemsListRef.current) {
            const blurIndex = initialIndexRef.current === focusIndex ? initialIndexRef.current : focusIndex;

            setFocusIndex(initialIndexRef.current);
            blurNavItem(blurIndex);

            setIsKeyboardControl(false);
        }
    };

    return (
        <nav aria-label="Main">
            <ul
                role="menubar"
                ref={itemsListRef}
                aria-orientation="vertical"
                className={classes.navigation__list}
                onKeyDown={handleNavigationKeyDown}
                onMouseMove={handleNavigationMouseMove}
            >
                {menuItems.map(({ title, path, items }, index) => {
                    const hasSubItems = items && items.length > 0;
                    const tabIndex = focusIndex === index || focusIndex === INDEX_ABSENCE_FOCUS ? 0 : -1;

                    return (
                        <li key={title} className={classes.navigation__item}>
                            <NavLink
                                to={path}
                                role="menuitem"
                                className={({ isActive }: NavData): string | undefined => {
                                    if (isActive) {
                                        setInitialIndex(index);
                                    }

                                    return clsx(
                                        classes.navigation__itemLink,
                                        {
                                            [classes.navigation__itemLink_active]: isActive
                                        }
                                    )
                                }}
                                tabIndex={tabIndex}
                            >
                                {title}
                            </NavLink>
                            {hasSubItems && <div>TODO Subitems</div>}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Navigation;