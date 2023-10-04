import { useParams } from 'react-router-dom';

import { endpoints } from '../../../common/constants/api';
import {
  useCachedAPI,
  useIntlDate,
  useKeepDataBetweenNavigation,
} from '../../../common/hooks';
import { useTranslation } from '../../../components/IntlProvider';
import { Top, TopHeading } from '../../../layouts/Top';
import { Supply, SupplyStateFromRouter } from '../common/types';
import { TABLE_SUPPLY_DETAIL_ID } from './constants';
import { SupplyDetailList } from './SupplyDetailList';
import { SupplyUrlParams } from './types';

const SupplyDetail = () => {
  const { supplyId } = useParams<SupplyUrlParams>();

  const { formatDate } = useIntlDate();
  const { translate } = useTranslation();
  const { getNavigationStateData } = useKeepDataBetweenNavigation();

  const categoryDetailFromLocation =
    getNavigationStateData<SupplyStateFromRouter>();

  const { data: supplyDetail } = useCachedAPI<Supply>(
    `${endpoints.supplies.root}/${supplyId}`,
    { fallbackData: categoryDetailFromLocation },
  );

  const { name, products, createdAt, productsTotalCost } = supplyDetail || {};

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
      />
    </>
  );
};

export default SupplyDetail;
