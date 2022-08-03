import { FC } from 'react';
import { SUPPORTED_LANGUAGES } from '../../IntlProvider';
import { MultiLanguageProps } from './types';
import Collapse from '../../Collapse';
import { MultiLanguageItem } from './MultilanguageItem';
import classes from './styles/index2.module.css';

const MultiLanguage: FC<MultiLanguageProps> = (
    {
        name,
        forceOpen,
        isReadOnly,
        renderComponent,
    }
) => {
    const firstLanguage = SUPPORTED_LANGUAGES[0];
    const hiddenLanguages = SUPPORTED_LANGUAGES.slice(1);

    return (
        <div className={classes.multiLanguage}>
            <Collapse
                forceOpen={forceOpen}
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

export default MultiLanguage;