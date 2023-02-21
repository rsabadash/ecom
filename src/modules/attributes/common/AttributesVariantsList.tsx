import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  RowCustomRenderArgs,
  Table,
  TableColumnGeneric,
} from '../../../components/Table';
import { TABLE_ATTRIBUTES_ID } from './constants';
import { AttributeVariant } from './types';
import { routes } from '../../../common/constants/routes';
import { useAttributeVariantsTableColumns } from './hooks';

type AttributesVariantsListProps = {
  variants: AttributeVariant[];
  isDetailList: boolean;
};

export const AttributesVariantsList: FC<AttributesVariantsListProps> = ({
  variants,
  isDetailList,
}) => {
  const columns: TableColumnGeneric<AttributeVariant>[] =
    useAttributeVariantsTableColumns(isDetailList);

  return (
    <Table
      isRowLinkInteractive
      items={variants}
      columns={columns}
      tableRowRenderKey="variantId"
      tableLabeledBy={TABLE_ATTRIBUTES_ID}
      rowCustomRender={({
        row,
        item,
        rowProps,
      }: RowCustomRenderArgs<AttributeVariant>) => (
        <Link
          key={item.variantId}
          to={`${routes.attributes.variantDetailPath}/${item.variantId}`}
          {...rowProps}
        >
          {row}
        </Link>
      )}
    />
  );
};
