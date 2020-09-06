import { createAction, handleActions } from "redux-actions";

const CHANGE_CONDITION = "query/CHANGE_CONDITION";
/*
 요청을 위한 액션 타입을 payload 로 설정합니다 (예: "sample/GET_POST")
*/

export const changeCondition = createAction(
  CHANGE_CONDITION,
  (requestType) => requestType
);

export const finishLoading = createAction(
  FINISH_LOADING,
  (requestType) => requestType
);

const initialState = {};

const loading = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true,
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initialState
);

export default loading;
