import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import db from "../../Database";

interface Module {
  _id: string;
  name: string;
  description: string;
  // Add any other properties of a module here
}

interface ModuleState {
  modules: Module[];
  module: Module;
}

const initialState: ModuleState = {
  // modules: db.modules,
  modules: [],
  module: { _id: "", name: "New Module 123", description: "New Description" },
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action: PayloadAction<Module[]>) => {
      state.modules = action.payload;
    },

    addModule: (state, action: PayloadAction<Module>) => {
      state.modules = [action.payload, ...state.modules];
    },

    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter(
        (module) => module._id !== action.payload
      );
    },
    updateModule: (state, action: PayloadAction<Module>) => {
      state.modules = state.modules.map((module) => {
        if (module._id === action.payload._id) {
          return action.payload;
        } else {
          return module;
        }
      });
    },
    setModule: (state, action: PayloadAction<Module>) => {
      state.module = action.payload;
    },
  },
});

export const { addModule, deleteModule, updateModule, setModule, setModules } =
  modulesSlice.actions;
export default modulesSlice.reducer;
