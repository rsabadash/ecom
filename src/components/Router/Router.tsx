import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from '../../modules/dashboard';
import { Products } from '../../modules/products';
import { routes } from '../../common/constants/routes';

const ProductsAdd = lazy(() => import('../../modules/products/ProductsAdd'));

const Router = () => {
    return (
        <Routes>
            <Route path={routes.home} element={<Navigate replace to={routes.dashboard} />} />
            <Route path={routes.dashboard} element={<Dashboard />} />
            <Route path={routes.products} element={<Products />}/>
            <Route path={routes.productsAdd} element={(
                <Suspense fallback={<div>Loading is Router</div>}><ProductsAdd /></Suspense>
            )}/>
        </Routes>
    );
};

export default Router;