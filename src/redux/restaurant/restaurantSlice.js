import { createSlice } from '@reduxjs/toolkit'

const initialState = []


export const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    initialAdd: (state,action) => {
      return action.payload
    },
    remove: (state,action) => {
      const newState =  state.filter((res)=>res.id !== parseInt(action.payload,10))
      return newState
    },
    add: (state,action) => {
      return [action.payload, ...state]
    },
    modify: (state,action) => {
      const newState =  state.filter((res)=>res.id !== parseInt(action.payload.id,10))
      return [action.payload.restaurant, ...newState]
    },
  },
})

// Action creators are generated for each case reducer function
export const { initialAdd, remove, add, modify} = restaurantSlice.actions

export default restaurantSlice.reducer