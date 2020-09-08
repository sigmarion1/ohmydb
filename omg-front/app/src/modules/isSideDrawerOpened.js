import { handleActions, createAction } from "redux-actions";

const SIDE_DRAWER_CHANGE = "sideDrawer/CHANGE";

export const sideDrawerChange = createAction(SIDE_DRAWER_CHANGE);

export default handleActions(
  {
    [SIDE_DRAWER_CHANGE]: (state, action) => ({
      open: action.payload,
      //   open: !state.open,
    }),
  },
  { open: false }
);
