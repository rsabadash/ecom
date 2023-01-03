import { FC, useCallback, useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { CollapseProps } from './types';
import { Button } from '../Button';
import { ReactComponent as ChevronDownLogo } from '../../assets/icons/ChevronDown.svg';
import { ReactComponent as ChevronUpLogo } from '../../assets/icons/ChevronUp.svg';
import classes from './styles/index.module.css';

const Collapse: FC<CollapseProps> = (
    {
        header,
        body,
        forceExpand,
        isInitiallyExpand = false,
        isToggleHidden,
        onExpandFinished,
        onCollapseFinished,
        ariaLabel,
        ariaControls,
        headerClassName,
        bodyClassName,
    }
) => {
    const [isExpand, setIsExpand] = useState(false);
    const collapseBodyRef = useRef<null | HTMLDivElement>(null);

    const expandFinishedCallback = useCallback(() => {
        onExpandFinished && onExpandFinished();

        if (collapseBodyRef.current) {
            collapseBodyRef.current.style.overflow = 'unset';
            collapseBodyRef.current.removeEventListener('transitionend', expandFinishedCallback);
        }
    }, [onExpandFinished]);

    const collapseFinishedCallback = useCallback(() => {
        onCollapseFinished && onCollapseFinished();

        if (collapseBodyRef.current) {
            collapseBodyRef.current.removeEventListener('transitionend', collapseFinishedCallback);
        }
    }, [onCollapseFinished]);

    const expand = useCallback(() => {
        if (collapseBodyRef.current) {
            collapseBodyRef.current.addEventListener('transitionend', expandFinishedCallback);

            requestAnimationFrame(() => {
                if (collapseBodyRef.current) {
                    collapseBodyRef.current.style.height = `${collapseBodyRef.current.scrollHeight}px`;

                    // make area focusable
                    collapseBodyRef.current.removeAttribute('inert');
                }
            });
        }
    }, [expandFinishedCallback]);

    const collapse = useCallback(() => {
        if (collapseBodyRef.current) {
            collapseBodyRef.current.addEventListener('transitionend', collapseFinishedCallback);

            requestAnimationFrame(() => {
                if (collapseBodyRef.current) {
                    collapseBodyRef.current.style.overflow = 'hidden';
                    collapseBodyRef.current.style.height = '0px';

                    // make area not focusable
                    collapseBodyRef.current.setAttribute('inert', '');

                }
            });
        }
    }, [collapseFinishedCallback]);

    const toggleCollapse = (): void => {
        setIsExpand((prevIsOpen) => !prevIsOpen);
    };

    useLayoutEffect(() => {
        if (isInitiallyExpand) {
            // initialize initial state by use effect to force transition event
            // if set "isInitiallyExpand" directly to the setState it will not trigger transition event
            setIsExpand(true);
        }
    }, [isInitiallyExpand])

    useLayoutEffect(() => {
        if (forceExpand || isExpand) {
            expand();
        } else {
            collapse();
        }
    }, [isExpand, forceExpand, collapse, expand]);

    const headerClassNames = clsx(classes.collapse__header, headerClassName);
    const bodyClassNames = clsx(classes.collapse__body, bodyClassName);
    
    return (
        <div className={classes.collapse}>
            <div className={headerClassNames}>
                <div className={classes.collapse__headerContent}>{header}</div>
                {!isToggleHidden && (
                    <Button
                        onClick={toggleCollapse}
                        ariaLabel={ariaLabel}
                        ariaExpanded={isExpand}
                        ariaControls={ariaControls}
                        className={classes.collapse__switcher}
                    >
                        {isExpand ? <ChevronUpLogo /> : <ChevronDownLogo />}
                    </Button>
                )}
            </div>
            <div id={ariaControls} className={bodyClassNames} ref={collapseBodyRef}>{body}</div>
        </div>
    );
};

export { Collapse };