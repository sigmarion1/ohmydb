import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Sample from '../components/Sample';
import { getPics } from '../modules/sample';

import { useSelector, useDispatch } from 'react-redux'

const SampleContainer = () => {
  // 클래스 형태 컴포넌트였더라면, componentDidMount


  const pics = useSelector(state => state.sample.pics)
  const loadingPics = useSelector(state => state.loading['sample/GET_PICS'])
  const dispatch = useDispatch()

  useEffect(() => {
    // useEffect 에 파라미터로 넣는 함수는 async 로 할 수 없기 때문에
    // 그 내부에서 async 함수를 선언하고 호출해줍니다.
    const fn = async () => {
      try {
        dispatch(getPics())
      } catch (e) {
        console.log(e); // 에러 조회
      }
    };
    fn();
  }, [getPics]);

  return (
    <Sample
      pics={pics}
      loadingPics={loadingPics}
    />
  );
};

export default SampleContainer

// export default connect(
//   ({ sample, loading }) => ({
//     post: sample.post,
//     users: sample.users,
//     loadingPost: loading['sample/GET_POST'],
//     loadingUsers: loading['sample/GET_USERS']
//   }),
//   {
//     getPost,
//     getUsers
//   }
// )(SampleContainer);

