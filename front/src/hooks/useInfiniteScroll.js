import { useEffect } from "react";

function useInfiniteScroll(callback) {
  useEffect(() => {
    function scrollBottom() {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      // 페이지 최하단 스크롤 시
      if (scrollTop + clientHeight >= scrollHeight) {
        // callback을 실행
        callback();
      }
    }

    window.addEventListener("scroll", scrollBottom);

    return () => {
      window.removeEventListener("scroll", scrollBottom);
    };
  }, [callback]);
}

export default useInfiniteScroll;
