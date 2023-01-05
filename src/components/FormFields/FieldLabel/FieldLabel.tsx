import { FC } from 'react';
import clsx from 'clsx';
import { Label } from '../../Label';
import { useTranslation } from '../../IntlProvider';
import { FieldLabelProps } from './types';
import classes from './styles/index.module.css';

const FieldLabel: FC<FieldLabelProps> = (
    {
        label,
        htmlFor,
        isValid,
        isReadOnly,
        isRequired
    }
) => {
    const { translate } = useTranslation();
    const itemLabel = isRequired && !isReadOnly ? `${label} (${translate('required').toLowerCase()})` : label;

    const fieldLabelClassNames = clsx(
        classes.fieldLabel,
        {
            [classes.fieldLabel_error]: !isValid
        }
    );

    return (
        <Label htmlFor={htmlFor} labelClassName={fieldLabelClassNames}>
            {itemLabel}
        </Label>
    );
};

export { FieldLabel };