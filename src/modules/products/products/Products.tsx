import { Link } from 'react-router-dom';
import { Top } from '../../../layouts/Top';
import { ButtonLink } from '../../../components/Button';
import { routes } from '../../../common/constants/routes';
import { useTranslation } from '../../../components/IntlProvider';
import { useCachedAPI } from '../../../hooks';
import { Product } from './types';
import { Table, TableColumn, RowCustomRenderArgs } from '../../../components/Table';
import { endpoint } from '../../../common/constants/api';
import { TABLE_ID } from './constants';

const Products = () => {
    const { translate } = useTranslation();

    const { data = [] } = useCachedAPI<Product[]>(endpoint.products);

    const columns: TableColumn[] = [
        {
            title: translate('attributes.title'),
            key: 'title',
            width: '70%'
        },
        {
            title: translate('attributes.quantity'),
            key: 'quantity',
            width: '15%'
        },
        {
            title: translate('category'),
            key: 'category',
            valueGetter: (category: string) => translate(`category.${category}`),
            width: '15%'
        }
    ];

    return (
        <>
            <Top headingId={TABLE_ID} headingText={translate('products')}>
                <ButtonLink variant="primary" to={routes.productsAdd}>
                    {translate('products.add')}
                </ButtonLink>
            </Top>
            <Table
                isRowLinkInteractive
                items={data}
                columns={columns}
                tableLabeledBy={TABLE_ID}
                rowCustomRender={({ row, item, rowProps }: RowCustomRenderArgs<Product>) => (
                    <Link key={item._id} to={`${routes.products}/${item._id}`} {...rowProps}>{row}</Link>
                )}
            />
        </>
    );
};

export default Products;