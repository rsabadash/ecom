import {
  KeyboardEvent,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { INDEX_ABSENCE_FOCUS } from '../constants';
import { EventKeys } from '../../../common/enums/events';
import { KeyIndexMap, UseNavigationReturn } from '../types';
import { getMenuItems } from '../utils';
import { useTranslation } from '../../IntlProvider';

export const useNavigation = (): UseNavigationReturn => {
  const { translate } = useTranslation();

  const menuItems = useMemo(() => getMenuItems(translate), [translate]);

  const initialIndexRef = useRef<number>(INDEX_ABSENCE_FOCUS);
  const itemsListRef = useRef<HTMLUListElement>(null);

  const [focusIndex, setFocusIndex] = useState<number>(initialIndexRef.current);
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
    const itemsLength = menuItems.length;
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
      [EventKeys.Tab]: INDEX_ABSENCE_FOCUS,
    };

    if (typeof keyIndexPair[key] !== 'undefined') {
      return keyIndexPair[key];
    }

    return undefined;
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

  const handleNavigationMouseMove = (): void => {
    if (
      isKeyboardControl &&
      initialIndexRef.current !== null &&
      itemsListRef.current
    ) {
      const blurIndex =
        initialIndexRef.current === focusIndex
          ? initialIndexRef.current
          : focusIndex;

      setFocusIndex(initialIndexRef.current);
      blurNavItem(blurIndex);

      setIsKeyboardControl(false);
    }
  };

  const handleNavigationKeyDown = (
    e: KeyboardEvent<HTMLUListElement>,
  ): void => {
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

  const setInitialIndex = (index: number): void => {
    initialIndexRef.current = index;
  };

  return {
    menuItems,
    focusIndex,
    itemsListRef,
    setInitialIndex,
    handleNavigationKeyDown,
    handleNavigationMouseMove,
  };
};
