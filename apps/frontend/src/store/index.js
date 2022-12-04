import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage'
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1';
import { profileSlice } from './slice';


const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel1,
};

const rootReducer = combineReducers({
  profileReducer: profileSlice.reducer,
});

const _persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export let persistor = persistStore(store);
