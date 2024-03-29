import { FC, useCallback, useState } from 'react';
import { useFieldArray } from 'react-hook-form';

import { useTranslation } from '../../../components/IntlProvider';
import { Modal } from '../../../components/Modal';
import { Table, TableColumnGeneric } from '../../../components/Table';
import {
  defaultProductValue,
  MAX_PRODUCTS_IN_SUPPLY,
  MIN_PRODUCTS_IN_SUPPLY,
  supplyFormArrayFields,
  TABLE_SUPPLY_PRODUCTS_ID,
} from './constants';
import { useSupplyProductsTableColumns } from './hooks';
import { SupplyProductSummary } from './SupplyProductSummary';
import { SupplyProductListColumn, SupplyProductsListProps } from './types';

import classes from './styles/index.module.css';

export const SupplyProductsList: FC<SupplyProductsListProps> = ({
  control,
  setValue,
  getValues,
}) => {
  const [isRemoveDisabledOpen, setIsRemoveDisabledOpen] =
    useState<boolean>(false);

  const { translate } = useTranslation();

  const { fields, append, remove } = useFieldArray({
    control,
    name: supplyFormArrayFields.products,
  });

  const hasMoreThanOneFiled = fields.length > MIN_PRODUCTS_IN_SUPPLY;
  const isMaxProductsNumberReached = fields.length >= MAX_PRODUCTS_IN_SUPPLY;

  const handleRemoveProduct = useCallback(
    (index: number): void => {
      if (hasMoreThanOneFiled) {
        remove(index);
      } else {
        setIsRemoveDisabledOpen(true);
      }
    },
    [hasMoreThanOneFiled, remove],
  );

  const columns: TableColumnGeneric<SupplyProductListColumn>[] =
    useSupplyProductsTableColumns({
      control,
      setValue,
      getValues,
      onRemoveProduct: handleRemoveProduct,
      cellCommonName: supplyFormArrayFields.products,
    });

  const handleAddProductOnClick = () => {
    append(defaultProductValue);
  };

  const closeRemoveDisabledModal = () => {
    setIsRemoveDisabledOpen(false);
  };

  return (
    <>
      <Table
        items={fields}
        columns={columns}
        tableRowRenderKey="id"
        tableLabeledBy={TABLE_SUPPLY_PRODUCTS_ID}
        tableRowClassName={classes.supplyProducts__listItem}
        bottomPanelNode={
          <SupplyProductSummary
            columns={columns}
            control={control}
            handleAddProduct={handleAddProductOnClick}
            isMaxProductsNumberReached={isMaxProductsNumberReached}
          />
        }
      />

      <Modal
        isModalFooterHidden
        isNoFocusableElements
        isOpen={isRemoveDisabledOpen}
        onClose={closeRemoveDisabledModal}
      >
        {translate('supply.warning.deleteOneProduct')}
      </Modal>
    </>
  );
};
