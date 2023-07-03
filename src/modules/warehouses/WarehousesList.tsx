import { Link } from 'react-router-dom';
import { GridAutoFit } from '../../layouts/Grid';
import { Foreground } from '../../layouts/Foreground';
import { Section } from '../../layouts/Section';
import { ReactComponent as PlusIcon } from '../../assets/icons/Plus.svg';
import { Heading } from '../../components/Heading';
import { useCachedAPI } from '../../common/hooks';
import { routes } from '../../common/constants/routes';
import { endpoints } from '../../common/constants/api';
import { Warehouse } from './types';
import { useTranslation } from '../../components/IntlProvider';
import { warehouseTypeTranslationPrefix } from './constants';
import classes from './styles/index.module.css';

export const WarehousesList = () => {
  const { data = [] } = useCachedAPI<Warehouse[]>(
    `${endpoints.warehouses.root}`,
  );

  const { translate } = useTranslation();

  return (
    <Section>
      <GridAutoFit>
        {data.map(({ _id, name, type, address }) => {
          return (
            <Link
              key={_id}
              to={`${routes.warehouses.root}/${_id}`}
              className={classes.warehouseLink}
            >
              <Foreground foregroundClassName={classes.warehouseCard}>
                <Heading level={2} fontSize={6}>
                  {name}
                </Heading>
                <div className={classes.warehouseInfo}>
                  <div>
                    {translate(`${warehouseTypeTranslationPrefix}${type}`)}
                  </div>
                  {address && <div>{address}</div>}
                </div>
              </Foreground>
            </Link>
          );
        })}

        <Link to={routes.warehouses.add} className={classes.warehouseLink}>
          <Foreground foregroundClassName={classes.warehouseCard}>
            <PlusIcon width="2em" height="2em" />
          </Foreground>
        </Link>
      </GridAutoFit>
    </Section>
  );
};
