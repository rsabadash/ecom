import { Link } from 'react-router-dom';
import { Top, TopButtons, TopHeading } from '../../layouts/Top';
import { useTranslation } from '../../components/IntlProvider';
import { ButtonLink } from '../../components/Button';
import { routes } from '../../common/constants/routes';
import { useCachedAPI } from '../../hooks';
import { endpoint } from '../../common/constants/api';
import { Category } from './types';
import { TABLE_ID } from './constants';
import {
  RowCustomRenderArgs,
  Table,
  TableColumnGeneric,
} from '../../components/Table';
import { useCategoriesTableColumns } from './hooks';

const Categories = () => {
  const { data = [] } = useCachedAPI<Category[]>(`${endpoint.categories}`);

  const { translate } = useTranslation();

  const columns: TableColumnGeneric<Category>[] = useCategoriesTableColumns();

  return (
    <>
      <Top>
        <TopHeading id={TABLE_ID}>{translate('categories')}</TopHeading>
        <TopButtons>
          <ButtonLink variant="primary" to={routes.categories.add}>
            {translate('add')}
          </ButtonLink>
        </TopButtons>
      </Top>
      <Table
        isRowLinkInteractive
        items={data}
        columns={columns}
        tableLabeledBy={TABLE_ID}
        rowCustomRender={({
          row,
          item,
          rowProps,
        }: RowCustomRenderArgs<Category>) => (
          <Link
            key={item._id}
            to={`${routes.categories.root}/${item._id}`}
            {...rowProps}
          >
            {row}
          </Link>
        )}
      />
    </>
  );
};

export default Categories;
