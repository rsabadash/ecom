import { Link } from 'react-router-dom';
import Top from '../../../layouts/Top';
import Button from '../../../components/Button';
import { routes } from '../../../common/constants/routes';
import { useTranslation } from '../../../components/IntlProvider';
import { useCachedAPI } from '../../../hooks';
import { Product } from './types';
import Table, { TableColumn } from '../../../components/Table';
import { Translation } from '../../../components/IntlProvider';
import { endpoint } from '../../../common/constants/api';

const Products = () => {
    const { language, translate } = useTranslation();

    const { data = [] } = useCachedAPI<Product[]>(endpoint.products);

    const columns: TableColumn[] = [
        {
            title: translate('attributes.title'),
            key: 'title',
            valueGetter: (title: Translation) => title[language],
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
            <Top headingText={translate('products')}>
                <Button variant="primary">
                    <Link to={routes.productsAdd}>{translate('products.add')}</Link>
                </Button>
            </Top>
            <Table
                items={data}
                columns={columns}
                rowCustomRender={(row, { _id }: Product) => (
                    <Link key={_id} to={`${routes.products}/${_id}`}>{row}</Link>
                )}
            />
        </>
    );
};

export default Products;