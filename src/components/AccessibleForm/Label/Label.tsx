import { FC } from 'react';
import Label from '../../Label';
import { useTranslation } from '../../IntlProvider';
import { AccessibleLabelProps } from './types';
import classes from './styles/index.module.css';

const AccessibleLabel: FC<AccessibleLabelProps> = (
    {
        label,
        htmlFor,
        required
    }
) => {
    const { translate } = useTranslation();
    const itemLabel = required ? `${label} (${translate('required')})` : label;

    return (
        <Label htmlFor={htmlFor} labelClassName={classes.accessibleLabel}>
            {itemLabel}
        </Label>
    );
};

export default AccessibleLabel;