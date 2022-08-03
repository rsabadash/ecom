import { FC, useCallback, useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { CollapseProps } from './types';
import Button from '../Button';
import { ReactComponent as ChevronDownLogo } from '../../assets/icons/ChevronDown.svg';
import { ReactComponent as ChevronUpLogo } from '../../assets/icons/ChevronUp.svg';
import classes from './styles/index.module.css';

const Collapse: FC<CollapseProps> = (
    {
        header,
        body,
        forceOpen,
        isInitiallyOpen = false,
        isToggleHidden,
        onOpenFinished,
        onCloseFinished,
        headerClassName,
        bodyClassName,
    }
) => {
    const [isOpen, setIsOpen] = useState(() => isInitiallyOpen);
    const collapseBodyRef = useRef<null | HTMLDivElement>(null);

    const openFinishedCallback = useCallback(() => {
        onOpenFinished && onOpenFinished();

        if (collapseBodyRef.current) {
            collapseBodyRef.current.style.overflow = 'unset';
            collapseBodyRef.current.removeEventListener('transitionend', openFinishedCallback);
        }
    }, [onOpenFinished]);

    const closeFinishedCallback = useCallback(() => {
        onCloseFinished && onCloseFinished();

        if (collapseBodyRef.current) {
            collapseBodyRef.current.removeEventListener('transitionend', closeFinishedCallback);
        }
    }, [onCloseFinished]);

    const expand = useCallback(() => {
        if (collapseBodyRef.current) {
            collapseBodyRef.current.addEventListener('transitionend', openFinishedCallback);

            requestAnimationFrame(() => {
                if (collapseBodyRef.current) {
                    collapseBodyRef.current.style.height = `${collapseBodyRef.current.scrollHeight}px`;

                    // make area focusable
                    collapseBodyRef.current.removeAttribute('inert');
                }
            });
        }
    }, [openFinishedCallback]);

    const collapse = useCallback(() => {
        if (collapseBodyRef.current) {
            collapseBodyRef.current.addEventListener('transitionend', closeFinishedCallback);

            requestAnimationFrame(() => {
                if (collapseBodyRef.current) {
                    collapseBodyRef.current.style.overflow = 'hidden';
                    collapseBodyRef.current.style.height = '0px';

                    // make area not focusable
                    collapseBodyRef.current.setAttribute('inert', '');

                }
            });
        }
    }, [closeFinishedCallback]);

    const toggleCollapse = () => {
        if (isOpen) {
            collapse();
        } else {
            expand();
        }

        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    useLayoutEffect(() => {
        if (!isInitiallyOpen) {
            collapse();
        } else {
            expand();
        }
    }, [collapse, expand]);

    useLayoutEffect(() => {
        if (forceOpen) {
            expand();
        } else {
            collapse();
        }
    }, [forceOpen, collapse, expand]);

    const headerClassNames = clsx(classes.collapse__header, headerClassName);
    const bodyClassNames = clsx(classes.collapse__body, bodyClassName);
    
    return (
        <div className={classes.collapse}>
            <div className={headerClassNames}>
                <div className={classes.collapse__headerContent}>{header}</div>
                {!isToggleHidden && (
                    <Button className={classes.collapse__switcher} onClick={toggleCollapse}>
                        {isOpen ? <ChevronUpLogo /> : <ChevronDownLogo />}
                    </Button>
                )}
            </div>
            <div className={bodyClassNames} ref={collapseBodyRef}>{body}</div>
        </div>
    );
};

export default Collapse;