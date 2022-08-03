import { FC } from 'react';
import Label from '../../Label';
import { useTranslation } from '../../IntlProvider';
import { AccessibleLabelProps } from './types';

const AccessibleLabel: FC<AccessibleLabelProps> = (
    {
        label,
        htmlFor,
        isReadOnly,
        isRequired,
        labelClassName
    }
) => {
    const { translate } = useTranslation();
    const itemLabel = isRequired && !isReadOnly ? `${label} (${translate('required').toLowerCase()})` : label;

    return (
        <Label htmlFor={htmlFor} labelClassName={labelClassName}>
            {itemLabel}
        </Label>
    );
};

export default AccessibleLabel;