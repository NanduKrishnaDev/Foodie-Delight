import { configureStore } from '@reduxjs/toolkit'
import restaurantReducer from './restaurant/restaurantSlice'


export const store = configureStore({
  reducer: {
    restaurants: restaurantReducer,
  },
})