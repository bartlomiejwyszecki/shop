import { PropsWithChildren, createContext, useContext, useState } from "react";
import { ShoppingCart } from "../models/shopping-cart.interface";

interface StoreContextValue {
    shoppingCart: ShoppingCart | null;
    setShoppingCart: (shoppingCart: ShoppingCart) => void;
    removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useStoreContext() {
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw Error('Store context is not defined');
    }

    return context;
}

export function StoreProvider({children}: PropsWithChildren<unknown>) {
    const [shoppingCart, setShoppingCart] = useState<ShoppingCart | null>(null);

    function removeItem(productId: number, quanity: number) {
        if (!shoppingCart) return;

        const items = [...shoppingCart.items];

        const itemIndex = items.findIndex(item => item.productId === productId);

        if (itemIndex >= 0) {
            items[itemIndex].quantity -= quanity;

            if (items[itemIndex].quantity <= 0) {
                items.splice(itemIndex, 1);
            }

            setShoppingCart(prevState => {
                return {...prevState!, items}
            })
        }
    }

    return (
        <StoreContext.Provider value={{ shoppingCart, setShoppingCart, removeItem }}>
            {children}
        </StoreContext.Provider>
    )
}