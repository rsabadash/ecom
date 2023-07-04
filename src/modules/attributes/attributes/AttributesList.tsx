import { Link } from 'react-router-dom';

import { endpoints } from '../../../common/constants/api';
import { routes } from '../../../common/constants/routes';
import { useCachedAPI } from '../../../common/hooks';
import {
  RowCustomRenderProps,
  Table,
  TableColumnGeneric,
} from '../../../components/Table';
import { TABLE_ATTRIBUTES_ID } from './constants';
import { useAttributesTableColumns } from './hooks';
import { Attribute } from './types';

export const AttributesList = () => {
  const { data = [] } = useCachedAPI<Attribute[]>(
    `${endpoints.attributes.root}`,
  );

  const columns: TableColumnGeneric<Attribute>[] = useAttributesTableColumns();

  return (
    <Table
      items={data}
      columns={columns}
      tableLabeledBy={TABLE_ATTRIBUTES_ID}
      rowCustomRender={({
        row,
        item,
        rowProps,
      }: RowCustomRenderProps<Attribute>) => (
        <Link
          key={item._id}
          to={`${routes.attributes.root}/${item._id}`}
          {...rowProps}
        >
          {row}
        </Link>
      )}
    />
  );
};
