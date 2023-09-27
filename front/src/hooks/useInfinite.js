import { useState, useRef, useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import fetcher from "utils/api";

const useInfinite = () => {
  const sizeRef = useRef(1);
  const [target, setTarget] = useState(null);
  const [url, setUrl] = useState(null);

  const getKey = (index, previousPageData) => {
    console.log(index, previousPageData);
    if (!url) {
      return null;
    }
    if (previousPageData && !previousPageData.results.length) {
      return null;
    }

    return url + `&offset=${index * 10}`;
  };
  const { data, error, mutate, size, setSize } = useSWRInfinite(
    getKey,
    fetcher
  );

  const onIntersect = ([entry]) => {
    if (entry.isIntersecting) {
      sizeRef.current += 1;
      setSize(sizeRef.current);
    }
  };

  useEffect(() => {
    if (!target) return;
    const observer = new IntersectionObserver(onIntersect);
    observer.observe(target);
    return () => observer && observer.disconnect();
  }, [target, url]);

  return {
    list: data,
    isError: error,
    mutate,
    setTarget,
    setUrl,
  };
};

export default useInfinite;
