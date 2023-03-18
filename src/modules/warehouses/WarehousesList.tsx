import { GridAutoFit } from '../../layouts/Grid';
import { Foreground } from '../../layouts/Foreground';
import { Section } from '../../layouts/Section';
import { ReactComponent as PlusIcon } from '../../assets/icons/Plus.svg';
import { Heading } from '../../components/Heading';
import { useCustomNavigate } from '../../hooks';
import { routes } from '../../common/constants/routes';
import classes from './styles/index.module.css';

export const WarehousesList = () => {
  const navigate = useCustomNavigate();

  const handleAddWarehouseClick = () => {
    navigate(routes.warehouses.add);
  };

  return (
    <Section>
      <GridAutoFit>
        <div>
          <Foreground foregroundClassName={classes.warehouseCard}>
            <Heading level={2} fontSize={6}>
              Сайт
            </Heading>
            <div className={classes.warehouseInfo}>
              <div>Онлайн магазин</div>
              <div>м. Хмельницький, Героїв Майдану 153</div>
            </div>
          </Foreground>
        </div>

        <div onClick={handleAddWarehouseClick}>
          <Foreground foregroundClassName={classes.warehouseCard}>
            <PlusIcon width="2em" height="2em" />
          </Foreground>
        </div>
      </GridAutoFit>
    </Section>
  );
};
