import { FC } from 'react';
import { Dropdown } from '../Fields/Dropdown';
import { PaginationLimitProps } from './types';
import { PAGE } from '../../common/constants/filters';
import { useQueryParameters } from '../../hooks';
import { Label } from '../Label';
import { useTranslation } from '../IntlProvider';
import { PAGINATION_LIMIT_NAME } from './constants';
import classes from './styles/paginationLimit.module.css';

export const PaginationLimit: FC<PaginationLimitProps> = ({
  items,
  value,
  onLimitChange,
}) => {
  const { translate } = useTranslation();

  const { deleteQueryParameters } = useQueryParameters();

  const handleLimitChange = (value: number): void => {
    onLimitChange(value);
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
