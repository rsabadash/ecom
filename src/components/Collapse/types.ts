import { ReactNode } from 'react';

export type CollapseProps = {
    header: ReactNode;
    body: ReactNode;
    forceExpand?: boolean;
    isInitiallyExpand?: boolean;
    isToggleHidden?: boolean;
    onExpandFinished?: () => void;
    onCollapseFinished?: () => void;
    ariaLabel: string;
    ariaControls: string;
    headerClassName?: string;
    bodyClassName?: string;
};