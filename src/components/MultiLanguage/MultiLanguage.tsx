import { FC, useMemo, useRef } from 'react';
import { CollapseBuilderBody } from '../Collapse';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../IntlProvider';
import { MultiLanguageProps } from './types';
import { useGridInlineStyles } from '../GridRowBalancer';

export const MultiLanguage: FC<MultiLanguageProps> = ({
  columnIndex,
  collapseBodyId,
  renderVisibleComponent,
  renderHiddenComponent,
}) => {
  const [, , , row4] = useGridInlineStyles(columnIndex);
  const collapseBodyRef = useRef<HTMLDivElement | null>(null);

  const secondaryLanguages = useMemo(
    () =>
      SUPPORTED_LANGUAGES.filter((language) => language !== DEFAULT_LANGUAGE),
    [],
  );

  return (
    <>
      {renderVisibleComponent({
        language: DEFAULT_LANGUAGE,
        collapseBodyRef,
      })}
      <div style={row4}>
        <CollapseBuilderBody id={collapseBodyId} ref={collapseBodyRef}>
          {secondaryLanguages.map((language) => {
            return renderHiddenComponent({ language });
          })}
        </CollapseBuilderBody>
      </div>
    </>
  );
};
