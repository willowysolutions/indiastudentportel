import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import AdminSlice from "../features/adminSlice";
import adminauthSlice from "../features/adminauthSlice";
import StudentPortalSlice from "../features/studentPortal";
import UniversityPortalSlice from "../features/University/UniversitySlice";
import CouncilerPortalSlice from "../features/Counciler/CouncilerSlice";
import AdminPortalSlice from '../features/admin/AdminSlice'
import universityauthSlice from '../features/University/AuthUniversityLogin'
import councilerauthSlice from '../features/Counciler/AuthCouncilerLogin'
import studentauthSlice from '../features/student/AuthStudentSlice'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import StudentSlice from "../features/student/StudentSlice";
// import AdminSlice from "../features/admin/AdminSlice";
// import StudentSlice from "../features/student/StudentSlice";

const rootReducer = combineReducers({
  // student: StudentPortalSlice,
  student:StudentSlice,
  admin:AdminPortalSlice,
  adminauth: adminauthSlice,
  university: UniversityPortalSlice,
  counciler:CouncilerPortalSlice,
  universityAuth:universityauthSlice,
 councilerAuth:councilerauthSlice,
 studentAuth:studentauthSlice,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
