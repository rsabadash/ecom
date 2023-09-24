import { Link } from 'react-router-dom';

import { endpoints } from '../../../../common/constants/api';
import { routes } from '../../../../common/constants/routes';
import { useCachedPaginationAPI } from '../../../../common/hooks';
import { usePaginationLimit } from '../../../../components/Pagination/hooks';
import {
  RowCustomRenderProps,
  Table,
  TableColumnGeneric,
  TablePagination,
} from '../../../../components/Table';
import { TABLE_ATTRIBUTES_ID } from './constants';
import { Attribute } from '../common/types';
import { AttributesListPlaceholder } from './AttributesListPlaceholder';
import { useAttributesTableColumns } from './hooks';

export const AttributesList = () => {
  const { limitValue, setLimitValue } = usePaginationLimit();

  const { list, total } = useCachedPaginationAPI<Attribute>({
    url: endpoints.attributes.root,
    limit: limitValue,
  });

  const columns: TableColumnGeneric<Attribute>[] = useAttributesTableColumns();

  return (
    <>
      {list.length > 0 ? (
        <Table
          items={list}
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
          bottomPanelNode={
            <TablePagination
              total={total}
              limitValue={limitValue}
              setLimitValue={setLimitValue}
            />
          }
        />
      ) : (
        // TODO if total > 0 we have to show 404 not the component bellow
        <AttributesListPlaceholder />
      )}
    </>
  );
};
