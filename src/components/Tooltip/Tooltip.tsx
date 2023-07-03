import {
  FC,
  KeyboardEvent,
  MouseEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import { Position, TooltipProps } from './types';
import {
  DEFAULT_TOOLTIP_POSITION,
  OPPOSITE_POSITION,
  TOOLTIP_POSITION,
  CONTENT_DIMENSION,
} from './constants';
import { useOutsideElementClick } from '../../common/hooks';
import { EventKeys } from '../../common/enums/events';
import { debounce } from '../../common/utils';
import classes from './styles/index.module.css';

const root = document.getElementById('root');

const TOOLTIP_ID = new Date().getTime().toString();

export const Tooltip: FC<PropsWithChildren<TooltipProps>> = ({
  children,
  position = DEFAULT_TOOLTIP_POSITION,
  content,
  contentId,
  isDisabled,
  isClickable,
  isObserveResize,
  isChildrenFocusable,
  tooltipClassName,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [positionState, setPositionState] = useState<Position | undefined>(
    undefined,
  );

  const tooltipRef = useRef<null | HTMLDivElement>(null);
  const tooltipContentRef = useRef<null | HTMLDivElement>(null);

  const isTooltipDisabled = !content || isDisabled;

  const closeTooltip = useCallback((): void => {
    setIsOpen(false);
    setPositionState(undefined);
  }, []);

  useOutsideElementClick({
    ref: tooltipContentRef,
    dependency: isOpen,
    listenKeyboard: true,
    listenInteraction: !isChildrenFocusable,
    handleClick: closeTooltip,
  });

  const getPositionFormulaInitiator = useCallback((): Record<
    Position,
    () => number
  > => {
    const tooltipRect = tooltipRef.current?.getBoundingClientRect();

    return {
      [TOOLTIP_POSITION.END]: () =>
        window.innerWidth - (tooltipRect?.right || 0),
      [TOOLTIP_POSITION.START]: () => tooltipRect?.left || 0,
      [TOOLTIP_POSITION.TOP]: () => tooltipRect?.top || 0,
      [TOOLTIP_POSITION.BOTTOM]: () =>
        window.innerHeight - (tooltipRect?.bottom || 0),
    };
  }, []);

  const defineTooltipContentPosition = useCallback((): void => {
    let tooltipPosition = position;

    const tooltipContentRect =
      tooltipContentRef.current?.getBoundingClientRect();

    if (tooltipContentRect) {
      const formulaInitiator = getPositionFormulaInitiator();
      const distanceToViewportEdge = formulaInitiator[position]
        ? formulaInitiator[position]()
        : 0;
      const tooltipContentDimension = CONTENT_DIMENSION[tooltipPosition];
      const tooltipContentDimensionSize =
        tooltipContentRect[tooltipContentDimension];

      if (distanceToViewportEdge < tooltipContentDimensionSize) {
        tooltipPosition = OPPOSITE_POSITION[position];
      }
    }

    setPositionState(tooltipPosition);
  }, [getPositionFormulaInitiator, position]);

  useEffect(() => {
    if (isOpen) {
      defineTooltipContentPosition();
    }
  }, [defineTooltipContentPosition, isOpen]);

  const onResize = useMemo(
    () => debounce(defineTooltipContentPosition, 500),
    [defineTooltipContentPosition],
  );

  useEffect(() => {
    if (root && isOpen && isObserveResize && !isTooltipDisabled) {
      const observer = new ResizeObserver(onResize);

      observer.observe(root);

      return () => {
        observer.disconnect();
      };
    }
  }, [isTooltipDisabled, isObserveResize, isOpen, onResize]);

  const toggle = useCallback((event: MouseEvent | KeyboardEvent): void => {
    event.stopPropagation();
    setIsOpen((prevState) => !prevState);
  }, []);

  const handleOnMouseEnter = (): void => {
    if (!isClickable && !isTooltipDisabled) {
      setIsOpen(true);
    }
  };

  const handleOnMouseLeave = (): void => {
    if (!isClickable && !isTooltipDisabled) {
      closeTooltip();
    }
  };

  const handleOnFocus = (): void => {
    handleOnMouseEnter();
  };

  const handleOnBlur = (): void => {
    handleOnMouseLeave();
  };

  const handleOnKeyDown = (event: KeyboardEvent): void => {
    if (!isTooltipDisabled) {
      const key = event.key as EventKeys;

      if (isClickable && key === EventKeys.Enter) {
        return toggle(event);
      }
    }
  };

  const handleOnClick = (event: MouseEvent): void => {
    if (!isTooltipDisabled) {
      toggle(event);
    }
  };

  useEffect(() => {
    // For cases when content can disappear on the fly (an error is gone after entering a value)
    if (!content) {
      closeTooltip();
    }
  }, [closeTooltip, content]);

  const tooltipClassNames = clsx(classes.tooltip, tooltipClassName, {
    [classes.tooltip_open]: isOpen,
  });

  return (
    <div
      id={TOOLTIP_ID}
      ref={tooltipRef}
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
      onClick={handleOnClick}
      onKeyDown={handleOnKeyDown}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      className={tooltipClassNames}
      tabIndex={isChildrenFocusable ? -1 : 0}
    >
      {children}
      {isOpen && (
        <div
          id={contentId}
          ref={tooltipContentRef}
          className={clsx(
            classes.tooltip__content,
            classes[`tooltip__content_${positionState}`],
          )}
          aria-live="polite"
          aria-describedby={TOOLTIP_ID}
        >
          {content}
        </div>
      )}
    </div>
  );
};
