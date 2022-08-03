import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from '../IntlProvider';
import { getMenuItems, isNavLinkActive } from './utils';
import classes from './styles/index.module.css';

const Navigation = () => {
    const { translate } = useTranslation();

    const menuItems = useMemo(() => getMenuItems(translate), [translate]);

    return (
        <nav aria-label="Main">
            <ul role="menubar" className={classes.navigation__list}>
                {menuItems.map(({ title, path, items }) => {
                    const hasSubItems = items && items.length > 0;

                    return (
                        <li
                            role="menuitem"
                            key={title}
                            aria-haspopup={hasSubItems}
                        >
                            <NavLink
                                to={path}
                                className={isNavLinkActive}
                            >
                                {title}
                            </NavLink>
                            {hasSubItems && (
                                <ul role="menu">
                                    {items.map(({ title, path }) => {
                                        return (
                                            <li
                                                role="menuitem"
                                                key={title}
                                            >
                                                <NavLink
                                                    to={path}
                                                    className={isNavLinkActive}
                                                >
                                                    {title}
                                                </NavLink>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Navigation;