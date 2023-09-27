import { useCallback, useEffect, useState } from "react";
import throttle from "lodash/throttle";
import { GoNoEntry } from "react-icons/go";

const MAX_COUNT = 30;

const useIntersection = () => {
  const [count, setCount] = useState(1);
  const [target, setTarget] = useState(null);

  //   const ioCallback = useCallback(
  //     throttle(async ([entry], io) => {
  //       if (entry.isIntersecting) {
  //         document.body.style.overflow = "hidden";
  //         // io.unobserve(entry.target);
  //         setCount(count + 1);
  //         // await io.observe(entry.target);
  //         return (document.body.style.overflow = "auto");
  //       }
  //     }, 1000),
  //     []
  //   );

  const ioCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (count < MAX_COUNT) {
          setCount(count + 1);
        }
      }
    });
  };

  useEffect(() => {
    if (!target) return;
    const io = new IntersectionObserver(ioCallback);
    io.observe(target);
    return () => io.disconnect();
  }, [target, count]);

  return { setTarget, count };
};

export default useIntersection;
