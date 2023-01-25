import { Link } from 'react-router-dom';
import { Top, TopButtons, TopHeading } from '../../layouts/Top';
import { TABLE_ID } from './constants';
import { ButtonLink } from '../../components/Button';
import { routes } from '../../common/constants/routes';
import { useTranslation } from '../../components/IntlProvider';
import { useCachedAPI } from '../../hooks';
import { endpoint } from '../../common/constants/api';
import { Supplier } from './types';
import {
  RowCustomRenderArgs,
  Table,
  TableColumnGeneric,
} from '../../components/Table';
import { useSuppliersTableColumns } from './hooks';

const Suppliers = () => {
  const { data = [] } = useCachedAPI<Supplier[]>(`${endpoint.suppliers}`);

  const { translate } = useTranslation();

  const columns: TableColumnGeneric<Supplier>[] = useSuppliersTableColumns();

  return (
    <>
      <Top>
        <TopHeading id={TABLE_ID}>{translate('suppliers')}</TopHeading>
        <TopButtons>
          <ButtonLink variant="primary" to={routes.suppliers.add}>
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
        }: RowCustomRenderArgs<Supplier>) => (
          <Link
            key={item._id}
            to={`${routes.suppliers.root}/${item._id}`}
            {...rowProps}
          >
            {row}
          </Link>
        )}
      />
    </>
  );
};

export default Suppliers;
