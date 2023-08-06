import { FC } from 'react';

import { LIMIT, PAGE } from '../../common/constants/filters';
import { useQueryParameters } from '../../common/hooks';
import { Dropdown } from '../Fields/Dropdown';
import { useTranslation } from '../IntlProvider';
import { Label } from '../Label';
import { PAGINATION_LIMIT_NAME } from './constants';
import { Limit, PaginationLimitProps } from './types';

import classes from './styles/paginationLimit.module.css';

export const PaginationLimit: FC<PaginationLimitProps> = ({
  items,
  value,
  onLimitChange,
}) => {
  const { translate } = useTranslation();

  const { deleteQueryParameters, addQueryParameters } = useQueryParameters();

  const handleLimitChange = (value: Limit): void => {
    onLimitChange(value);
    addQueryParameters({ [LIMIT]: value.toString() });
    deleteQueryParameters(PAGE);
  };

  return (
    <div className={classes.paginationLimit}>
      <Label htmlFor={PAGINATION_LIMIT_NAME}>
        {translate('pagination.limit')}
      </Label>
      <Dropdown
        isRequired
        name={PAGINATION_LIMIT_NAME}
        size="xs"
        items={items}
        value={value}
        onChange={handleLimitChange}
      />
    </div>
  );
};
