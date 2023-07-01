import { FC, useCallback, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { SupplyProductListColumn, SupplyProductsListProps } from './types';
import { Table, TableColumnGeneric } from '../../../components/Table';
import { useSupplyProductsTableColumns } from './hooks';
import { Button } from '../../../components/Button';
import {
  defaultProductValue,
  MAX_PRODUCTS_IN_SUPPLY,
  MIN_PRODUCTS_IN_SUPPLY,
  supplyFormArrayFields,
} from './constants';
import { useTranslation } from '../../../components/IntlProvider';
import { SupplyProductSummary } from './SupplyProductSummary';
import { Modal } from '../../../components/Modal';
import { Tooltip } from '../../../components/Tooltip';
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
        tableRowClassName={classes.supplyProducts__listItem}
        bottomPanelNode={
          <SupplyProductSummary columns={columns} control={control} />
        }
      />

      <Tooltip
        isDisabled={!isMaxProductsNumberReached}
        isChildrenFocusable
        content={translate('supply.products.maxNumber', {
          value: MAX_PRODUCTS_IN_SUPPLY,
        })}
        position="bottom"
        tooltipClassName={classes.supplyProducts__list_buttonAddWrapper}
      >
        <Button
          isDisabled={isMaxProductsNumberReached}
          variant="theme"
          onClick={handleAddProductOnClick}
          className={classes.supplyProducts__list_buttonAdd}
        >
          {translate('supply.addProduct')}
        </Button>
      </Tooltip>

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
