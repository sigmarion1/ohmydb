import useSWRInfinite, { SWRInfiniteConfiguration } from "swr/infinite";
import fetcher from "utils/api";

export default function useFetchInfite(url, options) {
  const { data, error, isLoading, size, setSize } = useSWRInfinite(
    (index, previousPageData) => {
      if (index && !previousPageData.length) return null;
      return `${url}&offset=${index * 10}`;
    },
    fetcher,
    options
  );

  const fetchNextPage = () => {
    setSize(size + 1);
    console.log(size);
  };

  return {
    list: data?.results,
    isError: error,
    isLoading,
    fetchNextPage,
  };
}
