import { Link } from 'react-router-dom';
import {
  RowCustomRenderProps,
  Table,
  TableColumnGeneric,
} from '../../../components/Table';
import { routes } from '../../../common/constants/routes';
import { useCachedAPI } from '../../../hooks';
import { endpoints } from '../../../common/constants/api';
import { useAttributesTableColumns } from './hooks';
import { Attribute } from './types';
import { TABLE_ATTRIBUTES_ID } from './constants';
import { AttributesListPlaceholder } from './AttributesListPlaceholder';

export const AttributesList = () => {
  const { data = [] } = useCachedAPI<Attribute[]>(
    `${endpoints.attributes.root}`,
  );

  const columns: TableColumnGeneric<Attribute>[] = useAttributesTableColumns();

  return (
    <>
      {data.length > 0 ? (
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
      ) : (
        <AttributesListPlaceholder />
      )}
    </>
  );
};
