import { handleActions, createAction } from "redux-actions";

const MENU_TOGGLE = "menu/TOGGLE";

export const menuToggle = createAction(MENU_TOGGLE);

export default handleActions(
  {
    [MENU_TOGGLE]: (state, action) => ({
      open: action.payload,
      //   open: !state.open,
    }),
  },
  { open: false }
);
