import { FC, useMemo, useRef } from 'react';
import { CollapseBuilderBody, CollapseController } from '../Collapse';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../IntlProvider';
import { MultiLanguageProps } from './types';
import { useGridInlineStyles } from '../GridRowBalancer';

export const MultiLanguage: FC<MultiLanguageProps> = ({
  columnIndex,
  collapseBodyId,
  renderVisibleComponent,
  renderHiddenComponent,
  ariaLabel,
  ariaControls,
  forceExpand,
  isInitiallyExpand,
}) => {
  const [, , , row4] = useGridInlineStyles(columnIndex);
  const collapseBodyRef = useRef<null | HTMLDivElement>(null);

  const secondaryLanguages = useMemo(
    () =>
      SUPPORTED_LANGUAGES.filter((language) => language !== DEFAULT_LANGUAGE),
    [],
  );

  return (
    <CollapseController
      ariaLabel={ariaLabel}
      ariaControls={ariaControls}
      forceExpand={forceExpand}
      isInitiallyExpand={isInitiallyExpand}
      collapseBodyRef={collapseBodyRef}
    >
      {renderVisibleComponent({
        language: DEFAULT_LANGUAGE,
      })}
      <div style={row4}>
        <CollapseBuilderBody id={collapseBodyId} ref={collapseBodyRef}>
          {secondaryLanguages.map((language) => {
            return renderHiddenComponent({ language });
          })}
        </CollapseBuilderBody>
      </div>
    </CollapseController>
  );
};
