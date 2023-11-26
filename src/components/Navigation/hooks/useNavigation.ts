import {
  KeyboardEvent,
  RefObject,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { EventKeys } from '../../../common/enums/events';
import { useUser } from '../../UserProvider';
import { INDEX_ABSENCE_FOCUS } from '../constants';
import { KeyIndexMap, NavigationItem } from '../types';

type UseNavigationProps = {
  items: NavigationItem[];
};

type UseNavigationReturn = {
  focusIndex: number;
  itemsListRef: RefObject<HTMLUListElement>;
  setActiveIndex: (index: number) => void;
  allowedNavigationItems: NavigationItem[];
  handleNavigationKeyDown: (e: KeyboardEvent<HTMLUListElement>) => void;
  handleNavigationMouseMove: () => void;
};

export const useNavigation = ({
  items,
}: UseNavigationProps): UseNavigationReturn => {
  const { user, hasAllAccesses } = useUser();

  const allowedNavigationItems = useMemo<NavigationItem[]>(() => {
    if (!hasAllAccesses) {
      return items.filter((item) => {
        return user?.roles.some((userRole) => {
          if (item.roles) {
            return item.roles?.includes(userRole);
          }

          return true;
        });
      });
    }

    return items;
  }, [hasAllAccesses, items, user?.roles]);

  const activeIndexRef = useRef<number>(INDEX_ABSENCE_FOCUS);
  const itemsListRef = useRef<null | HTMLUListElement>(null);

  const [focusIndex, setFocusIndex] = useState<number>(activeIndexRef.current);
  const [isKeyboardControl, setIsKeyboardControl] = useState<boolean>(false);

  const getLiElementByIndex = useCallback(
    (index: number): HTMLLIElement | undefined => {
      if (index !== INDEX_ABSENCE_FOCUS && itemsListRef.current) {
        return itemsListRef.current.children[index] as HTMLLIElement;
      }
    },
    [],
  );

  const blurNavItem = (index: number): void => {
    const liElement = getLiElementByIndex(index);

    if (liElement) {
      const linkElement = liElement.children[0] as HTMLAnchorElement;

      linkElement.blur();
    }
  };

  const defineFocusIndexByKey = (key: EventKeys): number | undefined => {
    const itemsLength = allowedNavigationItems.length;
    const currentFocusIndex =
      focusIndex === INDEX_ABSENCE_FOCUS ? activeIndexRef.current : focusIndex;

    const isInitialIndex = currentFocusIndex === INDEX_ABSENCE_FOCUS;

    const keyIndexPair: KeyIndexMap = {
      [EventKeys.Home]: 0,
      [EventKeys.End]: itemsLength - 1,
      [EventKeys.ArrowDown]:
        isInitialIndex || currentFocusIndex === itemsLength - 1
          ? 0
          : currentFocusIndex + 1,
      [EventKeys.ArrowUp]:
        isInitialIndex || currentFocusIndex === 0
          ? itemsLength - 1
          : currentFocusIndex - 1,
      [EventKeys.PageDown]:
        isInitialIndex || currentFocusIndex === itemsLength - 1
          ? 0
          : currentFocusIndex + 1,
      [EventKeys.PageUp]:
        isInitialIndex || currentFocusIndex === 0
          ? itemsLength - 1
          : currentFocusIndex - 1,
      [EventKeys.Tab]: INDEX_ABSENCE_FOCUS,
    };

    if (typeof keyIndexPair[key] !== 'undefined') {
      return keyIndexPair[key];
    }

    return undefined;
  };

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

  const handleNavigationMouseMove = (): void => {
    if (
      isKeyboardControl &&
      activeIndexRef.current !== null &&
      itemsListRef.current
    ) {
      const blurIndex =
        activeIndexRef.current === focusIndex
          ? activeIndexRef.current
          : focusIndex;

      setFocusIndex(activeIndexRef.current);
      blurNavItem(blurIndex);

      setIsKeyboardControl(false);
    }
  };

  const handleNavigationKeyDown = (
    e: KeyboardEvent<HTMLUListElement>,
  ): void => {
    e.stopPropagation();
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
      if (activeIndexRef.current !== null) {
        setFocusIndex(activeIndexRef.current);
      }
    }
  };

  const setActiveIndex = (index: number): void => {
    activeIndexRef.current = index;
  };

  return {
    focusIndex,
    itemsListRef,
    setActiveIndex,
    allowedNavigationItems,
    handleNavigationKeyDown,
    handleNavigationMouseMove,
  };
};
