import {
  FC,
  KeyboardEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import { MenuProps, KeyIndexMap, Position, Alignment } from './types';
import { useOutsideElementClick } from '../../hooks';
import {
  INDEX_ABSENCE_FOCUS,
  DEFAULT_MENU_POSITION,
  MENU_POSITION,
  MENU_ALIGNMENT,
  OPPOSITE_POSITION,
  OPPOSITE_ALIGNMENT,
  CONTENT_POSITION_DIMENSION,
  CONTENT_ALIGNMENT_DIMENSION,
} from './constants';
import { EventKeys } from '../../common/enums/events';
import classes from './styles/index.module.css';
import { debounce } from '../../utils';

const root = document.getElementById('root');

const LIST_CONTROL_ID = Date.now().toString();

export const Menu: FC<PropsWithChildren<MenuProps>> = ({
  items,
  children,
  position = DEFAULT_MENU_POSITION,
  alignment,
  isDisabled,
  isObserveResize,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [focusIndex, setFocusIndex] = useState<number>(INDEX_ABSENCE_FOCUS);
  const [isKeyboardControl, setIsKeyboardControl] = useState(false);
  const [positionState, setPositionState] = useState<Position | undefined>(
    undefined,
  );
  const [alignmentState, setAlignmentState] = useState<Alignment | undefined>(
    undefined,
  );

  const menuButtonRef = useRef<HTMLDivElement>(null);
  const menuListRef = useRef<HTMLUListElement>(null);

  const getPositionFormulaInitiator = useCallback(
    (elementPosition: Position): number => {
      const menuRect = menuButtonRef.current?.getBoundingClientRect();

      const formulas: Record<Position, () => number> = {
        [MENU_POSITION.END]: () => window.innerWidth - (menuRect?.right || 0),
        [MENU_POSITION.START]: () => menuRect?.left || 0,
        [MENU_POSITION.TOP]: () => menuRect?.top || 0,
        [MENU_POSITION.BOTTOM]: () =>
          window.innerHeight - (menuRect?.bottom || 0),
      };

      return formulas[elementPosition]();
    },
    [],
  );

  const getAlignmentFormulaInitiator = useCallback(
    (elementPosition: Position, elementAlignment: Alignment): number => {
      const { PUSH, PULL } = MENU_ALIGNMENT;

      const formulas: Record<Position, Record<Alignment, () => number>> = {
        [MENU_POSITION.END]: {
          [PUSH]: () => getPositionFormulaInitiator(MENU_POSITION.BOTTOM),
          [PULL]: () => getPositionFormulaInitiator(MENU_POSITION.TOP),
        },
        [MENU_POSITION.START]: {
          [PUSH]: () => getPositionFormulaInitiator(MENU_POSITION.BOTTOM),
          [PULL]: () => getPositionFormulaInitiator(MENU_POSITION.TOP),
        },
        [MENU_POSITION.TOP]: {
          [PUSH]: () => getPositionFormulaInitiator(MENU_POSITION.END),
          [PULL]: () => getPositionFormulaInitiator(MENU_POSITION.START),
        },
        [MENU_POSITION.BOTTOM]: {
          [PUSH]: () => getPositionFormulaInitiator(MENU_POSITION.END),
          [PULL]: () => getPositionFormulaInitiator(MENU_POSITION.START),
        },
      };

      return formulas[elementPosition][elementAlignment]();
    },
    [getPositionFormulaInitiator],
  );

  const getPosition = useCallback(
    (domRect: DOMRect): Position => {
      let menuPosition = position;

      const distanceToViewportEdge = getPositionFormulaInitiator(menuPosition);
      const menuListDimension = CONTENT_POSITION_DIMENSION[menuPosition];
      const menuListDimensionSize = domRect[menuListDimension];

      if (distanceToViewportEdge < menuListDimensionSize) {
        menuPosition = OPPOSITE_POSITION[position];
      }

      return menuPosition;
    },
    [getPositionFormulaInitiator, position],
  );

  const getAlignment = useCallback(
    (domRect: DOMRect, elementPosition: Position): Alignment | undefined => {
      let menuAlignment = alignment;

      if (menuAlignment) {
        const distanceToViewportEdge = getAlignmentFormulaInitiator(
          elementPosition,
          menuAlignment,
        );
        const menuListDimension = CONTENT_ALIGNMENT_DIMENSION[elementPosition];
        const menuListDimensionSize = domRect[menuListDimension];

        if (distanceToViewportEdge < menuListDimensionSize) {
          menuAlignment = OPPOSITE_ALIGNMENT[menuAlignment];
        }
      }

      return menuAlignment;
    },
    [alignment, getAlignmentFormulaInitiator],
  );

  const defineMenuListPosition = useCallback((): void => {
    const menuListRect = menuListRef.current?.getBoundingClientRect();

    if (menuListRect) {
      const menuPosition = getPosition(menuListRect);
      const menuAlignment = getAlignment(menuListRect, menuPosition);

      setPositionState(menuPosition);
      setAlignmentState(menuAlignment);
    }
  }, [getAlignment, getPosition]);

  useEffect(() => {
    if (isOpen) {
      defineMenuListPosition();
    }
  }, [defineMenuListPosition, isOpen]);

  const onResize = useMemo(
    () => debounce(defineMenuListPosition, 500),
    [defineMenuListPosition],
  );

  useEffect(() => {
    if (root && isOpen && isObserveResize && !isDisabled) {
      const observer = new ResizeObserver(onResize);

      observer.observe(root);

      return () => {
        observer.disconnect();
      };
    }
  }, [isObserveResize, isDisabled, isOpen, onResize]);

  const closeMenu = useCallback((): void => {
    setIsOpen(false);
  }, []);

  const openMenu = (): void => {
    setIsOpen(true);
  };

  const { setCurrentElement } = useOutsideElementClick({
    dependency: isOpen,
    handleClick: closeMenu,
  });

  useEffect(() => {
    setCurrentElement(menuButtonRef.current);
  }, [setCurrentElement]);

  useLayoutEffect(() => {
    if (isOpen && focusIndex !== INDEX_ABSENCE_FOCUS) {
      menuListRef.current?.children[focusIndex].scrollIntoView({
        block: 'nearest',
      });
    }
  }, [isOpen, focusIndex]);

  const toggleMenuList = (): void => {
    setIsOpen((prevState) => !prevState);
  };

  const handleMenuClick = (): void => {
    if (isDisabled) {
      return;
    }

    toggleMenuList();
  };

  const defineFocusIndexByKey = (key: EventKeys): number | undefined => {
    const itemsLength = items.length;
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
    if (!isOpen) {
      openMenu();
    }

    if (!isKeyboardControl) {
      setIsKeyboardControl(true);
    }

    setFocusIndex(index);
  };

  const keyboardItemSelection = () => {
    const currentItem = items[focusIndex];

    currentItem.action();
    closeMenu();
  };

  const keyboardDropdownOpen = (): void => {
    openMenu();
    setIsKeyboardControl(true);
  };

  const handleMenuKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (isDisabled) {
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

    if (isOpen) {
      if (key === EventKeys.Escape || key === EventKeys.Tab) {
        return closeMenu();
      }

      if (key === EventKeys.Enter || key === EventKeys.Space) {
        return keyboardItemSelection();
      }
    }

    if (!isOpen) {
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

  const menuWrapperClassNames = clsx(classes.menuWrapper, {
    [classes.menuWrapper_open]: isOpen,
  });

  return (
    <div className={menuWrapperClassNames}>
      <div
        role="button"
        aria-haspopup={true}
        aria-expanded={isOpen}
        aria-controls={LIST_CONTROL_ID}
        // aria-activedescendant={focusItemId || undefined}
        onClick={handleMenuClick}
        onKeyDown={handleMenuKeyDown}
        ref={menuButtonRef}
        tabIndex={isDisabled ? -1 : 0}
        className={classes.menuButton}
      >
        {children}
      </div>
      {isOpen && (
        <div
          className={clsx(
            classes.menuListWrapper,
            classes[`menuListWrapper_${positionState}`],
            {
              [classes[`menuListWrapper_${positionState}_${alignmentState}`]]:
                !!alignmentState,
            },
          )}
        >
          <ul
            id={LIST_CONTROL_ID}
            role="menu"
            onMouseMove={handleListMouseMove}
            ref={menuListRef}
            className={classes.menuList}
          >
            {items.map(({ id, Component, action }, index) => {
              const menuListItemClass = clsx(classes.menuList__item, {
                [classes.menuList__item_focus]:
                  isKeyboardControl && focusIndex === index,
              });

              return (
                <li
                  key={id}
                  onClick={action}
                  role="menuitem"
                  className={menuListItemClass}
                >
                  <Component />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
