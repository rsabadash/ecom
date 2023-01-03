import { FC } from 'react';
import { SUPPORTED_LANGUAGES } from '../../IntlProvider';
import { MultiLanguageProps } from './types';
import { Collapse } from '../../Collapse';
import { MultiLanguageItem } from './MultilanguageItem';
import classes from './styles/index.module.css';

const MultiLanguage: FC<MultiLanguageProps> = (
    {
        name,
        forceExpand,
        isReadOnly,
        ariaLabel,
        ariaControls,
        renderComponent,
    }
) => {
    const firstLanguage = SUPPORTED_LANGUAGES[0];
    const hiddenLanguages = SUPPORTED_LANGUAGES.slice(1);

    return (
        <div>
            <Collapse
                isInitiallyExpand
                forceExpand={forceExpand}
                ariaLabel={ariaLabel}
                ariaControls={ariaControls}
                isToggleHidden={isReadOnly}
                header={<MultiLanguageItem name={name} language={firstLanguage} renderComponent={renderComponent} />}
                body={
                    <div className={classes.multiLanguage__hiddenWrapper}>
                        {hiddenLanguages.map((l) => (
                            <MultiLanguageItem key={l} name={name} language={l} renderComponent={renderComponent} />)
                        )}
                    </div>
                }
            />
        </div>
    );
};

export { MultiLanguage };