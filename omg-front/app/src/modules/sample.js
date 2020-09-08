import { createAction, handleActions } from "redux-actions";
import { takeLatest, select } from "redux-saga/effects";
import * as api from "../lib/api";
import createRequestSaga from "../lib/createRequestSaga";
import { startLoading, finishLoading } from "../modules/loading";
import { call, put } from "redux-saga/effects";

// 액션 타입들을 선언합니다.
const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE";

const GET_PICS = "sample/GET_PICS";
const GET_PICS_SUCCESS = "sample/GET_PICS_SUCCESS";
const GET_PICS_FAILURE = "sample/GET_PICS_FAILURE";

const GET_NEW_PICS = "sample/GET_NEW_PICS";
const GET_NEW_PICS_SUCCESS = "sample/GET_NEW_PICS_SUCCESS";
const GET_NEW_PICS_FAILURE = "sample/GET_NEW_PICS_FAILURE";


export const getPost = createAction(GET_POST, (id) => id);
export const getUsers = createAction(GET_USERS);
export const getPics = createAction(GET_PICS);
export const getNewPics = createAction(GET_NEW_PICS)

// const getPostSaga = createRequestSaga(GET_POST, api.getPost);
// const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);


function* getPostSaga(action) {
  yield put(startLoading(GET_POST)); // 로딩 시작
  // 파라미터로 action 을 받아오면 액션의 정보를 조회 할 수 있습니다.
  try {
    // call 을 사용하면 Promise 를 반환하는 함수를 호출하고, 기다릴 수 있습니다.
    // 첫번째 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수입니다.
    const post = yield call(api.getPost, action.payload); // api.getPost(action.payload) 를 의미
    yield put({
      type: GET_POST_SUCCESS,
      payload: post.data,
    });
  } catch (e) {
    // try/catch 문을 사용하여 에러도 잡을 수 있습니다.
    yield put({
      type: GET_POST_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(GET_POST)); // 로딩 완료
}

function* getUsersSaga() {
  yield put(startLoading(GET_USERS));
  try {
    const users = yield call(api.getUsers);
    yield put({
      type: GET_USERS_SUCCESS,
      payload: users.data,
    });
  } catch (e) {
    yield put({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(GET_USERS));
}

function* getPicsSaga(action) {
  yield put(startLoading(GET_PICS));
  const state = yield select()

  let memberChanged = false
  let pageInitial = null

  if(action.payload) {
    if(action.payload.member) {
      memberChanged = action.payload.member
      pageInitial = 1
    }        
  }

  try {
    const payload = {
      page: pageInitial || state.sample.pics_data.page + 1,
      member: memberChanged?action.payload.member:state.sample.pics_data.member,
    }

    if(memberChanged == 'all')
    {
      delete payload.member
    }
    
    console.log(payload)
    const pics = yield call(api.getPics, payload);
    yield put({
      type: GET_PICS_SUCCESS,
      payload: {
        ...pics.data,
        memberChanged,
      }
    });
  } catch (e) {
    yield put({
      type: GET_PICS_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(GET_PICS));
}

function* getNewPicsSaga(action) {
  yield put(startLoading(GET_PICS));
  try {
    const pics = yield call(api.getPics, action.payload);
    yield put({
      type: GET_NEW_PICS_SUCCESS,
      payload: pics.data,
    });
  } catch (e) {
    yield put({
      type: GET_NEW_PICS_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(GET_PICS));
}

export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
  yield takeLatest(GET_PICS, getPicsSaga);
  yield takeLatest(GET_NEW_PICS, getNewPicsSaga);
}

// 초기 상태를 선언합니다.
// 요청의 로딩중 상태는 loading 이라는 객체에서 관리합니다.

const initialState = {
  post: null,
  users: null,
  pics_data: {
    isFinished: false,
    member: null,
    page: 0,
    last_page: 1,
    pics: [],
  },
};

const sample = handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      post: action.payload,
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload,
    }),
    [GET_PICS_SUCCESS]: (state, action) => {

      let isFinished = false
      if(action.payload.page >= action.payload.last_page) {
        isFinished = true
      }

      return {
      ...state,
      pics_data: {
        isFinished,
        member: action.payload.member,
        page: parseInt(action.payload.page),
        last_page: parseInt(action.payload.last_page),
        pics: action.payload.memberChanged? action.payload.pics:[...state.pics_data.pics, ...action.payload.pics],
      }
    }},
    [GET_NEW_PICS_SUCCESS]: (state, action) => {
      
      let isFinished = false
      if(action.payload.page >= action.payload.last_page) {
        isFinished = true
      }
      
      
      return {
      ...state,
      pics_data: {
        member: action.payload.member,
        page: parseInt(action.payload.page),
        last_page: parseInt(action.payload.last_page),
        pics: action.payload.pics,
        
      }

    }}
  },
  initialState
);

export default sample;
