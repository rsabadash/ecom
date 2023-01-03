import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from '../../common/constants/routes';

const Dashboard = lazy(() => import('../../modules/dashboard'));
const Products = lazy(() => import('../../modules/products/products'));
const ProductsAdd = lazy(() => import('../../modules/products/products/ProductsAdd'));
const ProductDetail = lazy(() => import('../../modules/products/products/ProductDetail'));

const Router = () => {
    return (
        <Routes>
            <Route path={routes.home} element={<Navigate replace to={routes.dashboard} />} />
            <Route path={routes.dashboard} element={(
                <Suspense><Dashboard /></Suspense>
            )} />
            <Route path={routes.products} element={(
                <Suspense><Products /></Suspense>
            )}/>
            <Route path={`${routes.products}/:productId`} element={(
                <Suspense><ProductDetail /></Suspense>
            )}/>
            <Route path={routes.productsAdd} element={(
                <Suspense><ProductsAdd /></Suspense>
            )}/>
        </Routes>
    );
};

export { Router };