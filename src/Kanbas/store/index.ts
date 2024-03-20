import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer";

export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
}

const store = configureStore({
  reducer: {
    modulesReducer,
    assignments: assignmentsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
