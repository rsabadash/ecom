import { FC } from 'react';
import clsx from 'clsx';
import { MultiLanguageItemProps } from './types';
import classes from './styles/index.module.css';

const MultiLanguageItem: FC<MultiLanguageItemProps> = (
    {
        name,
        language,
        renderComponent
    }
) => {
    return (
        <div className={clsx(classes.multiLanguage__item, classes[`multiLanguage__item_${language}`])}>
            {renderComponent({ languagePostfixName: `${name}.${language}`, language })}
        </div>
    );
};

export { MultiLanguageItem };