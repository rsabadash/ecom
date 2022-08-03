import { ReactNode } from 'react';

export type CollapseProps = {
    header: ReactNode;
    body: ReactNode;
    forceOpen?: boolean;
    isInitiallyOpen?: boolean;
    isToggleHidden?: boolean;
    onOpenFinished?: () => void;
    onCloseFinished?: () => void;
    headerClassName?: string;
    bodyClassName?: string;
};