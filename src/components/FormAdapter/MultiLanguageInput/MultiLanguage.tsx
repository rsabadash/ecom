import { FC, PropsWithChildren, Children, cloneElement, useState } from 'react';
import clsx from 'clsx';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, Language } from '../../IntlProvider';
import Dropdown, { DropdownValue } from '../../Form/Dropdown';
import classes from './styles/index.module.css';

const MultiLanguageInput: FC<PropsWithChildren<{}>> = (
    {
        children
    }
) => {
    const [translation, setTranslation] = useState<Language>(DEFAULT_LANGUAGE);
    const { isReadOnly = false } = children && typeof children === 'object' && 'props' in children ? children.props : {};

    const onTranslationChange = (value: DropdownValue): void => {
        if (value && typeof value === 'string') {
            const typedValue = value as Language;

            setTranslation(typedValue);
        }
    };

    const component = Children.only(children); // check if "children" only one

    return (
        <div className={classes.multiLanguageWrapper}>
            <div className={clsx(classes.multiLanguage, classes[`multiLanguage_active__${translation}`])}>
                {SUPPORTED_LANGUAGES.map((language) => {
                    if (component && typeof component === 'object' && 'props' in component) {
                        const languagePostfixName = `${component.props.name}.${language}`;

                        return (
                            <div
                                className={clsx(classes.multiLanguage__item, classes[`multiLanguage__item_${language}`])}
                            >
                                {cloneElement(component, { ...component.props, name: languagePostfixName })}
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
            {!isReadOnly && (
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

export default MultiLanguageInput;