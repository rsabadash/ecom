import { useState } from 'react';
import { Path } from 'react-hook-form';
import clsx from 'clsx';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, Language } from '../../IntlProvider';
import InputAdapter from '../Input';
import Dropdown, { DropdownValue } from '../../Form/Dropdown';
import { MultiLanguageInputProps } from './types';
import classes from './styles/index.module.css';

const MultiLanguageInput = <FormValues,>(
    {
        name,
        type,
        placeholder,
        isRequired,
        isDisabled,
        valueGetter,
        isReadOnly,
        label,
        control,
    }: MultiLanguageInputProps<FormValues>
) => {
    const [translation, setTranslation] = useState<Language>(DEFAULT_LANGUAGE);

    const onTranslationChange = (value: DropdownValue): void => {
        if (value && typeof value === 'string') {
            const typedValue = value as Language;

            setTranslation(typedValue);
        }
    };

    return (
        <div className={classes.multiLanguageWrapper}>
            <div className={clsx(classes.multiLanguage, classes[`multiLanguage_active__${translation}`])}>
                {SUPPORTED_LANGUAGES.map((language) => {
                    const languagePostfixName = `${name}.${language}` as Path<FormValues>;

                    return (
                        <div
                            key={language}
                            className={clsx(classes.multiLanguage__item, classes[`multiLanguage__item_${language}`])}
                        >
                            <InputAdapter
                                name={languagePostfixName}
                                type={type}
                                placeholder={placeholder}
                                isRequired={isRequired}
                                isDisabled={isDisabled}
                                valueGetter={valueGetter}
                                isReadOnly={isReadOnly}
                                label={label}
                                control={control}
                            />
                        </div>
                    );
                })}
            </div>
            {!isReadOnly && SUPPORTED_LANGUAGES.length > 1 && (
                <div className={classes.multiLanguage__dropdown}>
                    <Dropdown
                        isRequired
                        value={translation}
                        name="translation"
                        items={SUPPORTED_LANGUAGES}
                        onChange={onTranslationChange}
                    />
                </div>
            )}
        </div>
    );
};

export { MultiLanguageInput };