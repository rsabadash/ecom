import { Top } from '../../layouts/Top';
import { TABLE_ID } from './constants';
import { ButtonLink } from '../../components/Button';
import { routes } from '../../common/constants/routes';
import { useTranslation } from '../../components/IntlProvider';
import { useCachedAPI } from '../../hooks';
import { endpoint } from '../../common/constants/api';
import { Supplier } from './types';
import { RowCustomRenderArgs, Table } from '../../components/Table';
import { Link } from 'react-router-dom';
import { useSuppliersColumns } from './hooks';

const Suppliers = () => {
  const { translate } = useTranslation();
  const { data = [] } = useCachedAPI<Supplier[]>(`${endpoint.suppliers}`);

  const columns = useSuppliersColumns();

  return (
    <>
      <Top headingId={TABLE_ID} headingText={translate('suppliers')}>
        <ButtonLink variant="primary" to={routes.suppliers.add}>
          {translate('suppliers.add')}
        </ButtonLink>
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
