import {
  ActionCreator,
  ActionCreatorsMapObject,
  AsyncThunk,
  bindActionCreators,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit'
import { cartReducer } from './features/cart-slice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'
import storage from '@/redux/persistStorage'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
//-------add  /// <reference types="redux-persist" />   from    next-env.d.ts  -----------
const rootReducer = combineReducers({
  cart: cartReducer,
})
const persistConfig = {
  key: 'root',
  whitelist: ['cart'], // make sure it does not clash with server keys
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
//------------------------------------------------------------------------------------
export const createStore = () =>
  configureStore({
    reducer: persistedReducer /* {
      cart: cartReducer,
    }, */,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: process.env.NODE_ENV !== 'production',
  })

type Store = ReturnType<typeof createStore>

export type RootState = ReturnType<Store['getState']>

export type AppDispatch = Store['dispatch']

export const selectCart = (state: RootState) => state.cart.cart

const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useActionCreators = <Actions extends ActionCreatorsMapObject>(
  actions: Actions
): BoundActions<Actions> => {
  const dispatch = useAppDispatch()
  return useMemo(() => bindActionCreators(actions, dispatch), [])
}
// add type AsyncThunk
type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
    ? BoundAsyncThunk<Actions[key]>
    : Actions[key]
}

type BoundAsyncThunk<Action extends ActionCreator<any>> = (
  ...args: Parameters<Action>
) => ReturnType<ReturnType<Action>>

/* export const useActionCreatorsTyped = <
  Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject
>(
  actions: Actions
): BoundActions<Actions> => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(actions, dispatch), []);
}; */
