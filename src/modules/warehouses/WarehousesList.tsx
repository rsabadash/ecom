import { Link } from 'react-router-dom';

import classes from './styles/index.module.css';
import { WarehousesListPlaceholder } from './WarehousesListPlaceholder';

import { ReactComponent as PlusIcon } from '../../assets/icons/Plus.svg';
import { endpoints } from '../../common/constants/api';
import { routes } from '../../common/constants/routes';
import { useCachedAPI } from '../../common/hooks';
import { Heading } from '../../components/Heading';
import { useTranslation } from '../../components/IntlProvider';
import { Foreground } from '../../layouts/Foreground';
import { GridAutoFit } from '../../layouts/Grid';
import { Section } from '../../layouts/Section';
import { warehouseTypeTranslationPrefix } from './constants';
import { Warehouse } from './types';

export const WarehousesList = () => {
  const { data = [] } = useCachedAPI<Warehouse[]>(
    `${endpoints.warehouses.root}`,
  );

  const { translate } = useTranslation();

  return (
    <>
      {data.length > 0 ? (
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
      ) : (
        <WarehousesListPlaceholder />
      )}
    </>
  );
};
