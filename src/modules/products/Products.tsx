import { Link } from 'react-router-dom';
import Top from '../../layouts/Top';
import Button from '../../components/Button';
import { routes } from '../../common/constants/routes';
import { useTranslation } from '../../components/IntlProvider';
import { useCachedAPI } from '../../hooks';
import { Product } from './types';
import Table from '../../components/Table';

const Products = () => {
    const { translate } = useTranslation();

    const { data } = useCachedAPI<Product[]>('/api/v1/products');

    const columns = [
        {
            title: translate('attributes.title'),
            key: 'title',
        },
        {
            title: translate('category'),
            key: 'category'
        }
    ];

    return (
        <>
            <Top headingText={translate('products')}>
                <Button variant="primary">
                    <Link to={routes.productsAdd}>{translate('products.add')}</Link>
                </Button>
            </Top>

            <Table columns={columns} />

            <div style={{ display: 'flex' }}>
                {
                    data?.map((item) => {
                        return columns.map((column) => {
                            console.log(column);
                            return (
                                // @ts-ignore
                                <div>{item[column.key]}</div>
                            )
                        })
                    })
                }
            </div>
        </>
    );
};

export { Products };