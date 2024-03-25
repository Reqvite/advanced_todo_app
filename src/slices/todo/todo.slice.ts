import { createSlice } from "@reduxjs/toolkit";

type State = {
  any: string;
};

const initialState: State = {
  any: "",
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: "todo",
  reducers: {},
});

export { actions, name, reducer };
