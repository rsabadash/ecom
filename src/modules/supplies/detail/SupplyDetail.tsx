import { useParams } from 'react-router-dom';
import { SupplyDetailData, SupplyUrlParams } from './types';
import { useCachedAPI, useIntlDate } from '../../../common/hooks';
import { endpoints } from '../../../common/constants/api';
import { Top, TopHeading } from '../../../layouts/Top';
import { useTranslation } from '../../../components/IntlProvider';
import { SupplyDetailList } from './SupplyDetailList';
import { TABLE_SUPPLY_DETAIL_ID } from './constants';

const SupplyDetail = () => {
  const { supplyId } = useParams<SupplyUrlParams>();
  const { translate } = useTranslation();

  const { formatDate } = useIntlDate();

  const { data: supplyDetail } = useCachedAPI<SupplyDetailData>(
    `${endpoints.supplies.root}/${supplyId}`,
  );

  const {
    name,
    products,
    createdAt,
    productsTotalCost,
    productsTotalQuantity,
  } = supplyDetail || {};

  const supplyName =
    name ||
    (createdAt && `${translate('supply.from')} ${formatDate(createdAt)}`);

  return (
    <>
      <Top>
        <TopHeading id={TABLE_SUPPLY_DETAIL_ID}>{supplyName}</TopHeading>
      </Top>
      <SupplyDetailList
        products={products || []}
        productsTotalCost={productsTotalCost}
        productsTotalQuantity={productsTotalQuantity}
      />
    </>
  );
};

export default SupplyDetail;
