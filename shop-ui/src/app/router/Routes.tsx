import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../features/home/Home";
import Catalog from "../features/catalog/Catalog";
import ProductDetailsPage from "../features/product-details/ProductDetails";
import AboutPage from "../features/about/About";
import ContactPage from "../features/contact/Contact";

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
            }
        ]
    }
]);
