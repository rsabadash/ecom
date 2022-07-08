import { FC } from 'react';
import Label from '../../Label';
import { useTranslation } from '../../IntlProvider';
import { AccessibleLabelProps } from './types';
import classes from './styles/index.module.css';

const AccessibleLabel: FC<AccessibleLabelProps> = (
    {
        label,
        htmlFor,
        isRequired,
        isReadOnly
    }
) => {
    const { translate } = useTranslation();
    const itemLabel = isRequired && !isReadOnly ? `${label} (${translate('required').toLowerCase()})` : label;

    return (
        <Label htmlFor={htmlFor} labelClassName={classes.accessibleLabel}>
            {itemLabel}
        </Label>
    );
};

export default AccessibleLabel;