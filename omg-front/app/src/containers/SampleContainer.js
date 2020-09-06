import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import Sample from "../components/Sample";
import { getPics } from "../modules/sample";

import { useSelector, useDispatch } from "react-redux";
import useIntersect from "../lib/useIntersect";

import img_loading from "../img/loading.gif";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const SampleContainer = () => {
  // 클래스 형태 컴포넌트였더라면, componentDidMount

  const pics_data = useSelector((state) => state.sample.pics_data);
  const loadingPics = useSelector((state) => state.loading["sample/GET_PICS"]);
  const dispatch = useDispatch();

  const currentPage = useRef(1);

  const fetchItems = async () => {
    try {
      dispatch(getPics(currentPage.current));
    } catch (e) {
      console.log(e); // 에러 조회
    }
  };

  useEffect(() => {
    // useEffect 에 파라미터로 넣는 함수는 async 로 할 수 없기 때문에
    // 그 내부에서 async 함수를 선언하고 호출해줍니다.

    fetchItems();
  }, []);

  const [_, setRef] = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    currentPage.current += 1;
    await fetchItems();
    observer.observe(entry.target);
  }, {});

  return (
    <React.Fragment>
      <Sample pics_data={pics_data} loadingPics={loadingPics} />
      {loadingPics || <div ref={setRef} />}
      <Container maxWidth="sm" component="main">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {loadingPics && <img src={img_loading} />}
        </Typography>
      </Container>

      {/* <div ref={setRef}>{loadingPics && "Loading..."}</div> */}
      {/* <div ref={setRef}></div> */}
    </React.Fragment>
  );
};

export default SampleContainer;

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
