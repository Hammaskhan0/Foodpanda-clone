import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../Features/cartSlice'
import restaurantReducer from '../Features/restaurantSlice'
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        restaurant : restaurantReducer
    },
})