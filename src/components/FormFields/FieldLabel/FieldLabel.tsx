import { FC } from 'react';
import { Label } from '../../Label';
import { useTranslation } from '../../IntlProvider';
import { FieldLabelProps } from './types';

const FieldLabel: FC<FieldLabelProps> = (
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

export { FieldLabel };