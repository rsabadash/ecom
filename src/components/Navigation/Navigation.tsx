import {useMemo} from 'react';
import {NavLink} from 'react-router-dom';
import clsx from 'clsx';
import {useTranslation} from '../IntlProvider';
import {getMenuItems} from './utils';
import {NavData} from './types';
import {INDEX_ABSENCE_FOCUS} from './constants';
import classes from './styles/index.module.css';
import {useNavigation} from "./hooks/useNavigation";

const Navigation = () => {
    const {translate} = useTranslation();

    const menuItems = useMemo(() => getMenuItems(translate), [translate]);

    const {
        focusIndex,
        itemsListRef,
        setInitialIndex,
        handleNavigationKeyDown,
        handleNavigationMouseMove
    } = useNavigation(menuItems);

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
                {menuItems.map(({title, path, items}, index) => {
                    const hasSubItems = items && items.length > 0;
                    const tabIndex = focusIndex === index || focusIndex === INDEX_ABSENCE_FOCUS ? 0 : -1;

                    return (
                        <li key={title} className={classes.navigation__item}>
                            <NavLink
                                to={path}
                                role="menuitem"
                                className={({isActive}: NavData): string | undefined => {
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

export {Navigation};