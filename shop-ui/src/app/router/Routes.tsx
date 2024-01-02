import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../features/home/Home";
import Catalog from "../features/catalog/Catalog";
import ProductDetailsPage from "../features/product-details/ProductDetails";
import AboutPage from "../features/about/About";
import ContactPage from "../features/contact/Contact";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import ShoppingCart from "../features/shopping-cart/ShoppingCart";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <HomePage />
            },
            {
                path: 'catalog',
                element: <Catalog />
            },
            {
                path: 'catalog/:id',
                element: <ProductDetailsPage />
            },
            {
                path: 'about',
                element: <AboutPage />
            },
            {
                path: 'contact',
                element: <ContactPage />
            },
            {
                path: 'server-error',
                element: <ServerError />
            },
            {
                path: 'not-found',
                element: <NotFound />
            },
            {
                path: 'shopping-cart',
                element: <ShoppingCart />
            },
            {
                path: '*',
                element: <Navigate replace to='/not-found' />
            }
        ]
    }
]);
